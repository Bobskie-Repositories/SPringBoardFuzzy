import React from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Profile from '../../ProfileSegment/Profile';
import Classroom from '../../Classroom/Classroom';
import styles from './SDashboard.module.css';

const MDashboard = () => {
  return (
    <div className={ styles.container }>
      <Sidebar />

      <div>
        <div className={ styles.container }style={{padding: 0, gap: '200px'}}>
          <Search />
          <Profile identification={1} />
        </div>
        <Classroom />

      </div>  

    </div>
  )
}

export default MDashboard;