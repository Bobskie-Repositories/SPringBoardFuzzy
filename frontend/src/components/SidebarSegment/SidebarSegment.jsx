import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import GroupIcon from '@assets/groupicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const SidebarSegment = ({ selectedProject, setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/group/' + id + '/projects')
      .then((response) => response.json())
      .then((projects) => {
        setProjects(projects);
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

  const showCreateProjectModal = () => {
    Swal.fire({
      title: '<span style="font-size: 20px">Create a New Project</span>',
      input: 'text',
      inputPlaceholder: 'Enter new project name',
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#9c7b16',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'rgb(181, 178, 178)',
      inputValidator: (value) => {
        if (!value) {
          return 'Project name cannot be empty';
        }
      },
      inputAttributes: {
        style: 'height: 35px; font-size: 16px',
        onfocus: '#9c7b16;',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newProjectName = result.value;
        const newProject = { id: Date.now(), name: newProjectName };
        setProjects([...projects, newProject]);
        Swal.fire({
        title: 'Project Created',
        icon: 'success',
        confirmButtonColor: '#9c7b16',
      });
      }
    });
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
            <h3>Technobobskie</h3>
            <h4>ABC-QWE-123</h4>
          </div>
        </button>
      </div>

      <ol className={styles.orList}>
        <li className={`${global.center} ${styles.customLi}`}>
          <div onClick={() => setOpen(!open)} className={styles.nameIcon}>
            <FontAwesomeIcon icon={faSquareCaretDown} className={styles.dropdown} size="xl" /> &nbsp;
            Projects
          </div>
          <FontAwesomeIcon icon={faPlus} className={styles.plus} size="lg" onClick={showCreateProjectModal} />
        </li>
      </ol>

      {open && (
        <div style={{ marginTop: '-7%', paddingLeft: '20%' }}>
          <ul>
            {projects.map((project) => (
              <li
                className={`${styles.projectName} ${
                  clickedProjectId === project.id ? styles.clickedProject : ''
                }`}
                key={project.id}
                onClick={() => handleButtonClick(project.id)}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarSegment;
