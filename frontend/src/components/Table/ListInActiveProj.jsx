import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import global from "@assets/global.module.css";
import Card from "../UI/Card/Card";

const ListInActiveProj = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/inactive_proj"
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className={styles.card}>
      <div
        className={global.brown}
        style={{ borderRadius: "12px 12px 0 0", padding: "2px 30px" }}
      >
        <p className={styles.header}> List of Deactivated Projects </p>
      </div>

      <div
        className={styles.container}
        style={{
          borderBottom: "1px solid #9c7b16",
          color: "#BCBEC0",
          marginBottom: "10px",
        }}
      >
        <span className={styles.centerText}>Project Name</span>
        <span className={styles.centerText}>Created By</span>
        <span className={styles.centerText}>Section</span>
        <span className={styles.centerText}>Handled By</span>
        <span className={styles.centerText}>
          Reason for discontinuing the project
        </span>
        <span className={styles.centerText}>Rating</span>
      </div>

      {projects.map((project) => (
        <div className={styles.container}>
          <span className={styles.centerText}>{project.name}</span>
          <span className={styles.centerText}>{project.group_name}</span>
          <span className={styles.centerText}>{project.classroom_name}</span>
          <span className={styles.centerText}>{project.teacher_name}</span>
          <span className={styles.centerText} style={{ color: "red" }}>
            {project.reason}
          </span>
          <span className={styles.centerText}>
            {project.score === 0 ? 0 : project.score / project.template_count}%
          </span>
        </div>
      ))}
    </Card>
  );
};

export default ListInActiveProj;
