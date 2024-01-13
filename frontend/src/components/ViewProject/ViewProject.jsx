import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import ProjectContents from "../ProjectContents/ProjectContents";
import styles from "./ViewProject.module.css";
import axios from "axios";
import { IoArrowBackSharp } from "react-icons/io5";
import config from "../../config";

const ViewProject = () => {
  const [group, setGroup] = useState("");
  const [selected, setSelected] = useState();
  // const [projects, setProjects] = useState();
  const { id, groupid } = useParams();
  const { API_HOST } = config;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_HOST}/api/group/${groupid}/projects`
        );
        // setProjects(response.data);
        const activeProject = response.data.find((project) => project.isActive);

        if (activeProject) {
          setSelected(activeProject.id);
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
  }, []);

  const handleBack = () => {
    navigate(`/classroom/${id}`);
  };

  if (!group) {
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
      <ProjectContents
        selected={selected}
        setSelected={setSelected}
        isClass={true}
      />
    </div>
  );
};

export default ViewProject;
