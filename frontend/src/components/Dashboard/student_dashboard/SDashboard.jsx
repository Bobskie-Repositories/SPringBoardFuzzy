import React from "react";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import S_Sidebar from "../../Sidebar/S_Sidebar";
import Search from "../../Search/Search";
import Profile from "../../ProfileSegment/Profile";
import ListProj from "../../Table/ListProj";
import SearchProject from "../../Search/SearchProject";
import ProjectContents from "../../ProjectContents/ProjectContents";
import styles from "./SDashboard.module.css";

const SDashboard = ({ choose }) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.state?.selectedProjectId);
  const [createAction, setCreateAction] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    sessionStorage.setItem("currentPath", currentPath);
    // const storedPath = sessionStorage.getItem("currentPath");
    // console.log(storedPath);
  }, [selected]);

  //its purpose is to give signal to sidebar and board that there is an update to the project and need to re-render
  const [projectUpdateKey, setProjectUpdateKey] = useState(0);

  const handleProjectUpdate = () => {
    // This function will be called when there are updates to projects in the Boards component
    // It increments the projectUpdateKey to force a re-render of S_Sidebar
    setProjectUpdateKey(projectUpdateKey + 1);
  };

  const handleCreateBoardClick = () => {
    setCreateAction(true);
  };

  return (
    <div
      className={styles.container}
      style={{ padding: "20px 150px 0px 30px" }}
    >
      <S_Sidebar
        projectUpdateKey={projectUpdateKey}
        onProjectUpdate={handleProjectUpdate}
        selected={selected}
        setSelected={setSelected}
        setCreateAction={setCreateAction}
      />

      <div>
        <div
          className={styles.container}
          style={{ gap: "150px", marginTop: "30px" }}
        >
          <Search />
          <Profile identification={1} />
        </div>

        {choose === 0 ? (
          <ProjectContents
            selected={selected}
            createAction={createAction}
            setCreateAction={setCreateAction}
            onProjectUpdate={handleProjectUpdate}
            projectUpdateKey={projectUpdateKey}
            handleCreateBoardClick={handleCreateBoardClick}
          />
        ) : choose == 1 ? (
          <ListProj />
        ) : (
          <div className={styles.container}>
            <SearchProject />
          </div>
        )}
      </div>
    </div>
  );
};

export default SDashboard;
