import React from 'react'
import { useState} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Boards from '../../Boards/Board';
import Profile from '../../ProfileSegment/Profile';
import BoardCreation from '../../BoardCreation/BoardCreation';
import Button from '../../UI/Button/Button';
import styles from './SDashboard.module.css';

const SDashboard = () => {
  const [selected, setSelected] = useState();
  const [createAction, setCreateAction] = useState(false);

  const handleCreateBoardClick = () => {
    setCreateAction(true); 
  };

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar setSelected={setSelected}/>

      <div>
        <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
          <Search />
          <Profile identification={1} />
        </div>

        <div className={ styles.container }>
          {createAction ? <BoardCreation selected={selected} setCreateAction={setCreateAction}/> : <Boards selected={selected} />}
        
          <Button 
          className={styles.butName}
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