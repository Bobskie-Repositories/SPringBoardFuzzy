import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Card from "../UI/Card/Card";
import styles from "./ViewClassroom.module.css";
import global from "@assets/global.module.css";
import axios from "axios";
import ListActiveProj from "../Table/ListActiveProj";
import config from "../../config";

const ViewClassroom = ({ selected }) => {
  const [classroom, setClassroom] = useState(null);
  const [groups, setGroups] = useState(null);
  const { id } = useParams();
  const { API_HOST } = config;
  const [templates, setTemplates] = useState([]);

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
    axios
      .get(`${API_HOST}/api/template/`)
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selected, id]);

  if (!groups || !templates) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 style={{ fontSize: "30px", color: "#9c7b16" }}>{classroom}</h2>
      <ListActiveProj groups={groups} templates={templates} />
    </div>
  );
};

export default ViewClassroom;
