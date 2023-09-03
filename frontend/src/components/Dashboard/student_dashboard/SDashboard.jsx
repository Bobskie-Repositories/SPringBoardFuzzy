import React from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Profile from '../../ProfileSegment/Profile';
import styles from './SDashboard.module.css';

const SDashboard = () => {

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar />

      <div>
        <div className={ styles.container }>
          <Search />
          <Profile identification={1} />
        </div>

      </div>  

    </div>
  )
}

export default SDashboard;