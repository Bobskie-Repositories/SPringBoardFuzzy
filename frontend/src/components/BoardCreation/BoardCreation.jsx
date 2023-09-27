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

const BoardCreation = () => {
  const [selectedProject, setSelectedProject] = useState();

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
    <Sidebar setSelectedProject={setSelectedProject}/>

    <div>
      <div className={ styles.container } style={{gap: "150px"}}>
        <Search />
        <Profile identification={1} />
      </div>

      <div className={ styles.container }>

       
            <div className={styles.containersub}>
              <h2 className={`${global.brownText} ${styles.textMargin}`}>Create Board</h2>
              <h5 className={styles.textMargin}>Great! Let's get started on creating your new board.</h5>
        
              <Card className={styles.container_card}>
                <h5>Choose a template from the following predefined selection that best fits your idea:</h5>
                 
                <Card className={styles.container_board}>
                      <div>
                        <img 
                            className={styles.ideaicon} 
                            src={IdeaIcon} 
                            alt="IdeaIcon" 
                        />
                      </div>

                    <div className={styles.words}>
                      <h4>Board 1: Idea Venture</h4>
                      <p>Create and refine innovative ideas that can be turned into successful products, services, or businesses</p>
                    </div> 
                </Card>
              
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