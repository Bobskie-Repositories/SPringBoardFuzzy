import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import global from "../../assets/global.module.css";
import Logo from "@assets/Logo.png";
import GroupIcon from "@assets/groupicon.png";
import S_SidebarSegment from "../SidebarSegment/S_SidebarSegment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const S_Sidebar = ({ setSelected }) => {
  const navigate = useNavigate();
  const [group, setGroup] = useState();
  const { getUser, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      // console.log(user)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/group/${user.group_fk}`
        );
        setGroup(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const goHome = async () => {
    const user = await getUser();
    const groupId = user.group_fk;
    navigate(`/group/${groupId}`);
  };

  const goLogout = async () => {
    await logout();
    navigate(`/login`);
  };

  return (
    <div className={styles.sidebar}>
      <img src={Logo} alt="Logo" className={styles.img} onClick={goHome} />
      <div className={styles.subbody}>
        <h4 className={styles.grouptext}>Your Group</h4>
        <button className={styles.groupbutton}>
          <div style={{ minWidth: "150px" }}>
            <img className={styles.groupicon} src={GroupIcon} alt="GroupIcon" />
            <h3>{group}</h3>
            <h4>ABC-QWE-123</h4>
          </div>
        </button>
      </div>

      <S_SidebarSegment setSelected={setSelected} />

      <ol className={styles.list}>
        <li className={`${global.center} ${styles.customLi}`}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="lg"
            className={styles.icon}
          />{" "}
          &nbsp; Support
        </li>
        <li className={`${global.center} ${styles.customLi}`}>
          <FontAwesomeIcon icon={faGear} size="lg" className={styles.icon} />{" "}
          &nbsp; Settings
        </li>
        <li
          className={`${global.center} ${styles.customLi}`}
          onClick={goLogout}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="lg"
            className={styles.icon}
          />{" "}
          &nbsp; Log out
        </li>
      </ol>
    </div>
  );
};

export default S_Sidebar;
