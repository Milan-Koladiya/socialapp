import React, { useEffect } from "react";
import useToken from "../hook/useToken";
import Login from "../Pages/Login";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
 

  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = sessionStorage.getItem("token");
    console.log("login"+login);
    if (!login) {
      navigate("/login");
    }
  });

  return (
    <>
      <Component></Component>
    </>
  );
};

export default ProtectedRoute;
