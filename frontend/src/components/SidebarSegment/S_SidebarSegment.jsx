import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSquareCaretDown, faTrash, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';

const S_SidebarSegment = ({ selected, setSelected }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const [userGroupId, setUserGroupId] = useState('');
  const { groupid } = useParams();
  const { getUser } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setUserGroupId(user.group_fk);
      axios.get(`http://127.0.0.1:8000/api/group/${user.group_fk}/projects`)
      .then((response) => {
        setProjects(response.data);
        setSelected(response.data[0].id);
        setClickedProjectId(response.data[0].id);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    };
  
    fetchData();
    
  }, []);

  const handleButtonClick = (projectId) => {
    setSelected(projectId);
    setClickedProjectId(projectId);
  };

  const handleNameIconClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setOpen(!open);
  };


  const addProject = async (newProject) => {
    try {
      const getCurrentTimestamp = () => {
        const now = new Date();
        const isoTimestamp = now.toISOString();
        return isoTimestamp;
      };

      const response = await axios.post(`http://127.0.0.1:8000/api/project/create`, {
        name: newProject,
        group_fk: userGroupId,
        created_at: getCurrentTimestamp(),
      });

      const newProjectId = response.data.id;
      const newProjectResponse = await axios.get(`http://127.0.0.1:8000/api/project/${newProjectId}`);
      const newProjectData = newProjectResponse.data;

      setProjects([...projects, newProjectData]);

      console.log('ProjectB created successfully:', response.data.id);
    } catch (error) {
      console.error('Error creating Project:', error);
    }
  }

  const deleteProject = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/project/${clickedProjectId}/delete`);
      const updatedProjects = projects.filter(project => project.id !== clickedProjectId);
      setProjects(updatedProjects);
      setSelected(projects[0].id);
      setClickedProjectId(projects[0].id);
      if (response.status === 204) {
        console.log('Project deleted successfully');
      } else {
        console.error('Failed to delete Project:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error deleting Project:', error);
    }
  }
  

  const showCreateProjectModal = () => {
    Swal.fire({
      html: '<span style="font-size: 20px">Create a New Project</span>',
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
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newProjectName = result.value;
        addProject(newProjectName);
        Swal.fire({
          title: 'Project Created',
          icon: 'success',
          confirmButtonColor: '#9c7b16',
        });
      }
    });
  };

  const showDeleteProjectModal = () => {
    Swal.fire({
      icon: 'warning',
      title: '<span style="font-size: 20px">Are you sure you want to delete?</span>',
      html: '<span style="font-size: 15px">This will delete this project permanently. You cannot undo this action.</span>',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#8A252C',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'rgb(181, 178, 178)',
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteProject();
          Swal.fire({
            title: '<span style="font-size: 20px">Project Sucessfully Deleted</span>',
            icon: 'success',
            confirmButtonColor: '#9c7b16',
            confirmButtonText: 'OK',
          })
        }
      });
  };
  
  

  return (
    <div className={styles.body}>

      <ol className={styles.orList}>
        <li className={`${global.center} ${styles.customLi}`}>
          <div onClick={handleNameIconClick} className={styles.nameIcon}>
            <FontAwesomeIcon icon={projects.length > 0 ? faSquareCaretDown : faSquareCaretRight} className={styles.dropdown} size="xl" /> &nbsp;
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
                {clickedProjectId === project.id && (
                  <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} onClick={showDeleteProjectModal}/>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default S_SidebarSegment;
