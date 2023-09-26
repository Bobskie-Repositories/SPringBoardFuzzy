import React from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Boards from '../../Boards/Board';
import Profile from '../../ProfileSegment/Profile';
import styles from './SDashboard.module.css';
import { useState, useEffect } from 'react';

const SDashboard = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [project, setProject] = useState(null)

  useEffect(() => {
    if (selectedProject !== null && selectedProject !== undefined) {
      fetch('http://127.0.0.1:8000/api/project/' + selectedProject )
          .then((response) => response.json())
          .then((project) => {
            setProject(project);
          });
    }          
  }, [selectedProject]);

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar setSelectedProject={setSelectedProject}/>

      <div>
        <div className={ styles.container }>
          <Search />
          <Profile identification={1} />
        </div>
        <h2 style={{fontSize: "30px", color: '#9c7b16'}}>{project.name} Boards</h2>
        <Boards selectedProject={selectedProject}/>
      </div>  

    </div>
  )
}

export default SDashboard;