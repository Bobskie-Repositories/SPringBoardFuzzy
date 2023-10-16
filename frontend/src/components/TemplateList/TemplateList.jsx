import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import styles from "./TemplateList.module.css";
import Card from "../UI/Card/Card";
import Swal from "sweetalert2";
import { Switch } from "@mui/material";

const TemplateList = () => {
  const [checked, setChecked] = useState(true);
  const [templates, setTemplates] = useState([]);
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        const response = await axios.get(
          `http://127.0.0.1:8000/api/teacher/template/${user.id}/`
        );
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleClick = async (template) => {
    if (!template.isPublic) {
      const result = await Swal.fire({
        title: "Are you sure you want to publish this template?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Publish",
        cancelButtonText: "Cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        toggleTemplatePublic(template);
      }
    } else {
      // The template is already public
      const result = await Swal.fire({
        title: "Are you sure you want to unpublish this template?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Unpublish",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        toggleTemplatePublic(template);
      }
    }
  };

  const toggleTemplatePublic = async (template) => {
    const newIsPublic = !template.isPublic;
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/template/${template.id}/update`,
        {
          title: template.title,
          content: template.content,
          rules: template.rules,
          description: template.description,
          isPublic: newIsPublic,
          teacher_fk: template.teacher_fk,
        }
      );

      setTemplates((prevTemplates) =>
        prevTemplates.map((prevTemplate) =>
          prevTemplate.id === template.id
            ? { ...prevTemplate, isPublic: newIsPublic }
            : prevTemplate
        )
      );
    } catch (error) {
      console.error("Error updating isPublic:", error);
      Swal.fire("Error", "Failed to publish the template", "error");
    }
  };

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
          {templates.map((template) => (
            <Card key={template.id} className={styles.container_board}>
              <div className={styles.words}>
                <h3>{template.title}</h3>
                <p>{template.description}</p>
              </div>

              <div className={styles.date}>
                <p>Date Created: {formatDate(template.created_at)}</p>
                <div className={styles.publish}>
                  <p>Publish</p>
                  <Switch
                    onChange={(event) => handleToggleClick(template)}
                    inputProps={{ "aria-label": "controlled" }}
                    checked={template.isPublic}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
