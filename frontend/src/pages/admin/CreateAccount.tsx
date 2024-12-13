import React from "react";

// <!-- import Tables from "../../sharedComponents/Tables";
// import { cho } from "../../entities/cho";
// import Form from "../../sharedComponents/Form";
// import useShippers from "../../hooks/useShippers";
// import useCustomers from "../../hooks/useCustomers";
// import { useOrderStatus } from "../../hooks/useOrders";
// const CreateAccount = () => {
//   const tableData: cho[] = [
//     { id: 1, name: "Mark" },
//     { id: 2, name: "Jacob" },
//     { id: 3, name: "Larry" },
//   ];

//   const headers = ["id", "name"];

//   const { data, isLoading, error } = useShippers();
//   const { data:data2, isLoading:isLoading2 , error:error2 } = useOrderStatus();


//   const orderstatus=data2?.statuses
//   console.log(orderstatus)
//   const shippersData = data?.shippers;
//   console.log(shippersData);
//   return (
//     <>
//       <h1>{shippersData?.map((shipper) => shipper.id)}</h1>
//       <h1>{shippersData?.map((shipper) => shipper.name)}</h1>
//       <ul>
//         {shippersData?.map((shipper) => (
//           <li key={shipper.id}>
//             {shipper.id}. {shipper.name}
//           </li>
//         )) || <p>No shippers available.</p>}
//       </ul>

//       <ul>
//         {orderstatus?.map((shipper) => (
//           <li key={shipper.status_id}>
//             {shipper.status_id}. {shipper.name}
//           </li>
//         )) || <p>No shippers available.</p>}
//       </ul>
     
//     </>
//   );
// };

// export default CreateAccount; -->

import EmployeeForm from "../../components/view/formCreateAccount";

const AccountFormView: React.FC = () => {
  return <EmployeeForm />;
};

export default AccountFormView;

