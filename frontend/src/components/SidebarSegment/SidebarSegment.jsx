import React from 'react'
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import GroupIcon from '@assets/groupicon.png';
import BoardIcon from '@assets/boardicon.png';
import DropDownIcon from '@assets/dropdownicon.png';

function SidebarSegment() {
  return (
    <div className={styles.body}>

      <div className={styles.subbody}>
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

      <ol style={{ listStyleType: "none", padding: 0, marginTop: "5%" }}>
            <li className={`${global.center} ${styles.customLi}`} >
                <img src={DropDownIcon} alt="DropDownIcon" /> &nbsp;
                <img src={BoardIcon} alt="BoardIcon" className={styles.boardpic}/> &nbsp;
                Board
            </li>         
        </ol>
    </div>
  )
}

export default SidebarSegment