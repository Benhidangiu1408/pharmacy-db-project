import React from "react";
import Tables from "../../sharedComponents/Tables";
import { cho } from "../../entities/cho";
import Form from "../../sharedComponents/Form";
import useShippers from "../../hooks/useShippers";
import useCustomers from "../../hooks/useCustomers";
const CreateAccount = () => {
  const tableData: cho[] = [
    { id: 1, name: "Mark" },
    { id: 2, name: "Jacob" },
    { id: 3, name: "Larry" },
  ];

  const headers = ["id", "name"];

  const { data, isLoading, error } = useShippers();
  // const { data: data2, isLoading: isLoading2, error: error2 } = useCustomers();

  // if (!Array.isArray(data2)) {
  //   console.error("data2 is not an array:", data2);
  //   return null; // Return nothing or fallback JSX
  // }
  const shippersData = data?.shippers;
  return (
    <>
      <h1>{shippersData?.map((shipper) => shipper.id)}</h1>
      <h1>{shippersData?.map((shipper) => shipper.name)}</h1>

      {/* {data2.map((item, index) => (
        <div key={index}>
          {item.name} 
        </div>
      ))} */}

      {/* <h1>{data2?.map((dat) => dat.id)}</h1>
      <h1>{data2?.map((dat) => dat.name)}</h1>
      <h1>{data2?.map((dat) => dat.phone_no)}</h1> */}
    </>
  );
};

export default CreateAccount;
