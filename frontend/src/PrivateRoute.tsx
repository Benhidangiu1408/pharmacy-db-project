import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "./current_data/user";

const PrivateRoute = () => {
  const { info } = useUserStore();
  if (info.name =="") return <Navigate to="/signin" />;
  return <Outlet />;
};

export default PrivateRoute;
