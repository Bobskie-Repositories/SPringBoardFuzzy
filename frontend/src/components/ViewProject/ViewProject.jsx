import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./ViewProject.module.css";
import axios from "axios";
import Board from "../Boards/Board";

const ViewProject = ({ selected }) => {
  const [group, setGroup] = useState("");
  const { groupid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/group/${groupid}`
        );
        setGroup(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [groupid]);

  return (
    <div className={styles.body}>
      <p className={styles.text}>{group}</p>
      <Board selected={selected} />
    </div>
  );
};

export default ViewProject;
