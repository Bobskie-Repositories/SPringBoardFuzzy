import React from 'react'
import prof from "../../assets/iconprof.png";
import profwhite from '@assets/iconprof2.png';
import styles from "./Profile.module.css"

const Profile = ( {name, img, identification} ) => {
  return (
    <div className={ styles.center } style={{height: "20px" ,  gap: "20px"}}>
        {identification === 1 ? (
          <div style={{marginTop: '30px',}}>
            <p>Bob Kyle L. Rosales</p>
            <img src={prof} alt="prof" />
          </div>
        ) : (
          <>
            <img src={profwhite} alt="profwhite" />
            <p style={{color: 'white'}}>Bob Kyle L. Rosales</p>
          </>
        )}
    </div>
  )
}

export default Profile;