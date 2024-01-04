import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import styles from "./TemplateList.module.css";
import Card from "../UI/Card/Card";
import config from "../../config";

const TemplateList = () => {
  const [checked, setChecked] = useState(true);
  const [templates, setTemplates] = useState([]);
  const { getUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/template/`);
        setTemplates(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_card}>
        <div className={styles.scrollable}>
          {!isLoading && templates.length === 0 && (
            <p className={styles.centeredText}>
              It looks like you haven't created any templates yet. <br /> Click
              on the "Create Template" button to get started and create your
              first template.
            </p>
          )}
          {templates.map((template) => (
            <Card
              key={template.id}
              className={styles.container_board}
              onClick={() => navigate(`template/${template.id}`)}
            >
              <div className={styles.words}>
                <h3>{template.title}</h3>
                <p>{template.description}</p>
              </div>

              <div className={styles.date}>
                <p>Date Created: {formatDate(template.created_at)}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
