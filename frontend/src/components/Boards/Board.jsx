import React from 'react'
import styles from './Board.module.css';
import Card from '../UI/Card/Card';
import IdeaIcon from '@assets/idea.png';
import { useEffect, useState } from 'react';


function Board( {selectedProject} ) {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    if (selectedProject !== null && selectedProject !== undefined) {
      fetch('http://127.0.0.1:8000/api/project/' + selectedProject + '/projectboards')
        .then((response) => response.json())
        .then((boards) => setBoards(boards));
    }
  }, [selectedProject]);


  return (
    <div>
        {
          boards.map (board => {
            return (
              <div key={board.id}>
                <Card className={ styles.card }>
                  <div className={styles.container}>
                    <h3>Board: {board.title}</h3>
                    <div className={styles.subcontainer}>
                    <img 
                        className={styles.ideaicon} 
                        src={IdeaIcon} 
                        alt="IdeaIcon" 
                    />         
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