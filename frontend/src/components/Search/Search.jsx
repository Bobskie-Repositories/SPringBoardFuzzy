import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styles from "./Search.module.css";
import axios from "axios";
import config from "../../config";

const Search = ({ setSelected, alternateAPI }) => {
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsListVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);

    if (searchText) {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
      setIsListVisible(true);
    } else {
      setFilteredProjects(projects);
      setIsListVisible(false);
    }
  };

  const handleOnClick = (id) => {
    navigate(`/search-project/${id}`);
    setIsListVisible(false); // Close the dropdown when clicking on an item
  };

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
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
