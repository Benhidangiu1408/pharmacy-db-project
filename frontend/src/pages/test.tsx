import React, { useState, useEffect } from "react";
import axios from "axios";
import useChos from "../hooks/useChos";

const GrpcData = () => {
  // const [data, setData] = useState({ id: 0, sdt: 0 });
  const { data, isLoading, error } = useChos(1);

  // useEffect(() => {
  //   axios.get('/api/v1/example/1')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data from gRPC endpoint:', error);
  //     });
  // }, []);

  //   if (!data) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div>
      <h1>gRPC Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h1>{data?.id}</h1>
      <h1>{data?.name}</h1>

    
    </div>
  );
};

export default GrpcData;
