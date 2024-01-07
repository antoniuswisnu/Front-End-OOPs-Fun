import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const StudentComponents = () => {
  const auth = localStorage.getItem("user");
  let auth2 = JSON.parse(auth);
  return auth2.roles === "student" ? <Outlet /> : <Navigate to="/dashboard/create-class" />;
};

export default StudentComponents;
