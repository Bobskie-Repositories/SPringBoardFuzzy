import React from 'react'
import styles from './SidebarSegment.module.css';
import global from '../../assets/global.module.css';
import GroupIcon from '@assets/groupicon.png';
import BoardIcon from '@assets/boardicon.png';
import DropDownIcon from '@assets/dropdownicon.png';

function SidebarSegment() {
  const Menus = ["Project Name 1", "Project Name 2"];
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
      <ul style={{  marginTop: "-7%", paddingLeft: "30%"}} >
        {Menus.map((menu) => (
          <li className={styles.projectName} key={menu} >{menu}</li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarSegment