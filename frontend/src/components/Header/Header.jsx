import React from 'react'
import styles from './Header.module.css'
import global from '@assets/global.module.css';
import Logo from '@assets/LogoWhite.png';
import Notif from '@assets/notification.png';
import Profile from '../ProfileSegment/Profile';

const Header = () => {
  return (
    <div className={`${global.brown} ${styles.header}`}>
        <div className={styles.left}>
            <img src={Logo} alt="Logo" className={styles.img}/>
            <h4 style={{color:'white'}}>SPringBoard</h4>
        </div>

        <div className={styles.right}>
            <img src={Notif} alt="Notif" className={styles.notif}/>
            <Profile identification={0} />
        </div>        
    </div>
  )
}

export default Header