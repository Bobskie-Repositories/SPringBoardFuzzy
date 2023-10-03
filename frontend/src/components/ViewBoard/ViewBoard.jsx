import React, { useState } from 'react';
import styles from './ViewBoard.module.css';
import Header from '../Header/Header';

const ViewBoard = () => {
  const [activeTab, setActiveTab] = useState('results');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.body}>
      <Header />
      
      <div className={styles.container}>
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
            <div className={styles.tabHeader}>
              <p>Result</p>
            </div>
          )}
          {activeTab === 'details' && (
            <div className={styles.tabHeader}> 
              <p>Details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBoard;
