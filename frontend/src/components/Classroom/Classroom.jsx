import React from 'react'
import global from '@assets/global.module.css';
import rightImg from '@assets/chevron-right.png';
import classroomImg from '@assets/Classroom.png';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import styles from './Classroom.module.css'

const Classroom = () => {
  const rooms = [
    {
      title: "Classroom 1",
      objectID: 0,
    },
    {
      title: "Classroom 2",
      objectID: 1,
    },
    {
      title: "Classroom 3",
      objectID: 2,
    }, 
    {
      title: "Classroom 4",
      objectID: 3,
    },
    {
      title: "Classroom 5",
      objectID: 4,
    },
    {
      title: "Classroom 6",
      objectID: 5,
    },
    {
      title: "Classroom 7",
      objectID: 6,
    },
    {
      title: "Classroom 8",
      objectID: 7,
    },
  ];

  return (
    <div>       
        <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Classrooms</h2>
        
        {
          rooms.map ( classroom => {
            return (
              <div key={classroom.objectID} style={{ display: "inline-block", margin: "20px 30px" }}>

                <Card className={ styles.classroom }>

                  <div style={{padding: "1rem"}}>
                    <img src={ classroomImg }/>
                    <h4>{classroom.title}</h4>
                  </div>

                  <Button className = { global.brown } style={{borderRadius: "0 0 10px 10px", width: "100%"}}>
                    <img src={ rightImg }/>
                  </Button>

                </Card>
              </div>
            );
          })

        }
        
        
        
    </div>
  )
}

export default Classroom;