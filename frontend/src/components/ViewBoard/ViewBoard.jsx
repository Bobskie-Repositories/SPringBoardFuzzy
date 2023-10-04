import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './ViewBoard.module.css';
import Header from '../Header/Header';
import ResultBoard from '../ResultBoard/ResultBoard';
import Button from '../UI/Button/Button';
import parse from 'html-react-parser';
import axios from 'axios';
import global from '@assets/global.module.css'

const ViewBoard = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [contents, setContents] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projectboards/${id}`);
        setContents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
}, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={global.body}>
      <Header />
      
      <div className={global.body}>
        <div style={{width: '70rem'}}>
          <h2>Title</h2>
          <div className={styles.tabsContainer}>

            <div
              className={`${styles.tab} ${activeTab === 'results' ? styles.active : ''}`}
              onClick={() => handleTabClick('results')}
            >
              Result
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
              onClick={() => handleTabClick('details')}
            >
              Details
            </div>

          </div>

          <div className={styles.tabContent}>
            {activeTab === 'results' && (
              <>
                <div className={styles.tabHeader}>
                  <p>Result</p>
                </div>
                <div>
                  <ResultBoard boardid={id}/>
                </div>
              </>
            )}
            {activeTab === 'details' && (
              <>
                <div className={styles.tabHeader}> 
                  <p>{contents.title}</p>
                </div>
                <div>
                  {parse(contents.content)}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.btmButton}>
          <Button className={styles.button}>
            Improve Result
          </Button>
          <Button className={styles.button} style={{backgroundColor: '#8A252C'}}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewBoard;
