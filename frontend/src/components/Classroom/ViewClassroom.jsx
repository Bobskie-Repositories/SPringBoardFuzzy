import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Card from '../UI/Card/Card';
import styles from './ViewClassroom.module.css';
import global from '@assets/global.module.css';
import axios from 'axios';


const ViewClassroom = ({selected}) => {
  const [classroom, setClassroom] = useState(null)
  const [groups, setGroups] = useState(null)

  useEffect(() => {
    if (selected !== null && selected !== undefined){
      axios.get(`http://127.0.0.1:8000/api/classroom/${selected}`)
        .then((response) => {
          setClassroom(response.data.class_name);
          // console.log(response.data.class_name)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      
      axios.get(`http://127.0.0.1:8000/api/classroom/${selected}/group`)
        .then((response) => {
          setGroups(response.data);
          // console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selected]);

  const goGroupPage = () => {
    
  }

  // if(!groups){
  //   return <p>Loading...</p>;
  // }


  return (
    <div>
      <h2 style={{fontSize: "30px", color: '#9c7b16'}}>{classroom}</h2>

      <Card className={ styles.card }>

          <div className={ global.brown } style={{borderRadius: '12px 12px 0 0', padding: '5px 30px'}}>
            <h3 style={{color: 'white'}}> List of Groups </h3>
          </div>

          <div className={styles.container} style={{borderBottom: "1px solid #9c7b16", color: "#BCBEC0", marginBottom: "10px"}}>
            <span className={styles.centerText}>Group Name</span>
            {/* <span className={styles.centerText}>Group Id</span> */}
            <span className={styles.centerText}>Top Group</span>
          </div>

          {groups ? (
            groups.map((group) => (
              <div className={styles.container} style={{ gridTemplateRows: '2.5rem' }} key={group.id}>
                <NavLink to={ `group/${group.id}`}>
                  <span className={styles.centerTextName} onClick={goGroupPage}>{group.name}</span>
                </NavLink>
                <span className={styles.centerText}>{group.rank}</span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}


      </Card>
    </div>
  )
}

export default ViewClassroom