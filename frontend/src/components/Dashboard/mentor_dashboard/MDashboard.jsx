  import React from 'react'
  import { useState, useEffect } from 'react';
  import { useParams } from 'react-router';
  import T_Sidebar from '../../Sidebar/T_Sidebar';
  import Search from '../../Search/Search';
  import Profile from '../../ProfileSegment/Profile';
  import ClassroomList from '../../Classroom/ClassroomList';
  import ViewClassroom from '../../Classroom/ViewClassroom';
  import ViewProject from '../../ViewProject/ViewProject';
  import TemplateList from '../../TemplateList/TemplateList';
  import styles from './MDashboard.module.css';


  const MDashboard = ({ choose }) => {
    const [selected, setSelected] = useState();
    const [selectedProj, setSelectedProj] = useState();
    const { id, groupid } = useParams();

    useEffect(() => {
      setSelected(id);
    }, [selected, id]);

    return (
      <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
        <T_Sidebar setSelected={setSelected} choose={choose} setSelectedProj={setSelectedProj}/>
        
        <div>
          <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
            <Search />
            <Profile identification={1} />
          </div>
          
            {/* { choose === 0 ? (
              <div>
                <div className={ styles.container }>
                  <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Classrooms</h2>
                </div>
                <ClassroomList />
              </div>
            ) : choose === 1 ? (
              <ViewClassroom selected={selected}/>
            ) : (
              <ViewProject selected={selectedProj}/>
            )} */}
            
              <div>
                <div className={ styles.container }>
                  <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Your Templates</h2>
                </div>
                <TemplateList/>
              </div>
            
          
        </div>  

      </div>
    )
  }

  export default MDashboard;