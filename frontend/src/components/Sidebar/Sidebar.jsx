import React from 'react'
import styles from './Sidebar.module.css';
import global from '../../assets/global.module.css';
import Logo from '@assets/Logo.png';
import SideBarSegment from './../SidebarSegment/SidebarSegment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setSelectedProject }) => {
    
    
    return (
        <div className={styles.sidebar}>
            <img src={Logo} alt="Logo" className={styles.img}/>

            {/* <ol style={{ listStyleType: "none", padding: 0 }}>
                <li className={`${global.center} ${styles.customLi}`} >
                    <img src={SmallIcon} alt="SmallIcon" /> &nbsp;
                    Class
                </li>          
            </ol>*/}
            <SideBarSegment setSelectedProject={setSelectedProject}/>

            <ol style={{ listStyleType: "none", padding: 0, marginTop: "50%" }}>
                <li className={`${global.center} ${styles.customLi}`} >
                    <FontAwesomeIcon icon={faCircleInfo} size="lg" className={styles.icon}/> &nbsp;
                    Support
                </li>
                <li className={`${global.center} ${styles.customLi}`} >
                    <FontAwesomeIcon icon={faGear} size="lg" className={styles.icon}/> &nbsp;
                    Settings
                </li>
                <li className={`${global.center} ${styles.customLi}`} >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" className={styles.icon}/> &nbsp;
                    Log out
                </li>          
            </ol>

        </div>
    )
}

export default Sidebar;