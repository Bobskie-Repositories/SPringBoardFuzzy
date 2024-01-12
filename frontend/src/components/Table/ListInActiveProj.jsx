import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "./Table.module.css";
import global from "@assets/global.module.css";
import Card from "../UI/Card/Card";
import config from "../../config";

const ListInActiveProj = (props) => {
  const [projects, setProjects] = useState([]);
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(() => {
    // Use a function to initialize the state with the value from localStorage
    const savedPage = localStorage.getItem("inactiveProjPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const projectsPerPage = 10;
  const navigate = useNavigate();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/inactive_proj`);
        const filteredAndClassroomGroups =
          props.filter.length > 0
            ? response.data.filter((group) =>
                props.filter.includes(group.classroom_id)
              )
            : response.data;
        setProjects(filteredAndClassroomGroups);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props]);

  useEffect(() => {
    // Save the current page to localStorage whenever it changes
    localStorage.setItem("inactiveProjPage", currentPage.toString());
  }, [currentPage]);

  const handleSort = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      const aScore = a.score;
      const bScore = b.score;

      return sortOrder ? aScore - bScore : bScore - aScore;
    });

    setProjects(sortedProjects);
    setSortOrder(!sortOrder);
  };

  // Calculate the projects to display based on currentPage
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const projectsToDisplay = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const time = (timestamp) => {
    const dateObject = new Date(timestamp);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = dateObject.getFullYear();
    const month = monthNames[dateObject.getMonth()]; // Use the array to get the month name
    const day = dateObject.getDate().toString().padStart(2, "0");
    const dateOnlyString = `${month} ${day}, ${year}`;
    return dateOnlyString;
  };

  const handleTimeSort = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      const aTime = new Date(a.created_at);
      const bTime = new Date(b.created_at);

      return sortOrder ? aTime - bTime : bTime - aTime;
    });

    setProjects(sortedProjects);
    setSortOrder(!sortOrder);
  };

  const handleSelectProj = (projId) => {
    const currentUrl = window.location.pathname;
    localStorage.setItem("search", currentUrl);
    navigate(`/search-project/${projId}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
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

        <div className={styles.xScroll}>
          <div
            className={!!props.admin ? styles.adminContainer : styles.container}
            style={{
              borderBottom: "1px solid #9c7b16",
              color: "#BCBEC0",
              marginBottom: "10px",
            }}
          >
            {!!props.admin && (
              <span className={styles.centerText}>Classroom</span>
            )}
            <span className={styles.centerText}>Project Name</span>
            <span className={styles.centerText}>Created By</span>
            <span
              className={`${styles.centerText} ${styles.clickable}`}
              onClick={handleSort}
            >
              Rating
            </span>
            <span className={styles.centerText}>Description</span>
            <span className={styles.centerText}>Handled By</span>
            <span className={styles.centerText}>
              Reason for discontinuing the project
            </span>
            {!!props.admin && (
              <span
                className={`${styles.centerText} ${styles.clickable}`}
                onClick={handleTimeSort}
              >
                Date Created
              </span>
            )}
          </div>
          <div className={styles.yScroll}>
            {projectsToDisplay.map((project) => (
              <div
                className={
                  !!props.admin ? styles.adminContainer : styles.groupContainer
                }
                style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                key={project.id}
              >
                {!!props.admin && (
                  <span className={styles.centerText}>
                    {project.classroom_name}
                  </span>
                )}

                <span
                  className={styles.centerTextName}
                  onClick={() => handleSelectProj(project.id)}
                >
                  {project.name}
                </span>

                <span className={styles.centerText}>{project.group_name}</span>
                <span className={styles.centerText}>
                  {project.score === 0
                    ? 0
                    : Math.round((project.score / project.template_count) * 10)}
                  %
                </span>
                <span className={styles.centerText}>{project.description}</span>
                <span className={styles.centerText}>
                  {project.teacher_name}
                </span>
                <span className={styles.centerText} style={{ color: "red" }}>
                  {project.reason}
                </span>
                {!!props.admin && (
                  <span className={styles.centerText}>
                    {time(project.created_at)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
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
