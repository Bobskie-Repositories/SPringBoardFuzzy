import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Card from "../UI/Card/Card";
import styles from "./ViewClassroom.module.css";
import global from "@assets/global.module.css";
import axios from "axios";

const ViewClassroom = ({ selected }) => {
  const [classroom, setClassroom] = useState(null);
  const [groups, setGroups] = useState(null);
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
  const [groupNameSortOrder, setGroupNameSortOrder] = useState(true); // true for ascending, false for descending
  const [projectNameSortOrder, setProjectNameSortOrder] = useState(true); // true for ascending, false for descending
  const [templateSortOrder, setTemplateSortOrder] = useState({}); // object to keep track of sort order for each template
  const { id } = useParams();

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/template/`)
      .then((response) => {
        setTemplates(response.data);
        // Initialize sort order for each template
        const initialSortOrder = {};
        response.data.forEach((template) => {
          initialSortOrder[template.id] = true;
        });
        setTemplateSortOrder(initialSortOrder);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selected !== null && selected !== undefined) {
      axios
        .get(`http://127.0.0.1:8000/api/classroom/${id}/class_group_proj`)
        .then((response) => {
          setClassroom(response.data.name);
          setGroups(response.data.groups);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selected, id]);

  const handleSort = () => {
    const sortedGroups = [...groups].sort((a, b) => {
      const aScore =
        a.projects.length > 0
          ? a.projects[0].project_boards.reduce(
              (total, board) => total + (board ? board.board_score : 0),
              0
            ) / templates.length
          : 0;
      const bScore =
        b.projects.length > 0
          ? b.projects[0].project_boards.reduce(
              (total, board) => total + (board ? board.board_score : 0),
              0
            ) / templates.length
          : 0;
      return sortOrder ? aScore - bScore : bScore - aScore;
    });
    setGroups(sortedGroups);
    setSortOrder(!sortOrder);
  };

  const handleGroupNameSort = () => {
    const sortedGroups = [...groups].sort((a, b) => {
      return groupNameSortOrder
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setGroups(sortedGroups);
    setGroupNameSortOrder(!groupNameSortOrder);
  };

  const handleProjectNameSort = () => {
    const sortedGroups = [...groups].sort((a, b) => {
      const aProjectName = a.projects.length > 0 ? a.projects[0].name : "";
      const bProjectName = b.projects.length > 0 ? b.projects[0].name : "";
      return projectNameSortOrder
        ? aProjectName.localeCompare(bProjectName)
        : bProjectName.localeCompare(aProjectName);
    });
    setGroups(sortedGroups);
    setProjectNameSortOrder(!projectNameSortOrder);
  };

  const handleTemplateSort = (templateId) => {
    const sortedGroups = [...groups].sort((a, b) => {
      const aBoard =
        a.projects.length > 0
          ? a.projects[0].project_boards.find(
              (board) => board.templateId === templateId
            )
          : null;
      const bBoard =
        b.projects.length > 0
          ? b.projects[0].project_boards.find(
              (board) => board.templateId === templateId
            )
          : null;
      const aScore = aBoard ? aBoard.board_score : 0;
      const bScore = bBoard ? bBoard.board_score : 0;
      return templateSortOrder[templateId] ? aScore - bScore : bScore - aScore;
    });
    setGroups(sortedGroups);
    setTemplateSortOrder({
      ...templateSortOrder,
      [templateId]: !templateSortOrder[templateId],
    });
  };

  if (!groups || !templates) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 style={{ fontSize: "30px", color: "#9c7b16" }}>{classroom}</h2>

      <Card className={styles.card}>
        <div
          className={global.brown}
          style={{
            borderRadius: "12px 12px 0 0",
            padding: "5px 30px",
            display: "inline-block",
          }}
        >
          <h3 style={{ color: "white" }}> List of Groups </h3>
        </div>

        <div
          className={styles.container}
          style={{
            borderBottom: "1px solid #9c7b16",
            color: "#BCBEC0",
            marginBottom: "10px",
            gridTemplateColumns: `repeat(${2 + templates.length}, 100px)`,
          }}
        >
          <span
            className={`${styles.centerText} ${styles.clickable}`}
            onClick={handleGroupNameSort}
          >
            Group Name {groupNameSortOrder ? "↓" : "↑"}
          </span>
          <span
            className={`${styles.centerText} ${styles.clickable}`}
            onClick={handleProjectNameSort}
          >
            Project {projectNameSortOrder ? "↓" : "↑"}
          </span>
          {templates.map((template, index) => (
            <span
              key={index}
              className={`${styles.centerText} ${styles.clickable}`}
              onClick={() => handleTemplateSort(template.id)}
            >
              {template.title} {templateSortOrder[template.id] ? "↓" : "↑"}
            </span>
          ))}
          <span
            className={`${styles.centerText} ${styles.clickable}`}
            onClick={handleSort}
          >
            Overall Rating {sortOrder ? "↓" : "↑"}
          </span>
        </div>

        {groups.map((group, index) => (
          <div
            className={styles.groupContainer}
            style={{
              gridTemplateRows: "2.5rem",
              gridTemplateColumns: `repeat(${2 + templates.length}, 100px)`,
            }}
            key={group.id}
          >
            <NavLink to={`group/${group.id}`}>
              <span className={styles.centerTextName}>{group.name}</span>
            </NavLink>
            <span className={styles.centerText}>
              {group.projects.length > 0
                ? group.projects[0].name
                : "No Project"}
            </span>
            {templates.map((template, index) => {
              const projectBoard =
                group.projects.length > 0
                  ? group.projects[0].project_boards.find(
                      (board) => board.templateId === template.id
                    )
                  : null;
              return (
                <span key={index} className={styles.centerText}>
                  {projectBoard
                    ? `${Math.round(projectBoard.board_score * 10)}%`
                    : "0%"}
                </span>
              );
            })}
            <span className={styles.centerTextOverallRating}>
              {group.projects.length > 0
                ? `${Math.round(
                    (group.projects[0].project_boards.reduce(
                      (total, board) => total + (board ? board.board_score : 0),
                      0
                    ) /
                      templates.length) *
                      10
                  )}%`
                : "0%"}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ViewClassroom;
