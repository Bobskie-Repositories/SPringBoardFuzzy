import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import SortButton from '../UI/SortButton/SortButton';
import axios from 'axios';
import Card from '../UI/Card/Card';
import config from '../../config';
import styles from './Table.module.css';
import global from '@assets/global.module.css';

const AdminTable = (props) => {
  const [groups, setGroups] = useState(null);
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
  const [classSortOrder, setClassSortOrder] = useState(true); // true for ascending, false for descending
  const [groupNameSortOrder, setGroupNameSortOrder] = useState(true); // true for ascending, false for descending
  const [projectNameSortOrder, setProjectNameSortOrder] = useState(true); // true for ascending, false for descending
  const [dateSort, setDateSort] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [templateSortOrder, setTemplateSortOrder] = useState({}); // object to keep track of sort order for each template
  const [templateSort, setTemplateSort] = useState(true);
  const [sharedState, setSharedState] = useState(true);
  const [currentPage, setCurrentPage] = useState(() => {
    // Use a function to initialize the state with the value from localStorage
    const savedPage = localStorage.getItem('activeProjPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const groupsPerPage = 15;
  const navigate = useNavigate();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`${API_HOST}/api/group/group_proj`);
        const filteredAndClassroomGroups =
          props.filter.length > 0
            ? props.allProjects.filter((group) => props.filter.includes(group.classroom_id))
            : props.allProjects;

        const filteredGroups = filteredAndClassroomGroups.filter((group) => {
          if (group.projects.length > 0) {
            return group.projects[0].isActive === props.isActive;
          } else {
            return !props.isActive;
          }
        });

        setGroups(filteredGroups);

        const filteredGroupsByDate =
          props.dateRange.length > 0
            ? filteredGroups.filter((group) => {
                const createdAt =
                  group.projects.length > 0 ? new Date(group.projects[0].created_at) : null;
                return (
                  createdAt && createdAt >= props.dateRange[0] && createdAt <= props.dateRange[1]
                );
              })
            : filteredGroups;

        setGroups(filteredGroupsByDate);

        const templateResponse = await axios.get(`${API_HOST}/api/template/`);
        setTemplates(templateResponse.data);

        const initialSortOrder = {};
        templateResponse.data.forEach((template) => {
          initialSortOrder[template.id] = true;
        });
        setTemplateSortOrder(initialSortOrder);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props]);

  useEffect(() => {
    // Save the current page to localStorage whenever it changes
    localStorage.setItem('activeProjPage', currentPage.toString());
  }, [currentPage]);

  const activate = (state) => {
    setClassSortOrder(state === 0 ? classSortOrder : true);
    setGroupNameSortOrder(state === 1 ? groupNameSortOrder : true);
    setProjectNameSortOrder(state === 2 ? projectNameSortOrder : true);
    setSortOrder(state === 3 ? sortOrder : true);
    setDateSort(state === 4 ? dateSort : true);
    setTemplateSort(state > 4 ? templateSort : true);
  };

  console.log(templateSort);

  const handleClassSort = () => {
    setSharedState(0);
    activate(0);
    const sortedGroups = [...groups].sort((a, b) => {
      return !classSortOrder ? a.classroom_id - b.classroom_id : b.classroom_id - a.classroom_id;
    });
    setGroups(sortedGroups);
    setClassSortOrder(!classSortOrder);
  };

  const handleGroupNameSort = () => {
    setSharedState(1);
    activate(1);
    const sortedGroups = [...groups].sort((a, b) => {
      return !groupNameSortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setGroups(sortedGroups);
    setGroupNameSortOrder(!groupNameSortOrder);
  };

  const handleProjectNameSort = () => {
    setSharedState(2);
    activate(2);
    const sortedGroups = [...groups].sort((a, b) => {
      const aProjectName = a.projects.length > 0 ? a.projects[0].name : '';
      const bProjectName = b.projects.length > 0 ? b.projects[0].name : '';

      if (a.projects.length === 0 && b.projects.length === 0) {
        return 0;
      } else if (a.projects.length === 0) {
        return 1;
      } else if (b.projects.length === 0) {
        return -1;
      }

      return !projectNameSortOrder
        ? aProjectName.localeCompare(bProjectName)
        : bProjectName.localeCompare(aProjectName);
    });

    setGroups(sortedGroups);
    setProjectNameSortOrder(!projectNameSortOrder);
  };

  const handleSort = () => {
    setSharedState(3);
    activate(3);
    const sortedGroups = [...groups].sort((a, b) => {
      const aScore = a.projects.length > 0 ? a.projects[0].project_score / templates.length : 0;
      const bScore = b.projects.length > 0 ? b.projects[0].project_score / templates.length : 0;
      return !sortOrder ? aScore - bScore : bScore - aScore;
    });
    setGroups(sortedGroups);
    setSortOrder(!sortOrder);
  };

  const handleTemplateSort = (templateId) => {
    setSharedState(templateId + 4);
    activate(templateId + 4);
    if (templateId != sharedState - 4) {
      setTemplateSort(true);
    }

    const sortedGroups = [...groups].sort((a, b) => {
      const aBoard =
        a.projects.length > 0
          ? a.projects[0].project_boards.find((board) => board.templateId === templateId)
          : null;
      const bBoard =
        b.projects.length > 0
          ? b.projects[0].project_boards.find((board) => board.templateId === templateId)
          : null;
      const aScore = aBoard ? aBoard.board_score : 0;
      const bScore = bBoard ? bBoard.board_score : 0;
      return !templateSort ? aScore - bScore : bScore - aScore;
    });
    setGroups(sortedGroups);
    setTemplateSort(!templateSort);
    setTemplateSortOrder({
      ...templateSortOrder,
      [templateId]: !templateSortOrder[templateId],
    });
  };

  const handleTimeSort = () => {
    setSharedState(4);
    activate(4);

    const sortedGroups = [...groups].sort((a, b) => {
      const aTime = a.projects.length > 0 ? new Date(a.projects[0].created_at) : null;
      const bTime = b.projects.length > 0 ? new Date(b.projects[0].created_at) : null;

      if (aTime && bTime) {
        return !dateSort ? aTime - bTime : bTime - aTime;
      } else if (!aTime && !bTime) {
        return 0;
      } else if (!aTime) {
        return 1;
      } else {
        return -1;
      }
    });

    setGroups(sortedGroups);
    setDateSort(!dateSort);
  };

  const time = (timestamp) => {
    const dateObject = new Date(timestamp);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const year = dateObject.getFullYear();
    const month = monthNames[dateObject.getMonth()]; // Use the array to get the month name
    const day = dateObject.getDate().toString().padStart(2, '0');
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

  const onClickNavigation = (projId) => {
    const currentUrl = window.location.pathname;
    localStorage.setItem('search', currentUrl);
    navigate(`/search-project/${projId}`);
  };

  return (
    <>
      <Card className={styles.card}>
        <div
          className={global.brown}
          style={{ borderRadius: '12px 12px 0 0', padding: '2px 30px' }}
        >
          <p className={styles.header}> All Projects </p>
        </div>
        <div className={styles.xScroll}>
          <div
            className={`${styles.adminContainer} `}
            style={{
              borderBottom: '1px solid #9c7b16',
              color: '#BCBEC0',
              marginBottom: '10px',
              gridTemplateColumns: `repeat(${3}, 11rem) 20rem 11rem repeat(${
                templates.length
              }, 11rem) 11rem 11rem`,
            }}
          >
            <span className={`${styles.centerText} ${styles.clickable}`} onClick={handleClassSort}>
              Classroom
              <SortButton isActive={sharedState === 0} sort={classSortOrder} />
            </span>

            <span
              className={`${styles.centerText} ${styles.clickable}`}
              onClick={handleGroupNameSort}
            >
              Group Name
              <SortButton isActive={sharedState === 1} sort={groupNameSortOrder} />
            </span>
            <span
              className={`${styles.centerText} ${styles.clickable}`}
              onClick={handleProjectNameSort}
            >
              Project
              <SortButton isActive={sharedState === 2} sort={projectNameSortOrder} />
            </span>
            <span className={`${styles.centerText}`}>Description</span>
            <span className={`${styles.centerText} ${styles.clickable}`} onClick={handleSort}>
              Overall Rating
              <SortButton isActive={sharedState === 3} sort={sortOrder} />
            </span>
            {templates.map((template, index) => (
              <span
                key={index}
                className={`${styles.centerText} ${styles.clickable}`}
                onClick={() => handleTemplateSort(template.id)}
              >
                {template.title}
                <SortButton isActive={sharedState === 4 + template.id} sort={templateSort} />
              </span>
            ))}
            <span className={`${styles.centerText}`}>Handled By</span>
            <span className={`${styles.centerText} ${styles.clickable}`} onClick={handleTimeSort}>
              Date Created
              <SortButton isActive={sharedState === 4} sort={dateSort} />
            </span>
          </div>
          <div className={styles.yScroll}>
            {groupsToDisplay.map((group, index) => (
              <div
                className={`${styles.adminContainer} ${styles.conHover}`}
                style={{
                  gridTemplateColumns: `repeat(${3}, 11rem) 20rem 11rem repeat(${
                    templates.length
                  }, 11rem) 11rem 11rem`,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                }}
                key={index}
              >
                <span className={styles.centerText}>{group.class_name}</span>

                <span className={styles.centerText}>{group.name}</span>

                {group.projects.length > 0 ? (
                  <>
                    <span
                      className={styles.centerTextName}
                      onClick={() => onClickNavigation(group.projects[0].project_id)}
                    >
                      {group.projects[0].name}
                    </span>
                    <span className={styles.centerText}>{group.projects[0].description}</span>
                  </>
                ) : (
                  <>
                    <span className={styles.centerText}>No Active Project</span>
                    <span className={styles.centerText}>No Description</span>
                  </>
                )}

                <span className={styles.centerText} style={{ color: 'red' }}>
                  {group.projects.length > 0
                    ? `${Math.round((group.projects[0].project_score / templates.length) * 10)}%`
                    : '0%'}
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
                      {projectBoard ? `${Math.round(projectBoard.board_score * 10)}%` : '0%'}
                    </span>
                  );
                })}
                <span className={styles.centerText}>{group.teacher_name}</span>

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
        <span onClick={handlePreviousPage} className={currentPage === 1 ? styles.disabled : ''}>
          &lt;&lt;
        </span>
        <span>&nbsp; {currentPage} &nbsp; </span>
        <span
          onClick={handleNextPage}
          className={currentPage === totalPageCount ? styles.disabled : ''}
        >
          &gt;&gt;
        </span>
      </div>
    </>
  );
};

export default AdminTable;
