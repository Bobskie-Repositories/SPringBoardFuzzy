import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./ADashboard.module.css";
import Profile from "../../ProfileSegment/Profile";
import Search from "../../Search/Search";
import A_Sidebar from "../../Sidebar/A_Sidebar";
import TemplateList from "../../TemplateList/TemplateList";
import Button from "../../UI/Button/Button";
import ListActiveProj from "../../Table/ListActiveProj";
import ListInActiveProj from "../../Table/ListInActiveProj";
import ViewProject from "../../ViewProject/ViewProject";
import SearchProject from "../../Search/SearchProject";
import axios from "axios";
import config from "../../../config";

const ADashboard = ({ choose }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [selectedProj, setSelectedProj] = useState();
  const [groups, setGroups] = useState(null);
  const [templates, setTemplates] = useState([]);
  const { API_HOST } = config;

  useEffect(() => {
    axios
      .get(`${API_HOST}/api/group/group_proj`)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${API_HOST}/api/template/`)
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCreateTemplateClick = () => {
    navigate("add-template");
  };

  return (
    <div
      className={styles.container}
      style={{ padding: "20px 150px 0px 30px" }}
    >
      <A_Sidebar
        setSelected={setSelected}
        choose={choose}
        setSelectedProj={setSelectedProj}
      />

      <div>
        <div
          className={styles.container}
          style={{ gap: "150px", marginTop: "30px" }}
        >
          <Search alternateAPI={1} />
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
            <div style={{ marginTop: "30px" }}>
              <ListActiveProj groups={groups} templates={templates} />
            </div>
          ) : choose === 2 ? (
            <ListInActiveProj />
          ) : choose === 3 ? (
            <ViewProject selected={selectedProj} />
          ) : (
            <div className={styles.container}>
              <SearchProject />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ADashboard;
