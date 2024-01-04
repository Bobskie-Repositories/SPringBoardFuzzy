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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Caution from "../UI/Caution/Caution";
import config from "../../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Board({
  selected,
  setBoardCount,
  onProjectUpdate,
  setBoardTemplateIds,
}) {
  const navigate = useNavigate();
  const [loadCount, setLoadCount] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState();
  const [boards, setBoards] = useState([]);
  const [staff, setStaff] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { getUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { API_HOST } = config;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        setLoadCount((prevLoadCount) => prevLoadCount + 1);
        if (selected !== null && selected !== undefined) {
          const boardsResponse = await axios.get(
            `${API_HOST}/api/project/${selected}/projectboards`
          );
          const boards = boardsResponse.data;
          const templateIds = new Set(boards.map((board) => board.templateId));

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

          //checks if there is setBoardCount that was passed
          if (typeof setBoardCount === "function") {
            const boardCount = boards.length;
            setBoardCount(boardCount);
          }
        } else {
          setProject();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selected, setBoardCount, getUser]);

  const handleToggleClick = async (event) => {
    setIsModalOpen(true);
    if (!project.isActive) {
      setModalContent(
        <div style={{ textAlign: "center" }}>
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

  const onClickView = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div>
      {project ? (
        <ThemeProvider theme={theme}>
          <div className={styles.alignment}>
            <div className={styles.head}>{project.name} Boards</div>
            {!staff && (
              <div className={styles.publish}>
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

      {isModalOpen && (
        <ModalCustom
          width={500}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          {modalContent}
        </ModalCustom>
      )}

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
