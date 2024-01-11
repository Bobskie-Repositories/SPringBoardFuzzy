import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaPen } from "react-icons/fa6";
import ModalCustom from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = ({ project, numTemplates, onProjectUpdate, user }) => {
  const [group, setGroup] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { API_HOST } = config;
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_HOST}/api/group/${project.group_fk}`
      );
      setGroup(response.data.name);
    };
    fetchData();
  }, [getUser]);

  const handleEditDetailModal = (projname, desc) => {
    setIsModalOpen(true);
    setModalContent(
      <div style={{ margin: "0 30px" }}>
        <div style={{ margin: "20px 0" }}>
          <b>Project Name:</b>
          <input
            type="text"
            id="projectname"
            defaultValue={projname ? projname : project.name}
            className={styles.textInput}
          />
        </div>
        <div>
          <b>Description:</b>
          <textarea
            id="projectdesc"
            defaultValue={desc ? desc : project.description}
            className={styles.textInput}
            style={{ height: "70px", resize: "none" }}
          />
        </div>
        <div className={styles.btmButton}>
          <Button
            className={styles.button}
            onClick={() => {
              const proj = document.getElementById("projectname").value;
              const desc = document.getElementById("projectdesc").value;
              updateProjectDetails(proj, desc);
            }}
          >
            Update
          </Button>

          <Button
            className={styles.button}
            style={{ backgroundColor: "#8A252C" }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateProjectDetails = async (newName, newDesc) => {
    const wordsArray = newDesc.split(/\s+/);
    const numberOfWords = wordsArray.length;
    if (numberOfWords <= 50 && numberOfWords >= 10) {
      try {
        await axios.put(`${API_HOST}/api/project/${project.id}/update`, {
          name: newName,
          description: newDesc,
          group_fk: project.group_fk,
        });
        Swal.fire({
          title: "Project Updated",
          icon: "success",
          confirmButtonColor: "#9c7b16",
        });
        onProjectUpdate();
      } catch (error) {
        Swal.fire("Error", "Update Error.", "error");
      }
      handleCloseModal();
    } else {
      handleCloseModal();
      Swal.fire({
        title: "Error",
        text: `Description should have 10 - 50 words. You have ${numberOfWords} words.`,
        icon: "error",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleEditDetailModal(newName, newDesc);
        }
      });
    }
  };

  return (
    <div className={styles.side}>
      <p className={styles.title}>Overall Project Rating</p>
      <span className={styles.number}>
        {Math.round((project.score / numTemplates) * 10)} %
      </span>

      <hr style={{ color: "#E5E4E2" }} />
      <div style={{ margin: "15px 0" }}>
        <p className={styles.title}>
          Project Details &nbsp;
          {user.group_fk === project.group_fk && (
            <span
              className={styles.pen}
              onClick={() => handleEditDetailModal()}
            >
              <FaPen />
            </span>
          )}
          {isModalOpen && (
            <ModalCustom
              width={500}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            >
              {modalContent}
            </ModalCustom>
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
