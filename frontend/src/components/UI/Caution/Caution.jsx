import React from "react";
import styles from "./Caution.module.css";

const Caution = () => {
  return (
    <div className={styles.sa}>
      <div className={styles["sa-warning"]}>
        <div className={styles["sa-warning-body"]}></div>
        <div className={styles["sa-warning-dot"]}></div>
      </div>
    </div>
  );
};

export default Caution;
