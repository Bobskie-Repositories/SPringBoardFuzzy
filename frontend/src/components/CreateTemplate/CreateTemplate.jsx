import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import styles from "./CreateTemplate.module.css";
import global from "@assets/global.module.css";
import Header from "../Header/Header";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import EditorToolbar, {
  modules,
  formats,
} from "../UI/RichTextEditor/EditorToolBar";

const CreateTemplate = () => {
  const [rulesContent, setRulesContent] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [title, setTitle] = useState("Unknown");
  const [description, setDescription] = useState(""); // Add description state
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [savedRulesContent, setSavedRulesContent] = useState(""); // Store the rulesContent
  const { getUser } = useAuth();
  const navigate = useNavigate();

  const handleRulesEditorChange = (newContent) => {
    setRulesContent(newContent);
  };

  const handleTemplateEditorChange = (newContent) => {
    setTemplateContent(newContent);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= 150) {
      setDescription(newDescription);
    } else {
      setDescription(newDescription.slice(0, 150));
    }
  };

  const toggleTitleEdit = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (title.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Title cannot be empty",
          text: "Please enter a title or click outside the input to cancel editing.",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setTitle("Unknown");
          }
        });
      } else {
        toggleTitleEdit();
      }
    }
  };

  const topRef = useRef();

  const handleNextClick = () => {
    setIsNext(true);
    setSavedRulesContent(rulesContent);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackClick = () => {
    setIsNext(false);
    setRulesContent(savedRulesContent);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const submitTemplate = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/template/add`,
        {
          title: title,
          content: templateContent,
          rules: rulesContent,
          description: description,
          isActive: true,
        }
      );

      navigate(`/admin`);
      console.log("Template created successfully:", response.data.id);
    } catch (error) {
      console.error("Error creating Template:", error);
    }
  };

  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <span id="top" ref={topRef} className={styles.title}>
          {isTitleEditable ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={toggleTitleEdit}
              onKeyDown={handleTitleKeyDown}
              className={styles.input}
            />
          ) : (
            <span onClick={toggleTitleEdit}>{title}</span>
          )}
        </span>
        <hr className={styles.horizontalLine} />

        {!isNext ? (
          <>
            <span className={styles.title}>Short Description</span>
            <span className={styles.rightmostCount}>
              {description.length} / 150
            </span>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className={styles.inputBox}
              placeholder="Write a description"
            />
            <span className={styles.title}>Rules</span>
            <Card className={styles.cardContainer}>
              <div className={styles.box} />
              <div className={styles.containerStyle}>
                <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  value={rulesContent}
                  onChange={handleRulesEditorChange}
                  placeholder="Write something"
                  modules={modules}
                  formats={formats}
                  className={global.quill}
                />
              </div>
            </Card>
            <Button className={styles.button} onClick={handleNextClick}>
              Next
            </Button>
          </>
        ) : (
          <>
            <span className={styles.title}>Content</span>
            <Card className={styles.cardContainer}>
              <div className={styles.box} />
              <div className={styles.containerStyle}>
                <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  value={templateContent}
                  onChange={handleTemplateEditorChange}
                  placeholder="Write something"
                  modules={modules}
                  formats={formats}
                  className={global.quill}
                />
              </div>
            </Card>
            <div className={styles.btmButton}>
              <Button className={styles.button} onClick={handleBackClick}>
                Back
              </Button>
              <Button className={styles.button} onClick={submitTemplate}>
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;
