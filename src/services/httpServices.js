import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

app.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// همه‌ی 401های همزمان به همین یک Promise وصل می‌شن؛
// فقط یک درخواست /auth/refresh واقعی ارسال می‌شه (single-flight).
let refreshPromise = null;

function refreshTokens() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return Promise.reject(new Error("No refresh token"));

  return axios
    .post(
      `${BASE_URL}/auth/refresh`,
      { refresh_token: refreshToken },
      { headers: { Accept: "application/json", "Content-Type": "application/json" } }
    )
    .then(({ data }) => {
      const { access_token, refresh_token } = data?.data || {};
      if (!access_token || !refresh_token) throw new Error("Invalid refresh response");

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return access_token;
    });
}

app.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;
    const isRefreshCall = config?.url?.includes("/auth/refresh");

    if (response?.status !== 401 || config?._retry || isRefreshCall) {
      return Promise.reject(error);
    }
    config._retry = true;

    try {
      refreshPromise ??= refreshTokens().finally(() => (refreshPromise = null));
      const newAccessToken = await refreshPromise;

      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return app(config);
    } catch (refreshError) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return Promise.reject(refreshError);
    }
  }
);

const http = {
  get: (...args) => app.get(...args),
  post: (...args) => app.post(...args),
  delete: (...args) => app.delete(...args),
  put: (...args) => app.put(...args),
  patch: (...args) => app.patch(...args),
};

export default http;