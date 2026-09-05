import useFetchData from "./useFetchData";


export default function useSalon(opt = {}) {
  const { data, isLoading, isError, error, refetch } = useFetchData(
    "salon",
    "salon/user_id",
    opt
  );

  return {
    salon: data,
    isSalonLoading : isLoading,
    isError,
    error,
    refetch,
  };
}