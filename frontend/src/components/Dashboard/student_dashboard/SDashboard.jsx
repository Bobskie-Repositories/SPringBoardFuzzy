import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Boards from '../../Boards/Board';
import Profile from '../../ProfileSegment/Profile';
import BoardCreation from '../../BoardCreation/BoardCreation';
import Button from '../../UI/Button/Button';
import styles from './SDashboard.module.css';

const SDashboard = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [createAction, setCreateAction] = useState(false);

  const handleCreateBoardClick = () => {
    setCreateAction(!createAction);
  };

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar setSelectedProject={setSelectedProject}/>

      <div>
        <div className={ styles.container } style={{gap: "150px"}}>
          <Search />
          <Profile identification={1} />
        </div>

        <div className={ styles.container }>

          {createAction ? <BoardCreation /> : <Boards selectedProject={selectedProject}/>}
        
          <Button 
            style={{
              backgroundColor: '#9C7B16',
              height: '40px',
              marginTop: '40px',
              fontSize: '12px',
            }}
            onClick={handleCreateBoardClick} 
            > 
              Create Board
          </Button>
        </div>
        
      </div>  

    </div>
  )
}

export default SDashboard;