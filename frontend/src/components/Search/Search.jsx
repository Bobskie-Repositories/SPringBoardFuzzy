import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./Search.module.css";
import axios from "axios";
import config from "../../config";

const Search = ({ setSelected, alternateAPI }) => {
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { API_HOST } = config;

  useEffect(() => {
    const apiUrl =
      alternateAPI === 1
        ? `${API_HOST}/api/project`
        : `${API_HOST}/api/project/public`;
    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        setProjects(response.data);
        setFilteredProjects(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (searchText) => {
    setSearchText(searchText);

    if (searchText) {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      // Reset the filtered list when the search query is empty
      setFilteredProjects(projects);
    }
  };

  const handleOnClick = (id) => {
    navigate(`/search-project/${id}`);
  };

  const isListVisible = !!searchText;

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.Search}
        value={searchText}
        onChange={(event) => {
          const searchText = event.target.value;
          handleSearch(searchText);
        }}
      />
      {!isLoading && isListVisible && (
        <ul className={styles.itemList}>
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className={styles.listItem}
              onClick={() => handleOnClick(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
