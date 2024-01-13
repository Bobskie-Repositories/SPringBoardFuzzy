import React from "react";
import styles from "./Board.module.css";
import Board from "./Board";
import Button from "../UI/Button/Button";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "../UI/Loading/Loading";
import ModalCustom from "../UI/Modal/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import Caution from "../UI/Caution/Caution";
import { FaCaretDown } from "react-icons/fa";
import config from "../../config";

const BoardContainer = ({
  selected,
  project,
  setBoardCount,
  onProjectUpdate,
  setBoardTemplateIds,
  projectUpdateKey,
  handleCreateBoardClick,
  setSelected,
  isClass,
}) => {
  const navigate = useNavigate();
  const [loadCount, setLoadCount] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [staff, setStaff] = useState(false);
  const [groupKey, setGroupKey] = useState();
  const [selectedProj, setSelectedProj] = useState(selected);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getUser } = useAuth();
  const { API_HOST } = config;
  const dropdownRef = useRef(null);

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
        if (!user.is_staff) {
          setGroupKey(user.group_fk);
        }

        setLoadCount((prevLoadCount) => prevLoadCount + 1);
        if (selected !== null && selected !== undefined) {
          const projectListResponse = await axios.get(
            `${API_HOST}/api/group/${project.group_fk}/projects`
          );
          setProjectList(projectListResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:" + error, error);
      }
    };
    fetchData();
  }, [selected, getUser, projectUpdateKey]);

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

  const toggleProjectPublic = async (project, reason) => {
    const newisActive = !project.isActive;
    try {
      await axios.put(`${API_HOST}/api/project/${project.id}/update`, {
        name: project.name,
        reason: reason,
        isActive: newisActive,
        group_fk: project.group_fk,
      });
      onProjectUpdate();
    } catch (error) {
      Swal.fire("Error", "Please provide a reason.", "error");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <div className={styles.board}>
      {project ? (
        <ThemeProvider theme={theme}>
          <div className={styles.alignment}>
            <div className={styles.head}>{project.name} Boards</div>
            {!staff && project.group_fk === groupKey && (
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

            {staff && isClass && (
              <div>
                <div className={styles.top} onClick={handleDropdownClick}>
                  <div className={styles.dropdown} ref={dropdownRef}>
                    <div className={styles.dropbtn}>
                      <span>View other project &nbsp;</span>
                      <FaCaretDown />
                    </div>
                    {dropdownVisible && (
                      <div className={styles.dropdowncontent}>
                        {projectList.map((project) => (
                          <span
                            key={project.id}
                            onClick={() => {
                              setSelected(project.id);
                              setDropdownVisible(!dropdownVisible);
                            }}
                          >
                            {project.isActive ? (
                              <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.greenBullet}
                                size="xs"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCircle}
                                className={styles.clear}
                                size="xs"
                              />
                            )}

                            <p style={{ padding: 0, margin: 0 }}>
                              {project.name}
                            </p>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr style={{ color: "#E5E4E2" }} />
          {!staff && groupKey === project.group_fk && (
            <Button className={styles.butName} onClick={handleCreateBoardClick}>
              Create Board
            </Button>
          )}
        </ThemeProvider>
      ) : loadCount === 0 ? (
        <Loading />
      ) : (
        <p className={styles.centeredText}>
          There's no project created in this group.
        </p>
      )}

      {/* ----------- */}
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

      {/* ----------- */}
      <Board
        selected={selected}
        project={project}
        setBoardCount={setBoardCount}
        onProjectUpdate={onProjectUpdate}
        setBoardTemplateIds={setBoardTemplateIds}
        projectUpdateKey={projectUpdateKey}
        handleCreateBoardClick={handleCreateBoardClick}
      />
    </div>
  );
};

export default BoardContainer;
