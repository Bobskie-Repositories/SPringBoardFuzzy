import React from "react";
import { useState } from "react";
import S_Sidebar from "../../Sidebar/S_Sidebar";
import Search from "../../Search/Search";
import Boards from "../../Boards/Board";
import Profile from "../../ProfileSegment/Profile";
import BoardCreation from "../../BoardCreation/BoardCreation";
import ListInActiveProj from "../../Table/ListInActiveProj";
import Button from "../../UI/Button/Button";
import styles from "./SDashboard.module.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router";

const SDashboard = ({ choose }) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.state?.selectedProjectId);
  const [createAction, setCreateAction] = useState(false);
  const [boardCount, setBoardCount] = useState(0);
  const [boardTemplateIds, setBoardTemplateIds] = useState([]);
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
        selected={selected}
        setSelected={setSelected}
        setCreateAction={setCreateAction}
      />

      <div>
        <div
          className={styles.container}
          style={{ gap: "150px", marginTop: "30px" }}
        >
          <Search setSelected={setSelected} />
          <Profile identification={1} />
        </div>

        {choose === 0 ? (
          <div className={styles.container}>
            {createAction ? (
              <BoardCreation
                selected={selected}
                setCreateAction={setCreateAction}
                boardTemplateIds={boardTemplateIds}
              />
            ) : (
              <Boards
                selected={selected}
                setBoardCount={setBoardCount}
                onProjectUpdate={handleProjectUpdate}
                setBoardTemplateIds={setBoardTemplateIds}
              />
            )}

            <Button
              className={styles.butName}
              onClick={handleCreateBoardClick}
              disabled={selected === undefined || selected === null}
            >
              Create Board
            </Button>
          </div>
        ) : (
          <ListInActiveProj />
        )}
      </div>
    </div>
  );
};

export default SDashboard;
