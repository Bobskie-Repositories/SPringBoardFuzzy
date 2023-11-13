import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./SidebarSegment.module.css";
import global from "../../assets/global.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSquareCaretDown,
  faTrash,
  faSquareCaretRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

const CustomSidebarSegement = ({ selected, setSelected }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const [editableProjectId, setEditableProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [userGroupId, setUserGroupId] = useState("");
  const [staff, setStaff] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { groupid } = useParams();
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setStaff(user.is_staff);
      setUserGroupId(user.group_fk);
      setIsLoading(false);
      axios
        .get(`http://127.0.0.1:8000/api/group/${groupid}/projects`)
        .then((response) => {
          setProjects(response.data);
          if (response.data.length > 0) {
            setSelected(response.data[0].id);
            setClickedProjectId(response.data[0].id);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [setSelected, getUser]);

  const handleButtonClick = (projectId) => {
    setSelected(projectId);
    setClickedProjectId(projectId);
  };

  const handleNameIconClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className={styles.body}>
      {isLoading ? (
        <div> </div>
      ) : (
        <ol className={styles.orList}>
          <li className={`${global.center} ${styles.customLi}`}>
            <div onClick={handleNameIconClick} className={styles.nameIcon}>
              <FontAwesomeIcon
                icon={open ? faSquareCaretDown : faSquareCaretRight}
                className={styles.dropdown}
                size="xl"
              />{" "}
                Projects
            </div>
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
              >
                <div className={styles.projectList}>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSidebarSegement;
