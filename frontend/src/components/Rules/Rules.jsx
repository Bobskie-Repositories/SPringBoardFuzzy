import React from 'react'
import Header from '../Header/Header'
import styles from './Rules.module.css';
import Button from '../UI/Button/Button';
import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';


const Rules = () => {
  const navigate = useNavigate();
  const { id, templateid } = useParams();


  const onClickView = (id,templateid ) => {
      navigate(`/project/${id}/create-board/${templateid}/template`);
  }
  

  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <h3 className={styles.textColor}>Before we proceed, please take note of the following guidelines for a successful evaluation of your idea.</h3>

        <span className={styles.content}>
        Please note that this template can only be used once in a project. If you want to modify your board after creating it, you can edit or update the board accordingly. 

        We will now assess your idea based on the data you inputted. It's important that you provide accurate and honest information to ensure a proper evaluation of your idea. We will evaluate your idea based on the following criteria:
        Capability: The potential of your idea to address the problem or need you identified
        Novelty: The level of originality or uniqueness of your idea
        Technical Feasibility: The feasibility of your idea from a technical perspective, including its scalability, sustainability, and viability

        Please input your data carefully, as this will determine the outcome of your assessment.

        </span>
      
      </div>
      <Button className={styles.button}  onClick={() => onClickView(id, templateid)}>
        Start
      </Button>
    </div>
  )
}

export default Rules