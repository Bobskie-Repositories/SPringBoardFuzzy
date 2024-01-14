import React, { useState, useEffect, useRef } from "react";
import prof from "../../assets/iconprof.png";
import profwhite from "@assets/iconprof2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Profile = ({ identification }) => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const { getUser, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setName(user.firstname + " " + user.lastname);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const goLogout = async () => {
    await logout();
    navigate(`/login`);
  };

  return (
    <div className={styles.center} style={{ height: "20px", gap: "20px" }}>
      <div className={styles.dropdown} ref={dropdownRef}>
        {identification === 1 ? (
          <>
            <p>{name}</p>
            <div
              className={`${styles.dropbtn} ${styles.img}`}
              style={{ marginLeft: "10px" }}
              onClick={handleDropdownClick}
            >
              <img src={prof} alt="prof" />
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styles.dropbtn} ${styles.img}`}
              style={{ marginRight: "10px" }}
              onClick={handleDropdownClick}
            >
              <img src={profwhite} alt="profwhite" />
            </div>
            <p style={{ color: "white" }}>{name}</p>
          </>
        )}

        {dropdownVisible && (
          <div className={styles.dropdowncontent}>
            <span onClick={goLogout}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="lg"
                className={styles.icon}
              />
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
