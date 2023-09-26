import React from 'react'
import styles from './Board.module.css';
import Card from '../UI/Card/Card';
import IdeaIcon from '@assets/idea.png';
import Button from '../UI/Button/Button';
import { useEffect, useState } from 'react';
import CircularProgressWithLabel from '../UI/ProgressBar/CircularProgressWithLabel';

function Board( {selectedProject} ) {
  const [boards, setBoards] = useState([])
  const [project, setProject] = useState()
  const progressValue = 50;
  
  useEffect(() => {
    if (selectedProject !== null && selectedProject !== undefined) {
      fetch('http://127.0.0.1:8000/api/project/' + selectedProject + '/projectboards')
        .then((response) => response.json())
        .then((boards) => setBoards(boards));

      fetch('http://127.0.0.1:8000/api/project/' + selectedProject )
        .then((response) => response.json())
        .then((project) => {
          setProject(project);
        });
    }
  }, [selectedProject]);


  return (
    <div>
      {project ? ( // Check if project is not null or undefined
      <>
        <h2 style={{ fontSize: "30px", color: '#9c7b16' }}>{project.name} Boards</h2>
        {/* Render other project information here */}
      </>
    ) : (
      // Render a loading message or handle the case when project is not available
      <p>Loading...</p>
    )}
        {
          boards.map (board => {
            return (
              <div key={board.id}>
                <Card className={ styles.card }>
                  <div className={styles.container}>
                    <div className={styles.subcontainer}>
                      <img 
                          className={styles.ideaicon} 
                          src={IdeaIcon} 
                          alt="IdeaIcon" 
                      />
                    </div>

                    <div > 
                      <h3>Board: {board.title}</h3>
                      <div className={styles.cards}>
                        
                        <Card className={ styles.smallCard }>
                          <h5 className={styles.ratings}>Novelty</h5>
                          <div className={styles.cardContent}>  
                            <CircularProgressWithLabel value={progressValue} />
                          </div>
                        </Card>
                        
                     
                        <Card className={ styles.smallCard }>
                          <h5 className={styles.ratings}>Capability</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel value={progressValue} />
                          </div>
                        </Card>
                       
                      
                        <Card className={ styles.smallCard }>
                          <h5 className={styles.ratingstech}>Technical Feasibility</h5>
                          <div className={styles.cardContent}>
                            <CircularProgressWithLabel value={progressValue} />
                          </div>
                        </Card>
                    
                        <Button className={ styles.viewbutton }>
                          View Board
                        </Button>
                        
                      </div>
                      
                    </div>
     
                  </div>            
                </Card>
              </div>
            );
          })

        }
        
    </div>
  )
}

export default Board