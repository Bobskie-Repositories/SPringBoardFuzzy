import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import GroupIcon from '@assets/groupicon.png';
import BoardIcon from '@assets/boardicon.png';
import DropDownIcon from '@assets/dropdownicon.png';

function SidebarSegment({ setSelectedProject }) {
  const [projects, setProject] = useState([])
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
      fetch('http://127.0.0.1:8000/api/group/' + id + '/projects')
          .then((response) => response.json())
          .then((projects) => {
            setProject(projects);
            setSelectedProject(projects[0].id);
          });          
  }, []);

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

      <ol style={{ listStyleType: "none", padding: 0, marginTop: "5%" }}>
          <li className={`${global.center} ${styles.customLi}`} onClick={() => setOpen(!open)}>
            <img src={DropDownIcon} alt="DropDownIcon" /> &nbsp;
            <img src={BoardIcon} alt="BoardIcon" className={styles.boardpic}/> &nbsp;
            Board
          </li>         
      </ol>

      { open && (
          <ul style={{  marginTop: "-7%", paddingLeft: "30%"}} >
        {projects.map((project) => (
          <li className={styles.projectName} 
            key={project.id} 
            onClick={() => setSelectedProject(project.id)}> 
            {project.name} 
          </li>
        ))}
      </ul>
      )}
      
    </div>
  )
}

export default SidebarSegment