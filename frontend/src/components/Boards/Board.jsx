import React from 'react'
import styles from './Board.module.css';
import Card from '../UI/Card/Card';
import IdeaIcon from '@assets/idea.png';

function Board() {
  return (
    <div>
        <h2 style={{fontSize: "30px", color: '#9c7b16'}}>Boards</h2>

        <Card className={ styles.card }>

          <div className={styles.container}>
            <h3>Board: Ideation Venture</h3>
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
  )
}

export default Board