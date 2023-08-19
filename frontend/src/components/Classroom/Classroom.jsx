import React from 'react'
import Card from '../UI/Card/Card';
import styles from './Classroom.module.css';
import global from '@assets/global.module.css';
import { useParams } from 'react-router-dom'

const Classroom = () => {
  const { id } = useParams();

  const groups = [
    {
      title: "Group 1",
      objectID: 0,
      rank: 1,
    },
    {
      title: "Group 2",
      objectID: 1,
      rank: 2,
    },
    {
      title: "Group 3",
      objectID: 2,
      rank: 3,
    }, 
    {
      title: "Group 4",
      objectID: 3,
      rank: 4,
    },
    {
      title: "Group 5",
      objectID: 4,
      rank: 5,
    },
    {
      title: "Group 6",
      objectID: 5,
      rank: 6,
    },
    {
      title: "Group 7",
      objectID: 6,
      rank: 7,
    },
    {
      title: "Group 8",
      objectID: 7,
      rank: 8,
    },
  ];


  return (
    <div>
      <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Classrooms {id}</h2>

      <Card className={ styles.card }>

          <div className={ global.brown } style={{borderRadius: '12px 12px 0 0', padding: '5px 30px'}}>
            <h3 style={{color: 'white'}}> List of Groups </h3>
          </div>

          <div className={styles.container} style={{borderBottom: "1px solid #9c7b16", color: "#BCBEC0"}}>
            <span className={styles.centerText}>Group Name</span>
            <span className={styles.centerText}>Group Id</span>
            <span className={styles.centerText}>Top Group</span>
          </div>

          {
            groups.map ( group => {
            return (
                <div className={styles.container} style={{gridTemplateRows: '3rem'}}>
                  <span className={styles.centerText}>{ group.title }</span>
                  <span className={styles.centerText}>{ group.objectID }</span>
                  <span className={styles.centerText}>{ group.rank }</span>
                </div>       
            );
            })
          }    
      </Card>
    </div>
  )
}

export default Classroom