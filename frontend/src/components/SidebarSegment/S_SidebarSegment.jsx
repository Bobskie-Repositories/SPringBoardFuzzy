import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./SidebarSegment.module.css";
import global from "../../assets/global.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSquareCaretDown,
  faTrash,
  faSquareCaretRight,
  faDiagramProject,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

const S_SidebarSegment = ({ selected, setSelected, sidebarKey }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const [editableProjectId, setEditableProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [isInactiveClicked, setisInactiveClicked] = useState(false);
  const [userGroupId, setUserGroupId] = useState("");
  const [staff, setStaff] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { groupid } = useParams();
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setStaff(user.is_staff);
      setUserGroupId(user.group_fk);
      setIsLoading(false);

      axios
        .get(
          `http://127.0.0.1:8000/api/group/${
            groupid !== undefined ? groupid : user.group_fk
          }/projects`
        )
        .then((response) => {
          setProjects(response.data);
          setSelected(response.data[0].id);
          setClickedProjectId(response.data[0].id);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [setSelected, getUser]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `http://127.0.0.1:8000/api/group/${
            groupid !== undefined ? groupid : user.group_fk
          }/projects`
        )
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, [sidebarKey]);

  const handleButtonClick = (projectId) => {
    setisInactiveClicked(false);
    setSelected(projectId);
    setClickedProjectId(projectId);
  };

  const handleNameIconClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleInactiveClick = (e) => {
    setisInactiveClicked(!isInactiveClicked);
    setClickedProjectId(null);
    navigate("/inactive");
  };

  const handleProjectDoubleClick = (projectId) => {
    if (editableProjectId === null) {
      setEditableProjectId(projectId);
      const projectToEdit = projects.find(
        (project) => project.id === projectId
      );
      setEditedProjectName(projectToEdit.name);
    }
  };

  const handleEditProjectName = () => {
    if (!editedProjectName) {
      Swal.fire({
        icon: "error",
        title: "Project name cannot be empty",
        confirmButtonColor: "#8A252C",
      });
    } else if (
      projects.some(
        (p) => p.name === editedProjectName && p.id !== editableProjectId
      )
    ) {
      Swal.fire({
        icon: "error",
        title: `Project with the name '${editedProjectName}' already exists`,
        text: "Please enter another project name.",
        confirmButtonColor: "#8A252C",
      });
    } else {
      const updatedProjects = projects.map((project) => {
        if (project.id === editableProjectId) {
          const updatedProject = { ...project, name: editedProjectName };

          axios
            .put(
              `http://127.0.0.1:8000/api/project/${project.id}/update`,
              updatedProject
            )
            .then((response) => {
              console.log("Project name updated");
            })
            .catch((error) => {
              console.error("Error updating project name:", error);
            });

          return updatedProject;
        }
        return project;
      });

      setProjects(updatedProjects);
      setEditableProjectId(null);
    }
  };

  const addProject = async (newProject, desc) => {
    try {
      const getCurrentTimestamp = () => {
        const now = new Date();
        const isoTimestamp = now.toISOString();
        return isoTimestamp;
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/api/project/create`,
        {
          name: newProject,
          description: desc,
          group_fk: userGroupId,
          created_at: getCurrentTimestamp(),
        }
      );

      const newProjectId = response.data.id;
      const newProjectResponse = await axios.get(
        `http://127.0.0.1:8000/api/project/${newProjectId}`
      );
      const newProjectData = newProjectResponse.data;

      setProjects([...projects, newProjectData]);

      // console.log("ProjectB created successfully:", response.data.id);
    } catch (error) {
      console.error("Error creating Project:", error);
    }
  };

  const deleteProject = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/project/${clickedProjectId}/delete`
      );
      const updatedProjects = projects.filter(
        (project) => project.id !== clickedProjectId
      );
      setProjects(updatedProjects);
      setSelected(projects[0].id);
      setClickedProjectId(projects[0].id);
      // if (response.status === 204) {
      //   console.log("Project deleted successfully");
      // } else {
      //   console.error(
      //     "Failed to delete Project:",
      //     response.status,
      //     response.data
      //   );
      // }
    } catch (error) {
      console.error("Error deleting Project:", error);
    }
  };

  const showCreateProjectModal = () => {
    if (projects.length >= 3) {
      Swal.fire({
        icon: "error",
        title: "Project Limit Reached",
        html: "You have reached the project limit.<br>Only 3 projects per group are allowed.",
        confirmButtonColor: "#8A252C",
      });
    } else {
      Swal.fire({
        html: `
          <span style="font-size: 20px">Create a New Project</span>
          <br>
          <input type="text" id="input1" placeholder="Enter new project name" class="swal2-input" style="height: 35px; width: 86%; font-size: 16px; font-family: 'Calibri', sans-serif; display: flex;"/>
          <br>
          <textarea id="input2" placeholder="Enter project description" class="swal2-textarea" style="margin: 0 auto; width: 86%; height: 100px; resize: none; font-size: 16px; font-family: 'Calibri', sans-serif;"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Create",
        confirmButtonColor: "#9c7b16",
        cancelButtonText: "Cancel",
        cancelButtonColor: "rgb(181, 178, 178)",
        preConfirm: () => {
          // Retrieve values from input fields
          const input1Value = document.getElementById("input1").value;
          const input2Value = document.getElementById("input2").value;

          // Validate and process the values as needed
          if (!input1Value) {
            Swal.showValidationMessage("Project name cannot be empty");
          } else if (!input2Value) {
            Swal.showValidationMessage("Second input cannot be empty");
          } else if (projects.some((project) => project.name === input1Value)) {
            Swal.showValidationMessage(
              `Project with the name '${input1Value}' already exists. Please enter another project name.`
            );
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const newProjectName = document.getElementById("input1").value;
          const desc = document.getElementById("input2").value;
          addProject(newProjectName, desc);
          Swal.fire({
            title: "Project Created",
            icon: "success",
            confirmButtonColor: "#9c7b16",
          });
        }
      });
    }
  };

  const showDeleteProjectModal = () => {
    Swal.fire({
      icon: "warning",
      title:
        '<span style="font-size: 20px">Are you sure you want to delete?</span>',
      html: '<span style="font-size: 15px">This will delete this project permanently. You cannot undo this action.</span>',
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#8A252C",
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgb(181, 178, 178)",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject();
        Swal.fire({
          title:
            '<span style="font-size: 20px">Project Sucessfully Deleted</span>',
          icon: "success",
          confirmButtonColor: "#9c7b16",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div className={styles.body}>
      {isLoading ? (
        <div> </div>
      ) : (
        <ol className={styles.orList}>
          <li className={`${global.center} ${styles.customLi}`}>
            <div
              onClick={handleInactiveClick}
              className={`${styles.inactive} ${
                isInactiveClicked ? styles.clickedButton : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faDiagramProject}
                className={styles.dropdown}
                size="lg"
              />
              &nbsp; Inactive Projects {sidebarKey}
            </div>
          </li>

          <li className={`${global.center} ${styles.customLi}`}>
            <div onClick={handleNameIconClick} className={styles.nameIcon}>
              <FontAwesomeIcon
                icon={open ? faSquareCaretDown : faSquareCaretRight}
                className={styles.dropdown}
                size="xl"
              />{" "}
              &nbsp; Projects
            </div>
            {!staff && (
              <FontAwesomeIcon
                icon={faPlus}
                className={styles.plus}
                size="lg"
                onClick={showCreateProjectModal}
              />
            )}
          </li>
        </ol>
      )}

      {open && (
        <div style={{ marginTop: "-7%", paddingLeft: "20%" }}>
          <ul className={styles.ul}>
            {projects.map((project) => (
              <li
                className={`${styles.projectName} ${
                  clickedProjectId === project.id ? styles.clickedProject : ""
                }`}
                key={project.id}
                onClick={() => handleButtonClick(project.id)}
                onDoubleClick={() => handleProjectDoubleClick(project.id)}
              >
                <div className={styles.projectList}>
                  {editableProjectId === project.id ? (
                    <div>
                      <input
                        className={styles.inputProject}
                        type="text"
                        value={editedProjectName}
                        onChange={(e) => setEditedProjectName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleEditProjectName();
                          }
                        }}
                        onBlur={() => {
                          handleEditProjectName();
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {project.isActive ? (
                        <FontAwesomeIcon
                          icon={faCircle}
                          className={styles.greenBullet}
                          size="xs"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircle}
                          className={styles.defaultBullet}
                          size="xs"
                        />
                      )}
                      {project.name}
                    </div>
                  )}
                  {!staff && clickedProjectId === project.id && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.deleteIcon}
                      onClick={showDeleteProjectModal}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default S_SidebarSegment;
