import React from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Boards from '../../Boards/Board';
import Profile from '../../ProfileSegment/Profile';
import styles from './SDashboard.module.css';
import { useState } from 'react';

const SDashboard = () => {
  const [selectedProject, setSelectedProject] = useState();

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar setSelectedProject={setSelectedProject}/>

      <div>
        <div className={ styles.container }>
          <Search />
          <Profile identification={1} />
        </div>
        <Boards selectedProject={selectedProject}/>
      </div>  

    </div>
  )
}

export default SDashboard;