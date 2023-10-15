import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faSquareCaretRight,  faTableCellsLarge} from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import axios from 'axios';


const T_SidebarSegment = ({ selected, setSelected, toggleCreateAction }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedClassId, setClickedClassId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
  
        const response = await axios.get(`http://127.0.0.1:8000/api/classroom/${user.id}/all`);
        setClassrooms(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleButtonClick = (classId) => {
    toggleCreateAction(false);
    setSelected(classId);
    setClickedClassId(classId);
    navigate(`/classroom/${classId}`)
  };

  const handleNameIconClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setOpen(!open);
  };

  const goMyTemplate = () => {
    toggleCreateAction(true);
  }

  return (
    <div className={styles.body}>

      <ol className={styles.orList}>

        <li className={`${global.center} ${styles.customLi}`}>
        <div onClick={goMyTemplate} className={styles.nameIcon}> 
          <FontAwesomeIcon icon={faTableCellsLarge} className={styles.templates} size="xl"/>
            My Template
          </div>
        </li>

        <li className={`${global.center} ${styles.customLi}`}>
          <div onClick={handleNameIconClick} className={styles.nameIcon}>
            <FontAwesomeIcon icon={open ? faSquareCaretDown : faSquareCaretRight} className={styles.dropdown} size="xl" /> &nbsp;
            Class
          </div>
        </li>

      </ol>

      {open && (
        <div style={{ marginTop: '-7%', paddingLeft: '20%' }}>
          <ul>
            {classrooms.map((classroom) => (
                <li
                  key={classroom.id}
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
