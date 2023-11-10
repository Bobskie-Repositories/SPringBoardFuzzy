import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "../UI/Card/Card";
import IdeaIcon from "@assets/idea.png";
import styles from "./BoardCreation.module.css";
import global from "@assets/global.module.css";
import axios from "axios";
import Loading from "../UI/Loading/Loading";

const BoardCreation = ({ selected, setCreateAction, boardTemplateIds }) => {
  const [allTemplate, setAllTemplate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/template/`);
        // const templatesWithTeacher = await Promise.all(
        //   response.data.map(async (template) => {
        //     const teacherResponse = await axios.get(
        //       `http://127.0.0.1:8000/api/teacher/${template.teacher_fk}`
        //     );
        //     const templateWithTeacher = {
        //       ...template,
        //       teacher: teacherResponse.data,
        //     };
        //     return templateWithTeacher;
        //   })
        // );
        setAllTemplate(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const goBack = () => {
    setCreateAction(false);
  };

  const handleClick = (templateid) => {
    navigate(`/project/${selected}/create-board/${templateid}/rules`);
  };

  if (!allTemplate) {
    return <Loading />;
  }

  return (
    <div
      className={styles.container}
      style={{ padding: "20px 150px 0px 30px" }}
    >
      <div>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
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
                  Choose a template from the following predefined selection that
                  best fits your idea:
                </h5>

                <div className={styles.scrollable}>
                  {allTemplate.map((template, index) => (
                    <Card
                      key={index}
                      className={`${styles.container_board} ${
                        boardTemplateIds.has(template.id)
                          ? styles.unavailable
                          : ""
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
                        {/* <div className={styles.date}>
                          <p>
                            Created By: {template.teacher.firstname}{" "}
                            {template.teacher.lastname}
                          </p>
                        </div> */}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCreation;
