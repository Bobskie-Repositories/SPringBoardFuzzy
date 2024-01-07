import React from "react";
import Boards from "../Boards/Board";
import config from "../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./SearchProject.module.css";

const SearchProject = () => {
  const [group, setGroup] = useState("");
  const { id } = useParams();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const project = await axios.get(`${API_HOST}/api/project/${id}`);
        const response = await axios.get(
          `${API_HOST}/api/group/${project.data.group_fk}`
        );
        setGroup(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.body}>
      <p className={styles.text}>{group}</p>
      <Boards selected={id} />
    </div>
  );
};

export default SearchProject;
