import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from '../components/Header/Header'
import ResultBoard from '../components/ResultBoard/ResultBoard'
import styles from '../components/ResultBoard/ResultBoard.module.css'
import Button from '../components/UI/Button/Button'
import global from '@assets/global.module.css'
import axios from 'axios'

const Result = () => {
    const { id, boardid } = useParams();
    const [projectId, setProjectID] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const project = await axios.get(`http://127.0.0.1:8000/api/project/${id}`);
            setProjectID(project.data.group_fk_id);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, [id]);

    const onClickDashboard = () => {
        navigate(`/group/${projectId}`)
    }

    return (
        <div className={global.body}>
            <Header />
            <ResultBoard id={id} boardid={boardid}/>
            <Button className={styles.button} onClick={onClickDashboard}>
                Go to Dashboard
            </Button>
        </div>
    )
}

export default Result