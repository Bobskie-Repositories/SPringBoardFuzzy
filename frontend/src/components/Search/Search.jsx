import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styles from "./Search.module.css";
import axios from "axios";
import Fuse from "fuse.js";
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
    const apiUrl = `${API_HOST}/api/project`;

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

    // console.log(projects);
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
      const fuse = new Fuse(projects, {
        keys: ["name", "description"],
        includeScore: true,
        threshold: 0.5,
      });

      const result = fuse.search(searchText);
      const sortedResults = result
        .map((item) => item.item)
        .sort((a, b) => b.score - a.score); // Sort in descending order based on score
      setFilteredProjects(sortedResults);
      setIsListVisible(true);
    } else {
      setFilteredProjects(projects);
      setIsListVisible(false);
    }
  };

  const handleOnClick = (id) => {
    const currentUrl = window.location.pathname;
    localStorage.setItem("search", currentUrl);
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
        onClick={() => handleSearch(searchText)}
      />
      <button className={styles.buttonSearch}>Seach</button>

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
