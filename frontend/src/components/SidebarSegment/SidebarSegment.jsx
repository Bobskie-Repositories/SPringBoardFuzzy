import React from 'react'
import styles from './SidebarSegment.module.css';
import GroupIcon from '@assets/groupicon.png';


function SidebarSegment() {
  return (
    <div className={styles.body}>
      <h4 className={styles.grouptext}>Your Group</h4>
      <button className={styles.groupbutton}>
          <div>
            <img 
              className={styles.groupicon} 
              src={GroupIcon} 
              alt="GroupIcon" 
              />
            <h3> Technobobskie </h3>
            <h4>ABC-QWE-123</h4>
          </div>
      </button>
    </div>
  )
}

export default SidebarSegment