import React from "react";
import styles from "./Board.module.css";
import Card from "../UI/Card/Card";
import IdeaIcon from "@assets/idea.png";
import Button from "../UI/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgressWithLabel from "../UI/ProgressBar/CircularProgressWithLabel";
import Loading from "../UI/Loading/Loading";
import ModalCustom from "../UI/Modal/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Caution from "../UI/Caution/Caution";
import config from "../../config";

function Board({
  selected,
  setBoardCount,
  onProjectUpdate,
  setBoardTemplateIds,
  projectUpdateKey,
}) {
  const navigate = useNavigate();
  const [loadCount, setLoadCount] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState();
  const [boards, setBoards] = useState([]);
  const [staff, setStaff] = useState(false);
  const [groupKey, setGroupKey] = useState();

  const [modalContent, setModalContent] = useState(null);

  const [newProjName, setNewProjName] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [updateS, setUpdateS] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getUser } = useAuth();
  const { API_HOST } = config;

  const theme = createTheme({
    palette: {
      success: {
        main: "#87EE63",
        light: "#81c784",
        dark: "#388e3c",
        contrastText: "#242105",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setStaff(user.is_staff);
        setGroupKey(user.group_fk);
        setLoadCount((prevLoadCount) => prevLoadCount + 1);
        if (selected !== null && selected !== undefined) {
          const boardsResponse = await axios.get(
            `${API_HOST}/api/project/${selected}/projectboards`
          );
          const boards = boardsResponse.data;
          // const templateIds = new Set(boards.map((board) => board.templateId));

          // Set the templateIds
          if (setBoardTemplateIds) {
            const templateIds = new Set(
              boards.map((board) => board.templateId)
            );
            setBoardTemplateIds(templateIds);
          }
          setBoards(boards);

          const projectResponse = await axios.get(
            `${API_HOST}/api/project/${selected}`
          );
          const project = projectResponse.data;
          setProject(project);

          const projectListResponse = await axios.get(
            `${API_HOST}/api/group/${project.group_fk}/projects`
          );
          setProjectList(projectListResponse.data);
          setNewProjName(project.name);
          setNewProjDesc(project.description);
          //checks if there is setBoardCount that was passed
          if (typeof setBoardCount === "function") {
            const boardCount = boards.length;
            setBoardCount(boardCount);
          }
        } else {
          //set to nothing
          setProject();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selected, setBoardCount, getUser, updateS, projectUpdateKey]);

  // another useEffect was used due to the behavior of the modal wherein it doesn't get the updated value
  // we have to utilize useEffect to update the modal's information
  useEffect(() => {
    if (updateS) {
      updateProjectDetails(newProjName, newProjDesc);
      //this is to give signal that project has changed
      onProjectUpdate();

      handleCloseModal();
      Swal.fire({
        title:
          '<span style="font-size: 20px">Project Sucessfully Updated</span>',
        icon: "success",
        confirmButtonColor: "#9c7b16",
        confirmButtonText: "OK",
      });
    }
    setUpdateS(false);
  }, [newProjName, newProjDesc, updateS]);

  const handleToggleClick = async (event) => {
    setIsModalOpen(true);
    if (!project.isActive) {
      setModalContent(
        <div className={styles.yScroll} style={{ textAlign: "center" }}>
          <Caution />
          <h2>
            You are activating <b>"{project.name}"</b>
          </h2>

          <div>
            {projectList.length > 1 ? (
              <div>
                <p style={{ fontSize: "14px" }}>
                  You have {projectList.length - 1} other project in your group.
                  Before activating this project, please select a reason why the
                  other projects are not activated/discontinued.
                </p>
                {projectList
                  .filter((projectItem) => projectItem.id !== selected)
                  .map((projectItem) => (
                    <div key={projectItem.id} style={{ textAlign: "left" }}>
                      <p>
                        <b>{projectItem.name}</b>
                      </p>
                      <textarea
                        id={projectItem.id}
                        placeholder="State the reason"
                        defaultValue={projectItem.reason}
                        className={styles.textarea}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>
                Are you sure you want to activate this project?
              </p>
            )}
          </div>
          <div className={styles.btmButton}>
            <Button
              className={styles.button}
              style={{ backgroundColor: "#5fab3c" }}
              onClick={() => {
                projectList
                  .filter((projectItem) => projectItem.id !== selected)
                  .forEach((projectItem) => {
                    const textareaValue = document.getElementById(
                      projectItem.id
                    ).value;
                    updateProjectReason(projectItem, textareaValue);
                  });
                toggleProjectPublic(project, "None");
                setIsModalOpen(false);
              }}
            >
              Confirm
            </Button>
            <Button
              className={styles.button}
              style={{ backgroundColor: "rgb(181, 178, 178)" }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    } else {
      // The project is already active
      setModalContent(
        <div style={{ textAlign: "center" }}>
          <Caution />
          <h2>Are you sure you want to deactivate this project?</h2>
          <textarea
            id="input2"
            placeholder="State the reason"
            className={styles.textarea}
          />

          <div className={styles.btmButton}>
            <Button
              onClick={() => {
                const textareaValue = document.getElementById("input2").value;
                toggleProjectPublic(project, textareaValue);
                setIsModalOpen(false);
              }}
              className={styles.button}
              style={{ backgroundColor: "#8A252C" }}
            >
              Deactivate
            </Button>
            <Button
              className={styles.button}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }
  };

  const updateProjectReason = async (project, reason) => {
    const newStatus = project.isActive ? !project.isActive : project.isActive;
    try {
      await axios.put(`${API_HOST}/api/project/${project.id}/update`, {
        name: project.name,
        reason: reason,
        isActive: newStatus,
        group_fk: project.group_fk,
      });
    } catch (error) {
      Swal.fire("Error", "Please provide a reason.", "error");
    }
  };

  const updateProjectDetails = async (newName, newDesc) => {
    try {
      await axios.put(`${API_HOST}/api/project/${project.id}/update`, {
        name: newName,
        description: newDesc,
        group_fk: project.group_fk,
      });
    } catch (error) {
      Swal.fire("Error", "Update Error.", "error");
    }
  };

  const toggleProjectPublic = async (project, reason) => {
    const newisActive = !project.isActive;
    try {
      await axios.put(`${API_HOST}/api/project/${project.id}/update`, {
        name: project.name,
        reason: reason,
        isActive: newisActive,
        group_fk: project.group_fk,
      });
      setProject((prevProject) => ({
        ...prevProject,
        isActive: newisActive,
      }));
      onProjectUpdate();
    } catch (error) {
      Swal.fire("Error", "Please provide a reason.", "error");
    }
  };

  const handleOpenDetailModal = () => {
    setIsModalOpen(true);
    setModalContent(
      <div className={styles.yScroll} style={{ margin: "0 30px" }}>
        <p>
          <b>Project Name:</b> {project.name}
        </p>
        <p>
          <b>Description:</b>
        </p>
        <p style={{ marginLeft: "30px" }}>{project.description}</p>
        <p>
          <b>Overall Score: </b> {project.score.toFixed(2)} %
        </p>
        <div className={styles.btmButton}>
          {!staff && project.group_fk === groupKey && (
            <Button className={styles.button} onClick={handleEditDetailModal}>
              Edit
            </Button>
          )}
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

  const handleEditDetailModal = () => {
    setModalContent(
      <div style={{ margin: "0 30px" }}>
        <div style={{ margin: "20px 0" }}>
          <b>Project Name:</b>
          <input
            type="text"
            id="projectname"
            defaultValue={newProjName}
            onChange={(e) => setNewProjName(e.target.value)}
            className={styles.textInput}
          />
        </div>
        <div>
          <b>Description:</b>
          <textarea
            id="projectdesc"
            defaultValue={newProjDesc}
            onChange={(e) => setNewProjDesc(e.target.value)}
            className={styles.textInput}
            style={{ height: "70px", resize: "none" }}
          />
        </div>
        <div className={styles.btmButton}>
          {!staff && (
            <Button
              className={styles.button}
              onClick={() => {
                setNewProjName((prevName) => prevName);
                setNewProjDesc((prevDesc) => prevDesc);
                setUpdateS(true);
              }}
            >
              Update
            </Button>
          )}
          <Button
            className={styles.button}
            style={{ backgroundColor: "#8A252C" }}
            onClick={handleOpenDetailModal}
          >
            Back
          </Button>
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onClickView = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div>
      {project ? (
        <ThemeProvider theme={theme}>
          <div className={styles.alignment}>
            <div className={styles.head}>
              {project.name} Boards
              <span className={styles.info} onClick={handleOpenDetailModal}>
                <IoIosInformationCircleOutline />
              </span>
            </div>
            {!staff && (
              <div className={`${styles.publish} ${styles.rightAligned}`}>
                {project.isActive ? "Activated" : "Inactive"}
                <Switch
                  onChange={(event) => handleToggleClick(event)}
                  inputProps={{ "aria-label": "controlled" }}
                  checked={project.isActive}
                  color="success"
                />
              </div>
            )}
          </div>
        </ThemeProvider>
      ) : loadCount === 0 ? (
        <Loading />
      ) : (
        <p className={styles.centeredText}>
          There's no project created in this group.
        </p>
      )}

      {/* for modals */}
      {isModalOpen && (
        <ModalCustom
          width={500}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          {modalContent}
        </ModalCustom>
      )}

      {/* if there are boards present in a project */}
      <div className={styles.scrollable}>
        {project && boards.length === 0 && (
          <p className={styles.centeredText}>
            It looks like you haven't created any boards yet. <br /> Click on
            the "Create Board" button to get started and create your first
            board.
          </p>
        )}
        {boards.map((board) => {
          return (
            <div key={board.id}>
              <Card className={styles.card}>
                <div className={styles.container}>
                  <div className={styles.subcontainer}>
                    <img
                      className={styles.ideaicon}
                      src={IdeaIcon}
                      alt="IdeaIcon"
                    />
                  </div>

                  <div>
                    <h3>Board: {board.title}</h3>
                    <>
                      <div className={styles.cards}>
                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Novelty</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.novelty * 10}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Capability</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.capability * 10}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratingstech}>
                            Technical Feasibility
                          </h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.technical_feasibility * 10}
                            />
                          </div>
                        </Card>
                      </div>
                      <Button
                        className={styles.viewbutton}
                        onClick={() => onClickView(board.id)}
                      >
                        View Board
                      </Button>
                    </>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
