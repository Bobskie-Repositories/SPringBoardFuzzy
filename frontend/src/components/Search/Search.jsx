import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import axios from "axios";

const Search = ({ setSelected }) => {
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/project/public")
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
            <li key={project.id} className={styles.listItem}>
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
