import React, { useState, useEffect } from 'react'
import prof from "../../assets/iconprof.png";
import profwhite from '@assets/iconprof2.png';
import styles from "./Profile.module.css"
import { useNavigate} from 'react-router';
import { useAuth } from '../../context/AuthContext';


const Profile = ( {identification} ) => {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setName(user.firstname + ' ' + user.lastname)
    };
  
    fetchData();
  }, []);

  return (
    <div className={ styles.center } style={{height: "20px" ,  gap: "20px"}}>
        {identification === 1 ? (
          <>
            <p>{name}</p>
            <img src={prof} alt="prof" />
          </>
        ) : (
          <>
            <img src={profwhite} alt="profwhite" />
            <p style={{color: 'white'}}>{name}</p>
          </>
        )}
    </div>
  )
}

export default Profile;