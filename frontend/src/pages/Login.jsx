import React from "react";
import LoginComp from "../components/Login/Login";
import SLoginComponent from "../components/Login/SLogin";
import TLoginComponent from "../components/Login/TLogin";
import ALoginComponent from "../components/Login/ALogin";

const Login = ({ choose }) => {
  return (
    <div>
      {choose === 0 ? (
        <LoginComp />
      ) : choose === 1 ? (
        <SLoginComponent />
      ) : choose === 2 ? (
        <TLoginComponent />
      ) : (
        <ALoginComponent />
      )}
    </div>
  );
};

export default Login;
