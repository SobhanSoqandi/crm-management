
// import { useQuery } from "@tanstack/react-query";
// import http from "../services/httpServices";

// export default function useFetchData(key, url, opt = {}) {
//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: Array.isArray(key) ? key : [key],
//     queryFn: () => http.get(`/${url}`),
//     ...opt,
//   });

//   return {
//     data: data?.data,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   };
// }

import { useQuery } from "@tanstack/react-query";
import http from "../services/httpServices";

// بعضی نسخه‌های httpServices از قبل response.data رو unwrap می‌کنن،
// بعضی response کامل axios (که خودش data/status/headers داره) رو برمی‌گردونن.
// این تابع مستقل از رفتار httpServices، بدنه‌ی واقعی رو استخراج می‌کنه.
function unwrap(res) {
  if (res && typeof res === "object" && "data" in res && "status" in res && "headers" in res) {
    return res.data;
  }
  return res;
}

export default function useFetchData(key, url, opt = {}) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => unwrap(await http.get(`/${url}`)),
    ...opt,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}