import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProjectContents.module.css";
import Boards from "../Boards/Board";
import BoardCreation from "../BoardCreation/BoardCreation";
import ProjectDetails from "./ProjectDetails";
import axios from "axios";
import config from "../../config";
import Loading from "../UI/Loading/Loading";

const ProjectContents = (props) => {
  const [boardCount, setBoardCount] = useState(0);
  const [user, setUser] = useState();
  const [allTemplate, setAllTemplate] = useState();
  const [boardTemplateIds, setBoardTemplateIds] = useState([]);
  const [numTemplates, setNumTemplates] = useState(0);
  const [project, setProject] = useState();
  const { getUser } = useAuth();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setUser(user);
      if (props.selected !== null && props.selected !== undefined) {
        const projectResponse = await axios.get(
          `${API_HOST}/api/project/${props.selected}`
        );
        setProject(projectResponse.data);
      }

      const response = await axios.get(`${API_HOST}/api/template/`);
      setAllTemplate(response.data);
      setNumTemplates(response.data.length);
    };
    fetchData();
  }, [props.selected, props.projectUpdateKey]);

  if (!project && props.selected != undefined) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      {project &&
      !user.staff &&
      user.group_fk == project.group_fk &&
      props.createAction ? (
        <BoardCreation
          selected={props.selected}
          setCreateAction={props.setCreateAction}
          boardTemplateIds={boardTemplateIds}
          allTemplate={allTemplate}
        />
      ) : (
        <Boards
          selected={props.selected}
          project={project}
          setBoardCount={setBoardCount}
          onProjectUpdate={props.onProjectUpdate}
          setBoardTemplateIds={setBoardTemplateIds}
          projectUpdateKey={props.projectUpdateKey}
          handleCreateBoardClick={props.handleCreateBoardClick}
        />
      )}
      {project && (
        <ProjectDetails
          project={project}
          numTemplates={numTemplates}
          onProjectUpdate={props.onProjectUpdate}
          user={user}
        />
      )}
    </div>
  );
};

export default ProjectContents;
