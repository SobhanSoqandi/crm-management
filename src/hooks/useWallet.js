// useWallet.js
import useCurrentCustomerId from "./useCurrentCustomerId";
import useFetchData from "./useFetchData";

export default function useWallet(customerId) {
  const currentCustomerId = useCurrentCustomerId();
  const resolvedCustomerId = customerId ?? currentCustomerId;

  const { data, isLoading, isError, refetch } = useFetchData(
    ["wallet", resolvedCustomerId],
    `wallets/customer/${resolvedCustomerId}`, // بر اساس customer_id، نه id خودِ ولت
    { enabled: !!resolvedCustomerId }
  );

  const balance = data?.balance != null ? Number(data.balance) : 0;

  return {
    wallet: data,
    balance,
    isLoading,
    isError,
    refetch,
  };
}
