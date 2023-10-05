import React from 'react'
import Header from '../Header/Header'
import ResultBoard from '../ResultBoard/ResultBoard'
import Button from '../UI/Button/Button'
import global from '@assets/global.module.css'
import { useParams, useNavigate } from 'react-router'

const Edit_Result = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const goBack = () =>{
        navigate(`/board/${id}`)
    }

    return (
        <div className={global.body}>
            <Header />
            <ResultBoard boardid={id}/>
            <Button className={global.button} style={{fontSize: '13px'}} onClick={goBack}>
                Back
            </Button>
    </div>
    )
}

export default Edit_Result