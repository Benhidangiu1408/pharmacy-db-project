import React, { useState, useEffect } from "react";
import axios from "axios";
import useChos from "../hooks/useChos";

const GrpcData = () => {
  // const [data, setData] = useState({ id: 0, sdt: 0 });
  // const { data, isLoading, error } = useChos(1);

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
  // /${employeeId}
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const employeeId = 1;
  useEffect(() => {
    if (!employeeId) return; // Avoid making a request if employeeId is not provided

    const fetchEmployeeData = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset error state

      try {
        // Call the backend API
        const response = await fetch(`/api/v2/showAllEmployees/${employeeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch employee data");
        }

        // Parse and set the employee data
        const data = await response.json();
        console.log(data[0])
        setEmployeeData(data[0]);
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEmployeeData();
  }, [employeeId]); // Dependency array: triggers when employeeId changes

  // Render loading, error, or employee data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (employeeData.length === 0) {
    return <p>No employee data found.</p>;
  }
  return (
    // <div>
    //   <h1>gRPC Data</h1>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    //   <h1>{data?.id}</h1>
    //   <h1>{data?.name}</h1>
    // </div>
    <div>
      <h1>Employee Details</h1>
      <ul>
        {employeeData.map((employee) => (
          <li key={employee.Account}>
            <strong>ID:</strong> {employee.Account}, <strong>Name:</strong>{" "}
            {employee.Name}, <strong>Email:</strong> {employee.AddressAddress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrpcData;
