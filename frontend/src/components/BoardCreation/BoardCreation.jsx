import React from 'react';
import Card from '../UI/Card/Card';
import IdeaIcon from '@assets/idea.png';
import styles from './BoardCreation.module.css';
import global from '@assets/global.module.css';

const BoardCreation = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${global.brownText} ${styles.textMargin}`}>Create Board</h2>
      <h5 className={styles.textMargin}>Great! Let's get started on creating your new board.</h5>

      <Card className={styles.container_card}>
        <h5>Choose a template from the following predefined selection that best fits your idea:</h5>
         
        <Card className={styles.container_board}>
              <img 
                  className={styles.ideaicon} 
                  src={IdeaIcon} 
                  alt="IdeaIcon" 
              />

            <div>
              <h3>Board 1: Idea Venture</h3>
              <p>Create and refine innovative ideas that can be turned into successful products, services, or businesses</p>
            </div> 
        </Card>
      
      </Card>

    </div>
  );
}

export default BoardCreation;