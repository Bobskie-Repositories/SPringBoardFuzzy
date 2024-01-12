import React from "react";
import Boards from "../Boards/Board";
import ProjectContents from "../ProjectContents/ProjectContents";
import config from "../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IoArrowBackSharp } from "react-icons/io5";
import { useParams } from "react-router";
import styles from "./SearchProject.module.css";

const SearchProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    const path = sessionStorage.getItem("dashboard");
    console.log(path);
    navigate(path);
  };

  return (
    <div className={styles.body}>
      <span className={styles.back} onClick={handleBack}>
        <IoArrowBackSharp />
      </span>
      <ProjectContents selected={id} />
    </div>
  );
};

export default SearchProject;
