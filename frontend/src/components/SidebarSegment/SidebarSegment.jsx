import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import GroupIcon from '@assets/groupicon.png';
import BoardIcon from '@assets/boardicon.png';
import DropDownIcon from '@assets/dropdownicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';

const SidebarSegment = ({ selectedProject, setSelectedProject }) => {
  const [projects, setProject] = useState([])
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [clickedProjectId, setClickedProjectId] = useState(null);

  useEffect(() => {
      fetch('http://127.0.0.1:8000/api/group/' + id + '/projects')
          .then((response) => response.json())
          .then((projects) => {
            setProject(projects);
            setSelectedProject(projects[0].id);
          });          
  }, []);

  const handleButtonClick = (projectId) => {
    if (clickedProjectId === projectId) {
      setClickedProjectId(null);
    } else {
      setClickedProjectId(projectId);
    }
    setSelectedProject(projectId);
  };

  return (
    <div className={styles.body}>

      <div className={styles.subbody}>
      <h4 className={styles.grouptext}>Your Group</h4>
      <button className={styles.groupbutton}>
          <div>
            <img 
              className={styles.groupicon} 
              src={GroupIcon} 
              alt="GroupIcon" 
              />
            <h3> Technobobskie </h3>
            <h4>ABC-QWE-123</h4>
          </div>
      </button>
      </div>

      <ol className={styles.orList}>
          <li className={`${global.center} ${styles.customLi}`} >
            <div onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faSquareCaretDown} className={styles.dropdown} size="xl"/> &nbsp;
              Projects
            </div>
            
            <FontAwesomeIcon icon={faPlus} className={styles.plus} size="lg"/>
          </li>
      </ol>

      { open && (
          <ul style={{  marginTop: "-7%", paddingLeft: "30%"}} >
        {projects.map((project) => (
          <li
            className={`${styles.projectName} ${
            clickedProjectId === project.id ? styles.clickedProject : ""
            }`}
            key={project.id}
            onClick={() => handleButtonClick(project.id)} >
          {project.name}
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default SidebarSegment