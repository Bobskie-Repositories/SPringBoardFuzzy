import React from 'react'
import styles from './ClassroomList.module.css'
import global from '@assets/global.module.css';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import { NavLink } from 'react-router-dom';
import rightImg from '@assets/chevron-right.png';
import classroomImg from '@assets/Classroom.png';
import { useState, useEffect } from 'react';


const ClassroomList = () => {
    // const rooms = [
    //     {
    //       title: "Classroom 1",
    //       objectID: 0,
    //     },
    //     {
    //       title: "Classroom 2",
    //       objectID: 1,
    //     },
    //     {
    //       title: "Classroom 3",
    //       objectID: 2,
    //     }, 
    //     {
    //       title: "Classroom 4",
    //       objectID: 3,
    //     },
    //     {
    //       title: "Classroom 5",
    //       objectID: 4,
    //     },
    //     {
    //       title: "Classroom 6",
    //       objectID: 5,
    //     },
    //     {
    //       title: "Classroom 7",
    //       objectID: 6,
    //     },
    //     {
    //       title: "Classroom 8",
    //       objectID: 7,
    //     },
    //   ];

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/classroom/')
            .then((response) => response.json())
            .then((rooms) => setRooms(rooms));
    }, []);

  return (
    <div>       
        <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Classrooms</h2>
        
        {
            rooms.map ( classroom => {
            return (
                <div key={classroom.objectID} style={{ display: "inline-block", margin: "20px 30px" }}>

                <Card className={ styles.classroom } style={{padding: 0}}>

                    <div style={{padding: "1rem"}}>
                    <img src={ classroomImg }/>
                    <h4>{classroom.class_name}</h4>
                    </div>
                    
                    <NavLink to={ `/classroom/${classroom.id}`}>
                      <Button className = { global.brown } style={{borderRadius: "0 0 10px 10px", width: "100%"}}>       
                          <img src={ rightImg }/>
                      </Button>
                    </NavLink>
        
                </Card>
                </div>
            );
            })
        }
    </div>
  )
}

export default ClassroomList;