import React from "react";
import { useNavigate } from "react-router";
import styles from "./ADashboard.module.css";
import Profile from "../../ProfileSegment/Profile";
import Search from "../../Search/Search";
import A_Sidebar from "../../Sidebar/A_Sidebar";
import TemplateList from "../../TemplateList/TemplateList";
import Button from "../../UI/Button/Button";
import ListInActiveProj from "../../Table/ListInActiveProj";

const ADashboard = ({ choose }) => {
  const navigate = useNavigate();

  const handleCreateTemplateClick = () => {
    navigate("add-template");
  };

  return (
    <div
      className={styles.container}
      style={{ padding: "20px 150px 0px 30px" }}
    >
      <A_Sidebar />

      <div>
        <div
          className={styles.container}
          style={{ gap: "150px", marginTop: "30px" }}
        >
          <Search />
          <Profile identification={1} />
        </div>

        <div>
          {choose === 0 ? (
            <div>
              <div className={styles.container}>
                <h2 style={{ fontSize: "30px", color: "#9c7b16" }}>
                  Templates
                </h2>
                <Button
                  className={styles.butName}
                  onClick={handleCreateTemplateClick}
                >
                  Create Template
                </Button>
              </div>
              <TemplateList />
            </div>
          ) : choose === 1 ? (
            <p>Else</p>
          ) : (
            <ListInActiveProj />
          )}
        </div>
      </div>
    </div>
  );
};

export default ADashboard;
