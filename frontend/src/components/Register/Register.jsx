import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Header_landing from "../Header/Header_landing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Register.module.css";
import { useNavigate } from "react-router";

const Register = () => {
  // State to manage user inputs
  const navigate = useNavigate();

  const goStudent = () => {
    navigate("/register-student");
  };

  const goTeacher = () => {
    navigate("/register-teacher");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.body}>
      <Header_landing />

      <Card className={styles.card}>
        <h3 className={styles.title_comp}>Registration</h3>
        <div className={styles.users}>
          <div className={styles.student} onClick={goStudent}>
            <FontAwesomeIcon icon={faUser} className={styles.studentIcon} size="3x" />
            <h4 className={styles.text}>Student</h4>
          </div>
          <div className={styles.teacher} onClick={goTeacher}>
            <FontAwesomeIcon icon={faUserTie} className={styles.teacherIcon} size="3x" />
            <h4 className={styles.text}>Teacher</h4>
          </div>
        </div>
        <div className={styles.buttonContainer} onClick={goHome}>
          <Button className={styles.viewbutton}>Back</Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
