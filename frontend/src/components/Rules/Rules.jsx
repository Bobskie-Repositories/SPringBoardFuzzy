import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import Header from '../Header/Header'
import styles from './Rules.module.css';
import Button from '../UI/Button/Button';


const Rules = () => {
  const navigate = useNavigate();
  const { id, templateid } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/template/${templateid}`);
        setTemplate(response.data || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [templateid]);

  const onClickView = (id,templateid ) => {
      navigate(`/project/${id}/create-board/${templateid}/template`);
  }

  if (!template) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <h3 className={styles.textColor}>Before we proceed, please take note of the following guidelines for a successful evaluation of your idea.</h3>

        <span className={styles.content}> 

        We will now assess your idea based on the data you inputted. It's important that you provide accurate and honest information to ensure a proper evaluation of your idea. We will evaluate your idea based on the following criteria:
        <br/>
        <br/>
        <b>Capability:</b> The potential of your idea to address the problem or need you identified
        <br/>
        <b>Novelty:</b> The level of originality or uniqueness of your idea
        <br/>
        <b>Technical Feasibility:</b> The feasibility of your idea from a technical perspective, including its scalability, sustainability, and viability

        Please input your data carefully, as this will determine the outcome of your assessment.

        {/* <h3>Techer's rules:</h3>
        {template.rules} */}

        </span>
      
      </div>
      <Button className={styles.button}  onClick={() => onClickView(id, templateid)}>
        Start
      </Button>
    </div>
  )
}

export default Rules