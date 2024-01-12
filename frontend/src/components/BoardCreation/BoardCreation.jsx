import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "../UI/Card/Card";
import styles from "./BoardCreation.module.css";
import global from "@assets/global.module.css";

const BoardCreation = ({
  selected,
  setCreateAction,
  boardTemplateIds,
  allTemplate,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    setCreateAction(false);
  };

  const handleClick = (templateid) => {
    navigate(`/project/${selected}/create-board/${templateid}/rules`);
  };

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={goBack}
        className={styles.back}
      />

      <div className={styles.containersub}>
        <h2 className={`${global.brownText} ${styles.textMargin}`}>
          Create Board
        </h2>
        <h5 className={styles.textMargin}>
          Great! Let's get started on creating your new board.
        </h5>

        <Card className={styles.container_card}>
          <h5>
            Choose a template from the following predefined selection that best
            fits your idea:
          </h5>

          <div className={styles.scrollable}>
            {allTemplate.map((template, index) => (
              <Card
                key={index}
                className={`${styles.container_board} ${
                  boardTemplateIds.has(template.id) ? styles.unavailable : ""
                }`}
                onClick={() => {
                  boardTemplateIds.has(template.id)
                    ? ""
                    : handleClick(template.id);
                }}
              >
                <div className={styles.words}>
                  <h4>{template.title}</h4>
                  <p>
                    {template.description.length > 150
                      ? template.description
                          .substr(0, 150)
                          .split(" ")
                          .slice(0, -1)
                          .join(" ") + "..."
                      : template.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BoardCreation;
