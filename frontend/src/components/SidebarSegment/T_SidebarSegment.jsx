import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';

const T_SidebarSegment = ({ selected, setSelected }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedClassId, setClickedClassId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/classroom/1/all`)
      .then((response) => {
        setClassrooms(response.data);
        setSelected(response.data[0].id);
        setClickedClassId(response.data[0].id);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleButtonClick = (projectId) => {
    setSelected(projectId);
    setClickedClassId(projectId);
    navigate(`/classroom/${projectId}`)
  };

  const handleNameIconClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setOpen(!open);
  };

  return (
    <div className={styles.body}>

      <ol className={styles.orList}>
        <li className={`${global.center} ${styles.customLi}`}>
          <div onClick={handleNameIconClick} className={styles.nameIcon}>
            <FontAwesomeIcon icon={faSquareCaretDown} className={styles.dropdown} size="xl" /> &nbsp;
            Class
          </div>
        </li>
      </ol>

      {open && (
        <div style={{ marginTop: '-7%', paddingLeft: '20%' }}>
          <ul>
            {classrooms.map((classroom) => (
                <li
                  className={`${styles.projectName} ${
                    clickedClassId === classroom.id ? styles.clickedProject : ''
                  }`}
                  onClick={() => handleButtonClick(classroom.id)}
                >
                  {classroom.class_name}
                </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default T_SidebarSegment;
