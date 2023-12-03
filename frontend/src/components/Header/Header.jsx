import React from "react";
import styles from "./Header.module.css";
import global from "@assets/global.module.css";
import Logo from "@assets/LogoWhite.png";
import Notif from "@assets/notification.png";
import Profile from "../ProfileSegment/Profile";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { getUser } = useAuth();

  const goHome = async () => {
    const user = await getUser();
    if (user.is_staff) {
      navigate(`/admin`);
    } else {
      navigate(`/group/${user.group_fk}`);
    }
  };

  return (
    <div className={`${global.brown} ${styles.header}`}>
      <div className={styles.left} onClick={goHome}>
        <img src={Logo} alt="Logo" className={styles.img} />
        <h4 style={{ color: "white" }}>SPringBoard</h4>
      </div>

      <div className={styles.right}>
        {/* <img src={Notif} alt="Notif" className={styles.notif} /> */}
        <Profile identification={0} />
      </div>
    </div>
  );
};

export default Header;
