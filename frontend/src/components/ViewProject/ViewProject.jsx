import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import ProjectContents from "../ProjectContents/ProjectContents";
import styles from "./ViewProject.module.css";
import axios from "axios";
import { FaCaretDown } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import config from "../../config";

const ViewProject = () => {
  const [group, setGroup] = useState("");
  const [selected, setSelected] = useState();
  const [projects, setProjects] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { id, groupid } = useParams();
  const { API_HOST } = config;
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_HOST}/api/group/${groupid}/projects`
        );
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelected(response.data[0].id);
        }

        const groupResponse = await axios.get(
          `${API_HOST}/api/group/${groupid}`
        );
        setGroup(groupResponse.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [groupid]);

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBack = () => {
    navigate(`/classroom/${id}`);
  };

  if (!projects) {
    return <p></p>;
  }

  return (
    <div className={styles.body}>
      <p className={styles.text}>
        <span className={styles.back} onClick={handleBack}>
          <IoArrowBackSharp />
        </span>
        {group}
      </p>
      <div className={styles.top}>
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropbtn} onClick={handleDropdownClick}>
            <FaCaretDown />
          </div>
          {dropdownVisible && (
            <div className={styles.dropdowncontent}>
              {projects.map((project) => (
                <span
                  key={project.id}
                  onClick={() => {
                    setSelected(project.id);
                    setDropdownVisible(false);
                  }}
                >
                  {project.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <ProjectContents selected={selected} />
      </div>
    </div>
  );
};

export default ViewProject;
