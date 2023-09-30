import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import { useRef } from "react";
import styles from './Template.module.css';
import { useParams } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../UI/RichTextEditor/EditorToolBar';


const Template = () => {
  const { id, projectid, templateid } = useParams();
  const [template, setTemplate] = useState(null);

  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/template/' + templateid)
      .then((response) => response.json())
      .then((template) => setTemplate(template));
  }, [templateid]);

  useEffect(() => {
    // Set the content state with template.content only once when template is fetched
    if (template) {
      setContent(template.content);
    }
  }, [template]);


  if (!template) {
    return <p>Loading...</p>;
  }

  // Define a CSS style object for the container div
  const containerStyle = {
    minHeight: '300px', // Adjust the minimum height as needed
  };

  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <span className={styles.title}>{template.title}</span>

        <Card className={styles.cardContainer}>
          <div className={styles.box} />

            <div style={containerStyle}>

            {/* <ReactQuill theme="snow" value={content} onChange={(newContent) => setContent(newContent)} />;   */}
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={template.content}
              // onChange={(newContent) => setContent(newContent)}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
            />
            
          </div>
          {content}
        </Card>

        <Button className={styles.button}>Submit</Button>
      </div>
    </div>
  );
};

export default Template;
