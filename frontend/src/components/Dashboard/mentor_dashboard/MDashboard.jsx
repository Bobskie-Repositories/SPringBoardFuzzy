import React from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Profile from '../../ProfileSegment/Profile';
import ClassroomList from '../../Classroom/ClassroomList';
import Classroom from '../../Classroom/Classroom';

import styles from './MDashboard.module.css';
import global from '@assets/global.module.css';


const MDashboard = ({ classroom }) => {

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar />

      <div>
        <div className={ styles.container }>
          <Search />
          <Profile identification={1} />
        </div>
        

        { classroom ? <Classroom /> : <ClassroomList />}


      </div>  

    </div>
  )
}

export default MDashboard;