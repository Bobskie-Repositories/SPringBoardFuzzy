import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquareCaretRight,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SidebarSegment.module.css";
import global from "../../assets/global.module.css";
import axios from "axios";

const A_SidebarSegment = ({ selected, setSelected }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedClassId, setClickedClassId] = useState(null);
  const [isMyTemplateClicked, setMyTemplateClicked] = useState(false);
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

  const goMyTemplate = () => {
    setMyTemplateClicked(!isMyTemplateClicked);
    setClickedClassId(null);
    navigate(`/admin`);
  };

  return (
    <div className={styles.body}>
      <ol className={styles.orList}>
        <li className={`${global.center} ${styles.customLi}`}>
          <div
            onClick={goMyTemplate}
            className={`${styles.nameIcon} ${
              isMyTemplateClicked ? styles.clickedButton : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faTableCellsLarge}
              className={styles.templates}
              size="xl"
            />
            My Template
          </div>
        </li>
      </ol>
    </div>
  );
};

export default A_SidebarSegment;
