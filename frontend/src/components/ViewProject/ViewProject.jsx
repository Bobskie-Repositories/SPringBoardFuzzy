import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Board from '../Boards/Board';


const ViewProject = ({selected}) => {

    const { id } = useParams();



    return (
        <div >
            <Board selected={selected} />
        </div>
    )
}

export default ViewProject