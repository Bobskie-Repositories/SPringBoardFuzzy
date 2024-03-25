import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import styles from "./EditTemplate.module.css";
import global from "@assets/global.module.css";
import Header from "../Header/Header";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import EditorToolbar, { modules, formats } from "../UI/RichTextEditor/EditorToolBar";
import { Tiptap } from "../UI/RichTextEditor/TipTap";
import Loading from "../UI/Loading/Loading";
import config from "../../config";

const EditTemplate = () => {
  const [template, setTemplate] = useState();
  const [rulesContent, setRulesContent] = useState(sessionStorage.getItem("rulesContent") || "");
  const [templateContent, setTemplateContent] = useState(
    sessionStorage.getItem("templateContent") || ""
  );
  const [oldTitle, setOldTitle] = useState();
  const [title, setTitle] = useState(sessionStorage.getItem("title") || "");
  const [description, setDescription] = useState(sessionStorage.getItem("description") || "");
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [savedRulesContent, setSavedRulesContent] = useState(""); // Store the rulesContent
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/template/${id}`);
        setTemplate(response.data);
        if (!title && !description && !rulesContent && !templateContent) {
          setTitle(response.data.title);
          setRulesContent(response.data.rules);
          setDescription(response.data.description);
          setTemplateContent(response.data.content);
        }

        setOldTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate(`/admin`);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("rulesContent", rulesContent);
    sessionStorage.setItem("templateContent", templateContent);
  }, [title, description, rulesContent, templateContent]);

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
      if (title === "Enter title") {
        Swal.fire({
          title: "Please enter a correct title.",
          icon: "error",
          confirmButtonColor: "#9c7b16",
        });
      } else if (description === "") {
        Swal.fire({
          title: "Please enter the description",
          icon: "error",
          confirmButtonColor: "#9c7b16",
        });
      } else if (rulesContent === "") {
        Swal.fire({
          title: "Please enter the rules.",
          icon: "error",
          confirmButtonColor: "#9c7b16",
        });
      } else if (templateContent === "") {
        Swal.fire({
          title: "Please enter the template contents.",
          icon: "error",
          confirmButtonColor: "#9c7b16",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title:
            '<span style="font-size: 20px">Are you sure you want to update this template?</span>',
          showCancelButton: true,
          cancelButtonText: "Cancel",
          cancelButtonColor: "rgb(181, 178, 178)",
          confirmButtonText: "Proceed",
          confirmButtonColor: "#9c7b16",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.patch(`${API_HOST}/api/template/${id}/update`, {
              title: title,
              content: templateContent,
              rules: rulesContent,
              description: description,
              teacher_fk: template.teacher_fk,
            });
            Swal.fire({
              title: "Template Updated",
              icon: "success",
              confirmButtonColor: "#9c7b16",
            });
            navigate(`/admin`);
          }
        });
      }
      console.log("Template updated successfully");
    } catch (error) {
      console.error("Error updating Template:", error);
    }
  };

  const showDeleteProjectModal = async () => {
    Swal.fire({
      icon: "warning",
      title: '<span style="font-size: 20px">Are you sure you want to delete?</span>',
      html: '<span style="font-size: 15px">This will delete this template permanently. You cannot undo this action.</span>',
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#8A252C",
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgb(181, 178, 178)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_HOST}/api/template/${id}/delete`);
        Swal.fire({
          title: '<span style="font-size: 20px">Template Sucessfully Deleted</span>',
          icon: "success",
          confirmButtonColor: "#9c7b16",
          confirmButtonText: "OK",
        });
        navigate("/admin");
      }
    });
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
            <span className={styles.rightmostCount}>{description.length} / 150</span>
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
                {/* <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  value={rulesContent}
                  onChange={handleRulesEditorChange}
                  placeholder="Write something"
                  modules={modules}
                  formats={formats}
                  className={global.quill}
                /> */}
                {/* <Tiptap setDescription={setRulesContent} value={rulesContent} /> */}
                {rulesContent ? (
                  <Tiptap setDescription={setRulesContent} value={rulesContent} />
                ) : (
                  <Loading />
                )}
              </div>
            </Card>
            <div className={styles.btmButton}>
              <Button className={styles.buttonR} onClick={showDeleteProjectModal}>
                Delete
              </Button>
              <Button className={styles.buttonG} onClick={handleNextClick}>
                Next
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className={styles.title}>Content</span>
            <Card className={styles.cardContainer}>
              <div className={styles.box} />
              <div className={styles.containerStyle}>
                {/* <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  value={templateContent}
                  onChange={handleTemplateEditorChange}
                  placeholder="Write something"
                  modules={modules}
                  formats={formats}
                  className={global.quill}
                /> */}
                <Tiptap setDescription={setTemplateContent} value={templateContent} />
              </div>
            </Card>
            <div className={styles.btmButton}>
              <Button className={styles.buttonR} onClick={showDeleteProjectModal}>
                Delete
              </Button>
              <Button className={styles.buttonG} onClick={handleBackClick}>
                Back
              </Button>
              <Button className={styles.buttonG} onClick={submitTemplate}>
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditTemplate;
