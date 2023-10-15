import React from 'react'
import styles from './TemplateList.module.css';
import IdeaIcon from '@assets/idea.png';
import Card from '../UI/Card/Card';

const TemplateList = () => {
  return (
    <div  style={{padding: '20px 150px 20px 30px'}}>

      <div className={ styles.container }>   
                <Card className={styles.container_card} >
                  <div className={styles.scrollable}>
                 
                      <Card className={styles.container_board} >
                          <div>
                            <img 
                                className={styles.ideaicon} 
                                src={IdeaIcon} 
                                alt="IdeaIcon" 
                            />
                          </div>

                        <div className={styles.words}>
                          <h4>Idea Venture</h4>
                          <p>
                           Template Description
                          </p>
                        </div> 
                      </Card>
                  </div>
                </Card>
      </div>
      
  </div>
  )
}

export default TemplateList