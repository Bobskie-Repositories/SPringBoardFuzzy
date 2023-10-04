import React from 'react'
import Header from '../components/Header/Header'
import ResultBoard from '../components/ResultBoard/ResultBoard'
import global from '@assets/global.module.css'

const Result = () => {
    return (
        <div className={global.body}>
            <Header />
            <ResultBoard />
        </div>
    )
}

export default Result