import React from 'react'
import prof from "../../assets/iconprof.png";
import styles from "../../assets/global.module.css"

const Profile = ( {name, img, identification} ) => {
  return (
    <div className={ styles.center } style={{height: "20px" , marginTop: '30px', gap: "20px"}}>
        { identification == 1 ? 'Bob Kyle L. Rosales' : ''}
        <img src={prof} alt="prof"/>
        { identification != 1 ? 'Bob Kyle L. Rosales' : ''}
    </div>
  )
}

export default Profile;