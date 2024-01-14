import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import styles from "./SearchList.module.css";
import axios from "axios";
import Fuse from "fuse.js";
import config from "../../config";

const SearchList = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const navigate = useNavigate();
  const { API_HOST } = config;

  const [currentPage, setCurrentPage] = useState(() => {
    // Use a function to initialize the state with the value from localStorage
    const savedPage = localStorage.getItem("searchProjPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const groupsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/project`);
        const fuse = new Fuse(response.data, {
          keys: ["name", "description"],
          includeScore: true,
          threshold: 0.5,
        });

        const result = fuse.search(query);
        const sortedResults = result
          .map((item) => item.item)
          .sort((a, b) => b.score - a.score);
        setProjects(sortedResults);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
      // sessionStorage.getItem("dashboard");
      console.log(search);
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("searchProjPage", currentPage.toString());
  }, [currentPage]);

  const handleOnClick = (id) => {
    const currentUrl = window.location.pathname;
    localStorage.setItem("search", currentUrl);
    navigate(`/search-project/${id}`);
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

  if (!projects) {
    return <p></p>;
  }

  const totalPageCount = Math.ceil(projects.length / groupsPerPage);
  const startIndex = (currentPage - 1) * groupsPerPage;
  const endIndex = startIndex + groupsPerPage;

  // Get the groups for the current page
  const projectsToDisplay = projects.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {projects.length > 0 ? (
          <>
            <p className={styles.header}>Results for "{query}"</p>
            {projectsToDisplay.map((project) => (
              <div key={project.id} className={styles.projectItem}>
                <p
                  className={styles.title}
                  onClick={() => handleOnClick(project.id)}
                >
                  {project.name}
                </p>
                <p className={styles.description}>{project.description}</p>
              </div>
            ))}
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
                className={
                  currentPage === totalPageCount ? styles.disabled : ""
                }
              >
                &gt;&gt;
              </span>
            </div>
          </>
        ) : (
          <div className={styles.center}>
            <p className={styles.header}>
              Sorry! We looked everywhere, but could not find:
            </p>
            <p className={styles.query}>"{query}"</p>
            <span className={styles.suggestion}>
              To get pointed in the right direction, double check your spelling
              or try using a more general search term.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
