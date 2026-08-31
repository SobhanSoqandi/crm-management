import useFetchData from "./useFetchData";

export default function useUser(opt = {}) {
  const { data, isLoading, isError, error, refetch } = useFetchData(
    "user-me",
    "user/me",
    opt
  );

  return {
    user: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}