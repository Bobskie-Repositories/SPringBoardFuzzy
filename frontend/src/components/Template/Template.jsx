import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useRef } from "react";
import axios from "axios";

import Header from "../Header/Header";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, {
  modules,
  formats,
} from "../UI/RichTextEditor/EditorToolBar";
import styles from "./Template.module.css";
import global from "@assets/global.module.css";

const Template = () => {
  const { id, templateid } = useParams();
  const [template, setTemplate] = useState(null);
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Handle changes in the React Quill editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/template/${templateid}`
        );
        setTemplate(response.data);
        setContent(response.data.content || "");
      } catch (error) {
        console.error("Error fetching data:", error);
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

      const response = await axios.post(
        `http://127.0.0.1:8000/api/project/${id}/addprojectboards`,
        {
          title: template.title,
          content: content, // Use the content from the React Quill editor
          templateId: templateid,
          novelty: 0,
          capability: 0,
          technical_feasibility: 0,
          feedback: "s",
          recommendation: "s",
          references: "s",
          project_fk: id,
        }
      );
      console.log("Response from createProjectBoard:", response);

      // await axios.put(`http://127.0.0.1:8000/api/project/${id}/update_score`);

      navigate(`/project/${id}/create-board/${response.data.id}/result`);

      console.log("ProjectBoard created successfully:", response.data.id);
    } catch (error) {
      console.error("Error creating ProjectBoard:", error);
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
              className={global.quill}
            />
          </div>
        </Card>

        <Button className={styles.button} onClick={createProjectBoard}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Template;
