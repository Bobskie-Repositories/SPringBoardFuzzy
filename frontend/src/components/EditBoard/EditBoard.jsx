import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import global from '@assets/global.module.css'
import styles from './EditBoard.module.css'
import Header from '../Header/Header';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../UI/RichTextEditor/EditorToolBar';

const EditBoard = () => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/projectboards/${id}`);
                setTitle(response.data.title || '')
                setContent(response.data.content || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const getRandomDigit = () => Math.floor(Math.random() * 10) + 1;
    const feedback = "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
    const recommendation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    const references = "<ul><li>http://www.ecommerce-store-example.com</li><li>http://www.personal-blog-example.com</li><li>http://www.ecommerce-store-example.com</li></ul>"

    const updateProjectBoard = async () => {
        try {
    
            const response = await axios.patch(`http://127.0.0.1:8000/api/projectboards/${id}/update`, {
                title: title,
                content: content, // Use the content from the React Quill editor
                novelty: getRandomDigit(),
                capability: getRandomDigit(),
                technical_feasibility: getRandomDigit(),
                feedback: feedback,
                recommendation: recommendation,
                references: references,
            });
    
            navigate(`result`);
    
            console.log('ProjectBoard updated successfully:', response.data.id);
        } catch (error) {
            console.error('Error updating ProjectBoard:', error);
        }
    };
    
    

    // Handle changes in the React Quill editor
    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    if (!content) {
        return <p>Loading...</p>;
      }

    return (
        <div className={global.body}>
            <Header />
            <div className={styles.container}>
                <span className={styles.title}></span>

                <Card className={styles.cardContainer}>
                    <div className={styles.box} />

                    <div className={styles.containerStyle}>
                        <EditorToolbar />
                        <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleEditorChange} // Update content state
                        placeholder="Write something"
                        modules={modules}
                        formats={formats}
                        className={global.quill}
                        />
                    </div>
                </Card>

                <Button className={styles.button} onClick={updateProjectBoard}>
                    Submit
                </Button>
            </div>

        </div>
    )
}

export default EditBoard