import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "./httpServices";


export default function useMutationData(url, method, toastId, opt = {}) {
  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationFn: async (info) => {
      const response = await http[method.toLowerCase()](`/${url}`, info);
      return response;
    },
    onSuccess: (responseData) => {
      const message = responseData?.data?.message || responseData?.message || "عملیات با موفقیت انجام شد";
      const token = responseData?.data?.data?.token || responseData?.data?.token || responseData?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      toast.success(message, { id: toastId });
      if (opt?.onSuccess) opt.onSuccess(responseData);
    },
    onError: (error) => {
      const msgData = error?.response?.data?.message;
      let message = "خطایی رخ داده است";
      if (typeof msgData === "string") message = msgData;
      else if (typeof msgData === "object") {
        message = Object.values(msgData).flat().join("\n");
      }
      toast.error(message);
      opt?.onError?.(error);
    },
    ...opt,
  });

  return { mutate, isPending, isSuccess, data, isError, error };
}