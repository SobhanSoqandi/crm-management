// import useUser from "./useUser";

import useCustomer from "./useCustomer";

// export default function useCurrentCustomerId() {
//   const { user } = useUser();

//   console.log("wallllllllllllllll:" , user?.customer?.id );
  

//   return user?.customer?.id ?? null;
// }


export default function useCurrentCustomerId() {
  const { customer } = useCustomer();

  return customer?.id ?? null;
}