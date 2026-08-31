import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";


const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


app.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


app.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

   
    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

  
    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

  
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      return Promise.reject(error);
    }

    try {
     
 
      const refreshResponse = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

   

      const tokenData = refreshResponse?.data?.data;

      const newAccessToken = tokenData?.access_token;
      const newRefreshToken = tokenData?.refresh_token;

   
      if (!newAccessToken || !newRefreshToken) {
        throw new Error("Invalid refresh token response");
      }

      

      localStorage.setItem(
        "access_token",
        newAccessToken
      );

      localStorage.setItem(
        "refresh_token",
        newRefreshToken
      );

   
      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

  

      return app(originalRequest);

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