import React from "react";
import styles from "./Sidebar.module.css";
import global from "../../assets/global.module.css";
import Logo from "@assets/Logo.png";
import A_SidebarSegment from "../SidebarSegment/A_SidebarSegment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const A_Sidebar = () => {
  const navigate = useNavigate();
  const { getUser, logout } = useAuth();

  const goHome = async () => {
    const user = await getUser();
    const userId = user.id;
    navigate(`/admin`);
  };

  const goLogout = async () => {
    await logout();
    navigate(`/login`);
  };

  return (
    <div className={styles.sidebar}>
      <img src={Logo} alt="Logo" className={styles.img} onClick={goHome} />

      <A_SidebarSegment />

      <ol className={styles.list}>
        <li className={`${global.center} ${styles.customLi}`}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="lg"
            className={styles.icon}
          />
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

export default A_Sidebar;
