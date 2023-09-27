import React from 'react';
import Header from '../Header/Header';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import global from '@assets/global.module.css';
import styles from './Template.module.css';


const Template = () => {
  return (
    <div className={styles.body}>
        <Header />

        <div className={styles.container}>

          <span className={styles.title}>Board</span>

          <Card className={styles.cardContainer}>
            <div className={styles.box}/>

            <div className={styles.contents}>
                Hi
            </div>
          </Card>

          <Button className={styles.button}>
            Submit
          </Button>
        </div>

    </div>
  )
}

export default Template;