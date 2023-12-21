import React from "react";
import RegisterComp from "../components/Register/Register";
import Register_S from "../components/Register/Register_S";
import Register_T from "../components/Register/Register_T";
import Reg_JoinGrp from "../components/Register/Reg_JoinGrp";
import Reg_CreateGrp from "../components/Register/Reg_CreateGrp";

const Register = ({ choose }) => {
  return (
    <div>
      {choose === 0 ? (
        <RegisterComp />
      ) : choose === 1 ? (
        <Register_S />
      ) : choose === 2 ? (
        <Register_T />
      ) : choose === 3 ? (
        <Reg_JoinGrp />
      ) : (
        <Reg_CreateGrp />
      )}
    </div>
  );
};

export default Register;
