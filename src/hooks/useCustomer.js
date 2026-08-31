import useFetchData from "./useFetchData";

export default function useCustomer() {
  const { data, isLoading, isError, error, refetch } = useFetchData(
    ["customer", "me"],
    "customer/me"
  );

  return {
    customer: data?.data ?? null,
    isCustomerLoading : isLoading ,
    isError,
    error,
    refetch,
  };
}