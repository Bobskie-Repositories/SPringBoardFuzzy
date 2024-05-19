import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaPen } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = ({ project, numTemplates, onProjectUpdate, user }) => {
  const [group, setGroup] = useState("");

  const { API_HOST } = config;
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_HOST}/api/group/${project.group_fk}`);
      setGroup(response.data.name);
    };
    fetchData();
  }, [getUser]);

  const handleEditDetailModal = (projname, desc) => {
    Swal.fire({
      html: `
      <label style="font-size: 14px; font-weight: 400; ">Project Name:</label>
        <input type="text" id="input1" value="${
          projname ?? project.name
        }" placeholder="Enter new project name" class="swal2-input" style="height: 35px; width: 86%; font-size: 16px; font-family: 'Calibri', sans-serif; display: flex;"/>
        <br>
        <label style="font-size: 14px; font-weight: 400; ">Description:</label>
        <textarea id="input2" placeholder="Enter project description" class="swal2-textarea" style="margin: 0 auto; width: 86%; height: 100px; resize: none; font-size: 16px; font-family: 'Calibri', sans-serif;" >${
          desc ?? project.description
        }</textarea>
        <div id="charCount" style="text-align: right; color: #555; font-size: 12px; margin-top: 5px;">0/200 characters</div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#9c7b16",
      cancelButtonText: "Close",
      cancelButtonColor: "rgb(181, 178, 178)",
      didOpen: () => {
        const input2 = document.getElementById("input2");
        const charCount = document.getElementById("charCount");

        const updateCharCount = () => {
          const currentLength = input2.value.length;
          charCount.innerText = `${currentLength}/200 characters`;

          if (currentLength > 200) {
            input2.value = input2.value.slice(0, 200);
          }
        };

        updateCharCount();

        input2.addEventListener("input", updateCharCount);
      },
      preConfirm: async () => {
        const input1Value = document.getElementById("input1").value;
        const input2Value = document.getElementById("input2").value;
        const wordsArray = input2Value.split(/\s+/);
        try {
          if (!input1Value && !input2Value) {
            Swal.showValidationMessage("Project name and description cannot be empty");
          } else if (!input1Value) {
            Swal.showValidationMessage("Project name cannot be empty");
          } else if (!input2Value) {
            Swal.showValidationMessage("Please enter the project description.");
          } else if (input1Value.length > 50) {
            Swal.showValidationMessage(`Project name should be at most 50 characters`);
          } else if (wordsArray.length < 10 || wordsArray.length > 50) {
            Swal.showValidationMessage(
              `Description should have 10 - 50 words. You have ${wordsArray.length} word/s.`
            );
          } else {
            try {
              await axios.put(`${API_HOST}/api/project/${project.id}/update`, {
                name: input1Value,
                description: input2Value,
                group_fk: project.group_fk,
              });
              Swal.fire({
                title: "Project Updated",
                icon: "success",
                confirmButtonColor: "#9c7b16",
              });
              onProjectUpdate();
            } catch (error) {
              Swal.showValidationMessage(
                `Project with the name '${input1Value}' already exists. Please enter another project name.`
              );
            }
          }
        } catch (error) {
          Swal.showValidationMessage(`Error: Creating project error;`);
        }
      },
    });
  };

  return (
    <div className={styles.side}>
      <p className={styles.title}>Overall Project Rating</p>
      <span className={styles.number}>
        {Math.round((project.score / (numTemplates * 100)) * 100)} %
      </span>

      <hr style={{ color: "#E5E4E2" }} />
      <div style={{ margin: "15px 0" }}>
        <p className={styles.title}>
          Project Details &nbsp;
          {user.group_fk === project.group_fk && (
            <span className={styles.pen} onClick={() => handleEditDetailModal()}>
              <FaPen />
            </span>
          )}
        </p>
        <p className={styles.title_body}>Name:</p>
        <p className={styles.body}>{project.name}</p>
        <p className={styles.title_body}>Description:</p>
        <p className={styles.body}>{project.description}</p>
      </div>
      {(user.is_staff || user.group_fk !== project.group_fk) && (
        <>
          <hr style={{ color: "#E5E4E2" }} />
          <p className={styles.title_body}>Created by: Group {group}</p>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
