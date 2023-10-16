import React from "react";
import styles from "./Board.module.css";
import Card from "../UI/Card/Card";
import IdeaIcon from "@assets/idea.png";
import Button from "../UI/Button/Button";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CircularProgressWithLabel from "../UI/ProgressBar/CircularProgressWithLabel";

function Board({ selected, setBoardCount }) {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [project, setProject] = useState();

  useEffect(() => {
    if (selected !== null && selected !== undefined) {
      fetch("http://127.0.0.1:8000/api/project/" + selected + "/projectboards")
        .then((response) => response.json())
        .then((boards) => {
          setBoards(boards);
          const boardCount = boards.length;
          setBoardCount(boardCount);
        });

      fetch("http://127.0.0.1:8000/api/project/" + selected)
        .then((response) => response.json())
        .then((project) => {
          setProject(project);
        });
    }
  }, [selected]);

  const onClickView = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div>
      {project ? (
        <>
          <h2 className={styles.head}>{project.name} Boards</h2>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <div className={styles.scrollable}>
        {boards.length === 0 && (
          <p className={styles.centeredText}>
            It looks like you haven't created any boards yet. <br /> Click on
            the "Create Board" button to get started and create your first
            board.
          </p>
        )}
        {boards.map((board) => {
          return (
            <div key={board.id}>
              <Card className={styles.card}>
                <div className={styles.container}>
                  <div className={styles.subcontainer}>
                    <img
                      className={styles.ideaicon}
                      src={IdeaIcon}
                      alt="IdeaIcon"
                    />
                  </div>

                  <div>
                    <h3>Board: {board.title}</h3>
                    <>
                      <div className={styles.cards}>
                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Novelty</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.novelty * 10}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratings}>Capability</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.capability * 10}
                            />
                          </div>
                        </Card>

                        <Card className={styles.smallCard}>
                          <h5 className={styles.ratingstech}>
                            Technical Feasibility
                          </h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel
                              value={board.technical_feasibility * 10}
                            />
                          </div>
                        </Card>
                      </div>
                      <Button
                        className={styles.viewbutton}
                        onClick={() => onClickView(board.id)}
                      >
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
