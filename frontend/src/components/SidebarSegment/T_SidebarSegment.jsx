import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquareCaretRight,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SidebarSegment.module.css";
import global from "../../assets/global.module.css";
import axios from "axios";

const T_SidebarSegment = ({ selected, setSelected }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedClassId, setClickedClassId] = useState(null);
  const [isInactiveClicked, setisInactiveClicked] = useState(false);
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();

        const response = await axios.get(
          `http://127.0.0.1:8000/api/classroom/${user.id}/all`
        );
        setUserId(user.id);
        setClassrooms(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleButtonClick = (classId) => {
    setSelected(classId);
    setClickedClassId(classId);
    navigate(`/classroom/${classId}`);
  };

  const handleNameIconClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setOpen(!open);
  };
  const handleInactiveClick = (e) => {
    setisInactiveClicked(!isInactiveClicked);
    setClickedClassId(null);
    navigate("/inactive");
  };
  return (
    <div className={styles.body}>
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
            &nbsp; Inactive Projects
          </div>
        </li>
        <li className={`${global.center} ${styles.customLi}`}>
          <div onClick={handleNameIconClick} className={styles.nameIcon}>
            <FontAwesomeIcon
              icon={open ? faSquareCaretDown : faSquareCaretRight}
              className={styles.dropdown}
              size="xl"
            />{" "}
            &nbsp; Class
          </div>
        </li>
      </ol>

      {open && (
        <div style={{ marginTop: "-7%", paddingLeft: "20%" }}>
          <ul>
            {classrooms.map((classroom) => (
              <li
                key={classroom.id}
                className={`${styles.projectName} ${
                  clickedClassId === classroom.id ? styles.clickedProject : ""
                }`}
                onClick={() => handleButtonClick(classroom.id)}
              >
                {classroom.class_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default T_SidebarSegment;
