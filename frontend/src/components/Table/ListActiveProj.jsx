import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../UI/Card/Card";
import config from "../../config";
import styles from "./Table.module.css";
import global from "@assets/global.module.css";

const ListActiveProj = (props) => {
  const [groups, setGroups] = useState(null);
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
  const [groupNameSortOrder, setGroupNameSortOrder] = useState(true); // true for ascending, false for descending
  const [projectNameSortOrder, setProjectNameSortOrder] = useState(true); // true for ascending, false for descending
  const [templates, setTemplates] = useState([]);
  const [templateSortOrder, setTemplateSortOrder] = useState({}); // object to keep track of sort order for each template
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 10;
  const navigate = useNavigate();
  const { API_HOST } = config;

  useEffect(() => {
    if (!props.groups && !props.templates) {
      axios
        .get(`${API_HOST}/api/group/group_proj`)
        .then((response) => {
          //filter out groups with no project
          const filteredGroups = response.data.filter(
            (group) => group.projects.length > 0
          );
          setGroups(filteredGroups);
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
    } else {
      setGroups(props.groups);
      setTemplates(props.templates);
    }

    const initialSortOrder = {};
    templates.forEach((template) => {
      initialSortOrder[template.id] = true;
    });
    setTemplateSortOrder(initialSortOrder);
  }, [props]);

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

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPageCount = Math.ceil(groups.length / groupsPerPage);
  const startIndex = (currentPage - 1) * groupsPerPage;
  const endIndex = startIndex + groupsPerPage;

  // Get the groups for the current page
  const groupsToDisplay = groups.slice(startIndex, endIndex);

  const onClickNavigation = (id) => {
    if (props.public) {
      navigate(`/search-project/${id}`);
    } else {
      navigate(`group/${id}`);
    }
  };

  return (
    <>
      <Card className={styles.card}>
        <div
          className={global.brown}
          style={{ borderRadius: "12px 12px 0 0", padding: "2px 30px" }}
        >
          <p className={styles.header}> List of Groups </p>
        </div>
        <div className={styles.xScroll}>
          <div
            className={`${styles.container} ${styles.clickable}`}
            style={{
              borderBottom: "1px solid #9c7b16",
              color: "#BCBEC0",
              marginBottom: "10px",
              gridTemplateColumns: `repeat(2, 13rem) repeat(${templates.length}, 11rem) 11rem`,
            }}
          >
            <span
              className={`${styles.centerText}`}
              onClick={handleGroupNameSort}
            >
              Group Name
            </span>
            <span
              className={`${styles.centerText}`}
              onClick={handleProjectNameSort}
            >
              Project
            </span>
            {templates.map((template, index) => (
              <span
                key={index}
                className={`${styles.centerText}`}
                onClick={() => handleTemplateSort(template.id)}
              >
                {template.title}
              </span>
            ))}
            <span className={`${styles.centerText}`} onClick={handleSort}>
              Overall Rating
            </span>
          </div>
          <div className={styles.yScroll}>
            {groupsToDisplay.map((group, index) => (
              <div
                className={styles.groupContainer}
                style={{
                  gridTemplateRows: "2.5rem",
                  gridTemplateColumns: `repeat(2, 13rem) repeat(${templates.length}, 11rem) 11rem`,
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                }}
                key={group.id}
              >
                <span
                  className={
                    !props.public ? styles.centerTextName : styles.centerText
                  }
                  onClick={() =>
                    !props.public ? onClickNavigation(group.id) : null
                  }
                >
                  {group.name}
                </span>

                {group.projects.length > 0 ? (
                  <span
                    className={
                      props.public ? styles.centerTextName : styles.centerText
                    }
                    onClick={() =>
                      props.public
                        ? onClickNavigation(group.projects[0].id)
                        : null
                    }
                  >
                    {group.projects[0].name}
                  </span>
                ) : (
                  <span className={styles.centerText}>No Project </span>
                )}

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
                <span className={styles.centerText} style={{ color: "red" }}>
                  {group.projects.length > 0
                    ? `${Math.round(
                        (group.projects[0].project_boards.reduce(
                          (total, board) =>
                            total + (board ? board.board_score : 0),
                          0
                        ) /
                          templates.length) *
                          10
                      )}%`
                    : "0%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className={styles.pagination}>
        <span
          onClick={handlePreviousPage}
          className={currentPage === 1 ? styles.disabled : ""}
        >
          &lt;&lt;
        </span>
        <span>&nbsp; {currentPage} &nbsp; </span>
        <span
          onClick={handleNextPage}
          className={currentPage === totalPageCount ? styles.disabled : ""}
        >
          &gt;&gt;
        </span>
      </div>
    </>
  );
};

export default ListActiveProj;
