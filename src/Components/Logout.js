import "./../App.css";

import React, {  useContext } from "react";

import { Redirect } from "react-router-dom";

import Context from "../Context";

const Register = (props) => {
  const { isLoggedIn,logout } = useContext(Context);
  logout()
  

  return (
    <>
        <Redirect to="/login"/>
    </>  );
};

export default Register;
