import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useRef } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../UI/RichTextEditor/EditorToolBar';
import styles from './Template.module.css';

const Template = () => {
  const { id, templateid } = useParams();
  const [template, setTemplate] = useState(null);
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const feedback = "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
  const recommendation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  const references = "<ul><li>http://www.ecommerce-store-example.com</li><li>http://www.personal-blog-example.com</li><li>http://www.ecommerce-store-example.com</li></ul>"

  // Handle changes in the React Quill editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/template/${templateid}`);
        setTemplate(response.data);
        setContent(response.data.content || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [templateid]);

  const createProjectBoard = async () => {
    try {
      const getCurrentTimestamp = () => {
        const now = new Date();
        const isoTimestamp = now.toISOString();
        return isoTimestamp;
      };

      const response = await axios.post(`http://127.0.0.1:8000/api/project/${templateid}/addprojectboards`, {
        title: template.title,
        content: content, // Use the content from the React Quill editor
        novelty: 5,
        capability: 4,
        technical_feasibility: 3,
        feedback: feedback,
        recommendation: recommendation,
        references: references,
        project_fk: id,
        created_at: getCurrentTimestamp(),
        deleted_at: getCurrentTimestamp()
      });

      navigate(`/project/${id}/create-board/${response.data.id}/result`)
      

      console.log('ProjectBoard created successfully:', response.data.id);
    } catch (error) {
      console.error('Error creating ProjectBoard:', error);
    }
  };

  if (!template) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <span className={styles.title}>{template.title}</span>

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
            />
          </div>
          {content}
        </Card>

        <Button className={styles.button} onClick={createProjectBoard}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Template;
