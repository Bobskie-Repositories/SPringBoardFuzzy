import React from "react";
import styles from "./Board.module.css";
import Card from "../UI/Card/Card";
import IdeaIcon from "@assets/idea.png";
import Button from "../UI/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgressWithLabel from "../UI/ProgressBar/CircularProgressWithLabel";
import Loading from "../UI/Loading/Loading";
import ModalCustom from "../UI/Modal/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import Caution from "../UI/Caution/Caution";
import config from "../../config";

function Board({
  selected,
  project,
  setBoardCount,
  onProjectUpdate,
  setBoardTemplateIds,
  projectUpdateKey,
  handleCreateBoardClick,
  user,
}) {
  const navigate = useNavigate();
  const [loadCount, setLoadCount] = useState(0);
  const [boards, setBoards] = useState([]);
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadCount((prevLoadCount) => prevLoadCount + 1);
        if (selected !== null && selected !== undefined) {
          const boardsResponse = await axios.get(
            `${API_HOST}/api/project/${selected}/projectboards`
          );
          const boards = boardsResponse.data;

          // Set the templateIds
          // this checks what templates are already accomplished and pass it to BoardCreation
          if (setBoardTemplateIds) {
            const templateIds = new Set(boards.map((board) => board.templateId));
            setBoardTemplateIds(templateIds);
          }
          const sortedBoards = [...boards].sort((a, b) => a.templateId - b.templateId);
          setBoards(sortedBoards);

          //checks if there is setBoardCount that was passed
          if (typeof setBoardCount === "function") {
            const boardCount = boards.length;
            setBoardCount(boardCount);
          }
        }
      } catch (error) {
        console.error("Error fetching data:" + error, error);
      }
    };
    fetchData();
  }, [selected, setBoardCount, projectUpdateKey]);

  const onClickView = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className={styles.board}>
      {loadCount === 0 && <Loading />}
      <div className={styles.scrollable}>
        {project && boards.length === 0 && !user.is_staff && user.group_fk === project.group_fk && (
          <p className={styles.centeredText} style={{ width: "45rem" }}>
            It looks like you haven't created any boards yet. <br /> Click on the "Create Board"
            button to get started and create your first board.
          </p>
        )}
        {project &&
          boards.length === 0 &&
          (user.is_staff || user.group_fk !== project.group_fk) && (
            <p className={styles.centeredText} style={{ width: "45rem" }}>
              It looks like the group haven't created any boards yet. <br />
            </p>
          )}
        {boards.map((board) => {
          return (
            <div key={board.id}>
              <Card className={styles.card}>
                <div className={styles.container}>
                  <div className={styles.subcontainer}>
                    <img className={styles.ideaicon} src={IdeaIcon} alt="IdeaIcon" />
                  </div>

                  <div>
                    <h3>Board: {board.title}</h3>
                    <>
                      <div className={styles.cards}>
                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Desirability</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.desirability >= 0 ? board.desirability : 0}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Feasibility</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.feasibility >= 0 ? board.feasibility : 0}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Viability</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.viability >= 0 ? board.viability : 0}
                            />
                          </div>
                        </Card>
                      </div>
                      <Button className={styles.viewbutton} onClick={() => onClickView(board.id)}>
                        View Board
                      </Button>
                    </>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
