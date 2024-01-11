import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import ListActiveProj from "../Table/ListActiveProj";
import { useAuth } from "../../context/AuthContext";
import styles from "./ViewClassroom.module.css";
import axios from "axios";
import config from "../../config";

const ViewClassroom = ({ selected }) => {
  const [classroom, setClassroom] = useState(null);
  const [groups, setGroups] = useState(null);
  const [templates, setTemplates] = useState([]);
  const { getUser } = useAuth();
  const { id } = useParams();
  const { API_HOST } = config;
  const navigate = useNavigate();

  useEffect(() => {
    if (selected !== null && selected !== undefined) {
      axios
        .get(`${API_HOST}/api/classroom/${id}/class_group_proj`)
        .then((response) => {
          setClassroom(response.data.name);
          setGroups(response.data.groups);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selected, id]);

  const handleBack = async () => {
    const user = await getUser();
    const userId = user.id;
    navigate(`/teacher/${userId}`);
  };

  if (!groups || !templates) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className={styles.body}>
        <span className={styles.back} onClick={handleBack}>
          <IoArrowBackSharp />
        </span>
        <h2 style={{ fontSize: "30px", color: "#9c7b16" }}>{classroom}</h2>
      </div>
      <ListActiveProj groups={groups} />
    </div>
  );
};

export default ViewClassroom;
