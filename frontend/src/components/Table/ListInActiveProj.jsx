import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import global from "@assets/global.module.css";
import Card from "../UI/Card/Card";

const ListInActiveProj = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

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

  // Calculate the projects to display based on currentPage
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const projectsToDisplay = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPageCount = Math.ceil(projects.length / projectsPerPage);
  return (
    <div>
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

        {projectsToDisplay.map((project) => (
          <div className={styles.container} key={project.id}>
            <span className={styles.centerText}>{project.name}</span>
            <span className={styles.centerText}>{project.group_name}</span>
            <span className={styles.centerText}>{project.classroom_name}</span>
            <span className={styles.centerText}>{project.teacher_name}</span>
            <span className={styles.centerText} style={{ color: "red" }}>
              {project.reason}
            </span>
            <span className={styles.centerText}>
              {project.score === 0 ? 0 : project.score / project.template_count}
              %
            </span>
          </div>
        ))}
      </Card>
      <div className={styles.pagination}>
        <span
          onClick={handlePreviousPage}
          className={currentPage === 1 ? styles.disabled : ""}
        >
          &lt;&lt;
        </span>
        <span>&nbsp; {currentPage} &nbsp; </span>
        <span
          onClick={handleNextPage}
          className={currentPage === totalPageCount ? styles.disabled : ""}
        >
          &gt;&gt;
        </span>
      </div>
    </div>
  );
};

export default ListInActiveProj;
