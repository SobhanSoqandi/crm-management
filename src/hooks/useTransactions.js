import useFetchData from "./useFetchData";

export default function useTransactions() {
  const { data, isLoading, isError } = useFetchData(
    "wallet-transactions",
    "wallet-transactions/customer"
  );

  const transactions = data?.data ?? [];

  return { transactions, isLoading, isError };
}