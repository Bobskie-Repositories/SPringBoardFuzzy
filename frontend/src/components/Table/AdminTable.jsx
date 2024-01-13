import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../UI/Card/Card";
import config from "../../config";
import styles from "./Table.module.css";
import global from "@assets/global.module.css";

const AdminTable = (props) => {
  const [groups, setGroups] = useState(null);
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
  const [groupNameSortOrder, setGroupNameSortOrder] = useState(true); // true for ascending, false for descending
  const [projectNameSortOrder, setProjectNameSortOrder] = useState(true); // true for ascending, false for descending
  const [dateSort, setDateSort] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [templateSortOrder, setTemplateSortOrder] = useState({}); // object to keep track of sort order for each template
  const [currentPage, setCurrentPage] = useState(() => {
    // Use a function to initialize the state with the value from localStorage
    const savedPage = localStorage.getItem("activeProjPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const groupsPerPage = 10;
  const navigate = useNavigate();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/group/group_proj`);
        console.log(props.filter);

        const filteredAndClassroomGroups =
          props.filter.length > 0
            ? response.data.filter((group) =>
                props.filter.includes(group.classroom_id)
              )
            : response.data;

        const filteredGroups = filteredAndClassroomGroups.filter((group) =>
          group.projects.length > 0
            ? group.projects[0].isActive === props.isActive
            : false
        );

        setGroups(filteredGroups);

        const templateResponse = await axios.get(`${API_HOST}/api/template/`);
        setTemplates(templateResponse.data);

        const initialSortOrder = {};
        templateResponse.data.forEach((template) => {
          initialSortOrder[template.id] = true;
        });
        setTemplateSortOrder(initialSortOrder);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props]);

  useEffect(() => {
    // Save the current page to localStorage whenever it changes
    localStorage.setItem("activeProjPage", currentPage.toString());
  }, [currentPage]);

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

  const handleTimeSort = () => {
    const sortedGroups = [...groups].sort((a, b) => {
      const aTime =
        a.projects.length > 0 ? new Date(a.projects[0].created_at) : null;
      const bTime =
        b.projects.length > 0 ? new Date(b.projects[0].created_at) : null;

      if (aTime && bTime) {
        return dateSort ? aTime - bTime : bTime - aTime;
      } else if (aTime) {
        return dateSort ? -1 : 1; // aTime comes before bTime
      } else if (bTime) {
        return dateSort ? 1 : -1; // bTime comes before aTime
      } else {
        return 0; // Both aTime and bTime are null
      }
    });
    setGroups(sortedGroups);
    setDateSort(!dateSort);
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

  const time = (timestamp) => {
    const dateObject = new Date(timestamp);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = dateObject.getFullYear();
    const month = monthNames[dateObject.getMonth()]; // Use the array to get the month name
    const day = dateObject.getDate().toString().padStart(2, "0");
    const dateOnlyString = `${month} ${day}, ${year}`;
    return dateOnlyString;
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
          <p className={styles.header}> All Projects </p>
        </div>
        <div className={styles.xScroll}>
          <div
            className={`${styles.adminContainer} ${styles.clickable}`}
            style={{
              borderBottom: "1px solid #9c7b16",
              color: "#BCBEC0",
              marginBottom: "10px",
              gridTemplateColumns: `repeat(${4}, 11rem) repeat(${
                templates.length
              }, 11rem) 11rem`,
            }}
          >
            <span className={styles.centerText}>Classroom</span>

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
            <span className={`${styles.centerText} `} onClick={handleSort}>
              Overall Rating
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

            <span
              className={`${styles.centerText} ${styles.clickable}`}
              onClick={handleTimeSort}
            >
              Date Created
            </span>
          </div>
          <div className={styles.yScroll}>
            {groupsToDisplay.map((group, index) => (
              <div
                className={`${styles.adminContainer} ${styles.conHover}`}
                style={{
                  gridTemplateColumns: `repeat(${4}, 11rem) repeat(${
                    templates.length
                  }, 11rem) 11rem`,
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                }}
                key={group.id + index}
              >
                <span className={styles.centerText}>{group.class_name}</span>

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
                    // onClick={() => onClickNavigation(group.projects[0].id)}
                  >
                    {group.projects[0].name}
                  </span>
                ) : (
                  <span className={styles.centerText}>No Project </span>
                )}

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

                <span className={styles.centerText}>
                  {group.projects.length > 0 ? (
                    time(group.projects[0].created_at)
                  ) : (
                    <span>---</span>
                  )}
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

export default AdminTable;
