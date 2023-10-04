import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../Header/Header';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import styles from './ResultBoard.module.css';
import CircularProgressWithLabel from '../UI/ProgressBar/CircularProgressWithLabel';

const ResultBoard = () => {

    const { id, templateid } = useParams();
    const [board, setBoard] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/projectboards/${templateid}`);
            setBoard(response.data);

            const project = await axios.get(`http://127.0.0.1:8000/api/project/${id}`);
            setProjectId(project.data.group_fk_id);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [templateid]);

    const onClickDashboard = () => {
        navigate(`/group/${projectId}`)
    }

    if (!board) {
        return <p>Loading...</p>;
    }

  return (
      <div className={styles.container}>
        <span className={styles.title}>Results</span>

        <div className={styles.resultContainer}>
            <div className={styles.criteria}>
                <Card className={ styles.cardCriteria } >
                    <h5 className={styles.ratings}>Novelty</h5>
                    <div className={styles.cardContent}  style={{ gap: '10px' }}>  
                        <CircularProgressWithLabel value={board.novelty * 10} size={80}/>
                    </div> 
                </Card>
                
                <Card className={ styles.cardCriteria }>
                    <h5 className={styles.ratings}>Technical Feasibility</h5>
                    <div className={styles.cardContent}>  
                        <CircularProgressWithLabel value={board.technical_feasibility * 10} size={80}/>
                    </div>
                </Card>

                <Card className={ styles.cardCriteria }>
                    <h5 className={styles.ratings}>Capability</h5>
                    <div className={styles.cardContent}>  
                        <CircularProgressWithLabel value={board.capability * 10} size={80}/>
                    </div>
                </Card>
            </div>

            <div className={styles.criteria} style={{marginTop: '40px'}}>
                <div className={styles.advice}>
                    <h4>Feedback</h4>
                    <div className={styles.content}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book.
                    </div>
                </div>
                <div className={styles.advice}>
                    <h4>Recommendations</h4>
                    <div className={styles.content}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book.
                    </div>
                </div>
            </div>

            <div>
                <h4>References</h4>
                <div className={styles.boxContent}>
                    <ul> http://www.ecommerce-store-example.com</ul>
                    <ul> http://www.personal-blog-example.com</ul>
                    <ul> http://www.ecommerce-store-example.com</ul> 
                </div>
            </div>

        </div>

        <Button className={styles.button} onClick={onClickDashboard}>
          Go to Dashboard
        </Button>
      </div>
  )
}

export default ResultBoard