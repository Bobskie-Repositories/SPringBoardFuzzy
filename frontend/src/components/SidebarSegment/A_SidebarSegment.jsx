import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faDiagramProject,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SidebarSegment.module.css";
import global from "../../assets/global.module.css";

const A_SidebarSegment = () => {
  const [clickedSection, setClickedSection] = useState(null);
  const navigate = useNavigate();

  const goMyTemplate = () => {
    setClickedSection(1);
    navigate(`/admin`);
  };

  const goListActiveProj = () => {
    setClickedSection(2);
    navigate(`/admin/active`);
  };
  const goListInActiveProj = () => {
    setClickedSection(3);
    navigate(`/inactive`);
  };

  return (
    <div className={styles.body}>
      <ol className={styles.orList}>
        <li className={`${global.center} ${styles.customLi}`}>
          <div
            onClick={goMyTemplate}
            className={`${styles.nameIcon} ${
              clickedSection === 1 ? styles.clickedButton : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faTableCellsLarge}
              className={styles.templates}
              size="xl"
            />
            Templates
          </div>
        </li>
        <li className={`${global.center} ${styles.customLi}`}>
          <div
            onClick={goListActiveProj}
            className={`${styles.nameIcon} ${
              clickedSection === 2 ? styles.clickedButton : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faRankingStar}
              className={styles.templates}
              size="xl"
            />
            Active Project
          </div>
        </li>
        <li className={`${global.center} ${styles.customLi}`}>
          <div
            onClick={goListInActiveProj}
            className={`${styles.nameIcon} ${
              clickedSection === 3 ? styles.clickedButton : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faDiagramProject}
              className={styles.templates}
              size="xl"
            />
            Inactive Project
          </div>
        </li>
      </ol>
    </div>
  );
};

export default A_SidebarSegment;
