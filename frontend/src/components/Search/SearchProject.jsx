import React from "react";
import Boards from "../Boards/Board";
import ProjectContents from "../ProjectContents/ProjectContents";
import config from "../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./SearchProject.module.css";

const SearchProject = () => {
  const { id } = useParams();

  return (
    <div className={styles.body}>
      <ProjectContents selected={id} />
    </div>
  );
};

export default SearchProject;
