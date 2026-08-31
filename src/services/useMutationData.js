import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "./httpServices";

export default function useMutationData(url, method, toastId, opt = {}) {
  const {
    mutate,
    mutateAsync,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useMutation({
    ...opt,

    mutationFn: (info) => {
      const finalUrl = typeof url === "function" ? url(info) : url;
      return http[method.toLowerCase()](`/${finalUrl}`, info);
    },

    onSuccess: (response) => {
      const payload = response?.data?.data;
      const message = response?.data?.message || "عملیات با موفقیت انجام شد";

      if (payload?.access_token) {
        localStorage.setItem("access_token", payload.access_token);
      }
      if (payload?.refresh_token) {
        localStorage.setItem("refresh_token", payload.refresh_token);
      }

      toast.success(message, { id: toastId });
      opt?.onSuccess?.(response);
    },

    onError: (error) => {
      const data = error?.response?.data;

      let message = "خطایی رخ داده است";

      if (!error?.response) {
        // درخواست اصلاً به سرور نرسیده (Network Error / CORS)
        message = "ارتباط با سرور برقرار نشد. لطفاً اتصال یا تنظیمات سرور را بررسی کنید.";
      } else if (typeof data?.message === "string") {
        message = data.message;
      } else if (typeof data?.detail === "string") {
        message = data.detail;
      } else if (Array.isArray(data?.detail)) {
        message = data.detail
          .map((item) => item?.msg || item)
          .join("\n");
      } else if (
        data?.message &&
        typeof data.message === "object"
      ) {
        message = Object.values(data.message)
          .flat()
          .join("\n");
      }

      toast.error(message);

      opt?.onError?.(error);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    data,
    isError,
    error,
  };
}