import React from "react";
import Logo from "@assets/Logo.png";
import { Link } from "react-router-dom";
import styles from "./NavVar.module.css";

function NavigationBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" className={styles.img} />
      </div>
      <div className={styles.lists}>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
        <Link to="/signup" className={styles.link}>
          Sign Up
        </Link>
        <Link to="/about" className={styles.link}>
          About
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
