  import React from 'react'
  import T_Sidebar from '../../Sidebar/T_Sidebar';
  import Search from '../../Search/Search';
  import Profile from '../../ProfileSegment/Profile';
  import ClassroomList from '../../Classroom/ClassroomList';
  import Classroom from '../../Classroom/Classroom';
  import { useState, useEffect } from 'react';
  import styles from './MDashboard.module.css';
  import global from '@assets/global.module.css';
  import { useNavigate, useParams } from 'react-router';

  const MDashboard = ({ classroom }) => {
    const [selected, setSelected] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      // Update the selected state when the URL changes
      setSelected(id);
    }, [selected, id]);

    return (
      <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
        <T_Sidebar setSelected={setSelected}/>

        <div>
          <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
            <Search />
            <Profile identification={1} />
          </div>
          
      
          { classroom ? <Classroom selected={selected}/> : <ClassroomList />}


        </div>  

      </div>
    )
  }

  export default MDashboard;