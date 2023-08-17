import React from 'react'
import styles from './Sidebar.module.css';
import global from '../../assets/global.module.css';
import Logo from '@assets/Logo.png';
import SmallIcon from '@assets/small-icon.png';
import Settings from '@assets/settings.png';
import Logout from '@assets/logout.png';
import Support from '@assets/support.png';
import SideBarSegment from './../SidebarSegment/SidebarSegment';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <img src={Logo} alt="Logo" className={styles.img}/>

        {/* <ol style={{ listStyleType: "none", padding: 0 }}>
            <li className={`${global.center} ${styles.customLi}`} >
                <img src={SmallIcon} alt="SmallIcon" /> &nbsp;
                Class
            </li>          
        </ol>*/}
        <SideBarSegment/>

        <ol style={{ listStyleType: "none", padding: 0, marginTop: "100%" }}>
            <li className={`${global.center} ${styles.customLi}`} >
                <img src={Support} alt="Support" /> &nbsp;
                Support
            </li>
            <li className={`${global.center} ${styles.customLi}`} >
                <img src={Settings} alt="Settings" /> &nbsp;
                Settings
            </li>
            <li className={`${global.center} ${styles.customLi}`} >
                <img src={Logout} alt="Logout" /> &nbsp;
                Log out
            </li>          
        </ol>

    </div>
  )
}

export default Sidebar;