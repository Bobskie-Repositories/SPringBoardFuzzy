import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import global from '@assets/global.module.css';
import styles from './EditBoard.module.css';
import Header from '../Header/Header';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../UI/RichTextEditor/EditorToolBar';
import { Tiptap } from '../UI/RichTextEditor/TipTap';
import ModalCustom from '../UI/Modal/Modal';
import config from '../../config';
import Loading from '../UI/Loading/Loading';

const EditBoard = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [projectId, SetProjectId] = useState(null);
  const [priorDesireVal, setPriorDesireVal] = useState(null);
  const [priorFeasibilityVal, setPriorFeasiblityVal] = useState(null);
  const [priorViabilityVal, setPriorViabilityVal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/projectboards/${id}`);
        setTitle(response.data.title || '');
        setContent(response.data.content || '');
        setBoardId(response.data.boardId || '');
        SetProjectId(response.data.project_fk || '');

        setPriorDesireVal(response.data.desirability || 0);
        setPriorFeasiblityVal(response.data.feasibility || 0);
        setPriorViabilityVal(response.data.viability || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const updateProjectBoard = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.post(`${API_HOST}/api/projectboards/${id}/update`, {
        title: title,
        content: content, // Use the content from the React Quill editor
        desirability: priorDesireVal,
        viability: priorViabilityVal,
        feasibility: priorFeasibilityVal,
        feedback: 'error',
        recommendation: 'error',
        //references: "error",
        project_fk: projectId,
        boardId: boardId,
      });
      setIsModalOpen(false);
      navigate(`/board/${response.data.id}/edit/result`);
    } catch (error) {
      setIsModalOpen(false);
      console.error('Error updating ProjectBoard:', error);
    }
  };

  // Handle changes in the React Quill editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  if (!content) {
    return <p></p>;
  }

  return (
    <div className={global.body}>
      <Header />
      <div className={styles.container}>
        <span className={styles.title}> {title} </span>

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
        <Button className={styles.button} onClick={updateProjectBoard}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditBoard;
