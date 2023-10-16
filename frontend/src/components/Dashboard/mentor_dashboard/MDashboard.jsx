  import React from 'react'
  import { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router';
  import Button from '../../UI/Button/Button';
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
    const navigate = useNavigate()

    useEffect(() => {
      setSelected(id);
    }, [selected, id]);

    const handleCreateTemplateClick = () => {
      navigate('/add-template')
    }

    return (
      <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>

        <T_Sidebar setSelected={setSelected} choose={choose} setSelectedProj={setSelectedProj} />

        <div>
          <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
            <Search />
            <Profile identification={1} />
          </div>
          <div>
            { choose === 0 ? (
              <div>
                <div className={ styles.container }>
                  <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Classrooms</h2>
                </div>
                <ClassroomList />
              </div>
            ) : choose === 1 ? (

              <ViewClassroom selected={selected}/>

            ) : choose === 2 ? (

              <ViewProject selected={selectedProj}/>

            ) : (

              <div>
                <div className={ styles.container }>
                  <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Your Templates</h2>
                  <Button 
                    className={styles.butName}
                    onClick={handleCreateTemplateClick}
                    > 
                        Create Template
                  </Button>
                </div>
                <TemplateList />
              </div>

            )}
          </div>
        </div>  

      </div>
    )
  }

  export default MDashboard;