import React from "react";
import Tables from "../../sharedComponents/Tables";
import { cho } from "../../entities/cho";
import Form from "../../sharedComponents/Form";
import { Button } from "@chakra-ui/react";
const CreateAccount = () => {
  const tableData: cho[] = [
    { id: 1, name: "Mark" },
    { id: 2, name: "Jacob" },
    { id: 3, name: "Larry" },
  ];

  const headers = ["id", "name"];

  return (
    <>
      <Tables headers={headers} data={tableData}></Tables>
      <Form />
      <Button />
    </>
  );
};

export default CreateAccount;
