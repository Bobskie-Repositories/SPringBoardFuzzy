import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquareCaretRight,
  faDiagramProject,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SidebarSegment.module.css";
import global from "../../assets/global.module.css";
import axios from "axios";
import Swal from "sweetalert2";

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

  const showCreateProjectModal = () => {
    Swal.fire({
      html: `
          <span style="font-size: 20px">Create a New Classroom</span>
          <br>
          <input type="text" id="input1" placeholder="Enter Classroom Code" class="swal2-input" style="height: 35px; width: 86%; font-size: 16px; font-family: 'Calibri', sans-serif; display: flex;"/>
          <br>
          <input type="text" id="input2" placeholder="Enter new classroom name" class="swal2-input" style="height: 35px; width: 86%; font-size: 16px; font-family: 'Calibri', sans-serif; display: flex;"/>
          `,
      showCancelButton: true,
      confirmButtonText: "Create",
      confirmButtonColor: "#9c7b16",
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgb(181, 178, 178)",
      preConfirm: async () => {
        const input1Value = document.getElementById("input1").value;
        const input2Value = document.getElementById("input2").value;
        try {
          if (!input1Value) {
            throw new Error("Classroom code cannot be empty");
          } else if (!input2Value) {
            throw new Error("Classroom name cannot be empty");
          }

          const newProjId = await addClassroom(input1Value, input2Value);
          setSelected(newProjId);
          return true;
        } catch (error) {
          Swal.showValidationMessage(
            `Classroom with the name '${input1Value}' already exists. Please enter another project classroom.`
          );
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Classroom Created",
          icon: "success",
          confirmButtonColor: "#9c7b16",
        });
      }
    });
  };

  const addClassroom = async (newClassCode, newClassname) => {
    try {
      const user = await getUser();

      const response = await axios.post(
        `http://127.0.0.1:8000/api/classroom/create`,
        {
          class_code: newClassCode,
          class_name: newClassname,
          teacher_fk: user.id,
        }
      );

      const newClassId = response.data.id;
      const newClassResponse = await axios.get(
        `http://127.0.0.1:8000/api/classroom/${newClassId}`
      );
      const newClassData = newClassResponse.data;

      setClassrooms([...classrooms, newClassData]);
      return newClassId;
    } catch (error) {
      throw error;
    }
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
          <FontAwesomeIcon
            icon={faPlus}
            className={styles.plus}
            size="lg"
            onClick={showCreateProjectModal}
          />
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
