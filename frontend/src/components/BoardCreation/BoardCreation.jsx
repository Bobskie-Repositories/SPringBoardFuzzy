import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import IdeaIcon from '@assets/idea.png';
import styles from './BoardCreation.module.css';
import global from '@assets/global.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import Profile from '../ProfileSegment/Profile';
import Button from '../UI/Button/Button';
import axios from 'axios';


const BoardCreation = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [allTemplate, setAllTemplate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/template/`);
        setAllTemplate(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!allTemplate) {
    return <p>Loading...</p>;
  }


  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
    <Sidebar setSelectedProject={setSelectedProject}/>

    <div>
      <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
        <Search />
        <Profile identification={1} />
      </div>

      <div className={ styles.container }>
   
            <div className={styles.containersub}>
              <h2 className={`${global.brownText} ${styles.textMargin}`}>Create Board</h2>
              <h5 className={styles.textMargin}>Great! Let's get started on creating your new board.</h5>
           
              <Card className={styles.container_card}>
                <h5>Choose a template from the following predefined selection that best fits your idea:</h5>
                 
                {allTemplate.map((template, index) => (
                  <Card className={styles.container_board}>
                      <div>
                        <img 
                            className={styles.ideaicon} 
                            src={IdeaIcon} 
                            alt="IdeaIcon" 
                        />
                      </div>

                    <div className={styles.words}>
                      <h4>{template.title}</h4>
                      <p>{template.description}</p>
                    </div> 
                  </Card>
                  
                ))}
              
              </Card>
            </div>
      
        <Button 
          style={{
            backgroundColor: '#9C7B16',
            height: '40px',
            marginTop: '40px',
            fontSize: '12px',
          }}
          > 
            Create Board
        </Button>
      </div>
      
    </div>  

  </div>
  );
}

export default BoardCreation;