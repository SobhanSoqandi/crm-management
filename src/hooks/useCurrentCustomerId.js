// import useUser from "./useUser";

import useCustomer from "./useCustomer";



export default function useCurrentCustomerId() {
  const { customer } = useCustomer();

  return customer?.id ?? null;
}