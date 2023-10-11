  import React from 'react'
  import { useState, useEffect } from 'react';
  import { useParams } from 'react-router';
  import T_Sidebar from '../../Sidebar/T_Sidebar';
  import Search from '../../Search/Search';
  import Profile from '../../ProfileSegment/Profile';
  import ClassroomList from '../../Classroom/ClassroomList';
  import ViewClassroom from '../../Classroom/ViewClassroom';
  import ViewProject from '../../ViewProject/ViewProject';
  import Button from '../../UI/Button/Button';
  import styles from './MDashboard.module.css';


  const MDashboard = ({ choose }) => {
    const [selected, setSelected] = useState();
    const [selectedProj, setSelectedProj] = useState();
    const { id, groupid } = useParams();

    useEffect(() => {
      setSelected(id);
    }, [selected, id]);

    const handleCreateBoardClick = () => {
      
    };

    return (
      <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
        <T_Sidebar setSelected={setSelected} choose={choose} setSelectedProj={setSelectedProj}/>
        
        <div>
          <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
            <Search />
            <Profile identification={1} />
          </div>
          
          <div className={ styles.container }>
            { choose === 0 ? (
              <ClassroomList />
            ) : choose === 1 ? (
              <ViewClassroom selected={selected}/>
            ) : (
              <ViewProject selected={selectedProj}/>
            )}
            <Button 
              className={styles.butName}
              onClick={handleCreateBoardClick}
              > 
                  Create Template
            </Button>
          </div>
          


        </div>  

      </div>
    )
  }

  export default MDashboard;