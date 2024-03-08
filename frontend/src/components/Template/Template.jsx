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
import Details from '../UI/RichTextEditor/Details';
import { Tiptap } from '../UI/RichTextEditor/TipTap';
import styles from './Template.module.css';
import global from '@assets/global.module.css';
import ModalCustom from '../UI/Modal/Modal';
import config from '../../config';
import Loading from '../UI/Loading/Loading';

const Template = () => {
  const { id, templateid } = useParams();
  const [template, setTemplate] = useState(null);
  const [description, setDescription] = useState('');
  const editor = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const { API_HOST } = config;
  const navigate = useNavigate();

  // Handle changes in the React Quill editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/template/${templateid}`);
        setTemplate(response.data);
        setContent(response.data.content || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [templateid]);

  const createProjectBoard = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.post(`${API_HOST}/api/project/${id}/addprojectboards`, {
        title: template.title,
        content: content, // Use the content from the React Quill editor
        templateId: templateid,
        desirability: 0,
        viability: 0,
        feasibility: 0,
        feedback: 's',
        recommendation: 's',
        //references: "s",
        project_fk: id,
      });
      navigate(`/project/${id}/create-board/${response.data.id}/result`);
    } catch (error) {
      console.error('Error creating ProjectBoard:', error);
    }
    setIsModalOpen(false);
  };

  if (!template) {
    return <p></p>;
  }

  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <span className={styles.title}>{template.title}</span>

        <Card className={styles.cardContainer}>
          <div className={styles.box} />

          <div className={styles.containerStyle}>
            {/* <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleEditorChange} // Update content state
              placeholder="Write something"
              modules={modules}
              formats={formats}
              className={global.quill}
            /> */}
            <Tiptap setDescription={setContent} value={content} />
          </div>
        </Card>

        {isModalOpen && (
          <ModalCustom width={200} isOpen={isModalOpen}>
            <Loading timeout="auto" style={{ height: 'auto' }} />
          </ModalCustom>
        )}

        <Button className={styles.button} onClick={createProjectBoard}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Template;
