import React from "react";
import styles from "./Header.module.css";
import Web_Logo from "@assets/web_logo.png";
import Profile from "../ProfileSegment/Profile";
import { useNavigate } from "react-router";

const Header_GrpCreation = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.header_landing}`}>
      <div className={styles.left}>
        <img src={Web_Logo} alt="Logo" className={styles.img_landing} />
      </div>

      <div className={styles.right_landing}>
        <Profile identification={1} />
      </div>
    </div>
  );
};

export default Header_GrpCreation;
