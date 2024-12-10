import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
//   const { info } = useStudentStore();
  let info="meo"
  if (info =="") return <Navigate to="/signin" />;
  return <Outlet />;
};

export default PrivateRoute;
