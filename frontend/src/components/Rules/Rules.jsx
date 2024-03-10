import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import Header from '../Header/Header';
import styles from './Rules.module.css';
import Button from '../UI/Button/Button';
import parse from 'html-react-parser';
import config from '../../config';

const Rules = () => {
  const navigate = useNavigate();
  const { id, templateid } = useParams();
  const [template, setTemplate] = useState(null);
  const { API_HOST } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/template/${templateid}`);
        setTemplate(response.data || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [templateid]);

  const onClickView = (id, templateid) => {
    navigate(`/project/${id}/create-board/${templateid}/template`);
  };

  if (!template) {
    return <p></p>;
  }

  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.container}>
        <h3 className={styles.textColor}>
          Before we proceed, please take note of the following guidelines for a successful
          evaluation of your idea.
        </h3>
        <h3>Techer's rules:</h3>
        <div> {parse(template.rules)} </div>

        <span className={styles.content}>
          We will now assess your idea based on the data you inputted. It's important that you
          provide accurate and honest information to ensure a proper evaluation of your idea. We
          will evaluate your idea based on the following criteria:
          <br />
          <br />
          <b>Desirability:</b> refers to how much people want the product and whether it meets their
          needs and desires.
          <br />
          <b>Feasibility:</b> refers to whether it is technically possible to create the product. If
          a product is not feasible to create, it will be difficult or impossible to bring it to
          market, regardless of how desirable it is to users or how financially viable it is.
          <br />
          <b>Viability:</b> refers to whether the product is financially sustainable. If a product
          is not financially viable, it will not be a sustainable business and will eventually fail,
          even if it is highly desirable to users and technically feasible to create.
        </span>
      </div>
      <Button className={styles.button} onClick={() => onClickView(id, templateid)}>
        Start
      </Button>
    </div>
  );
};

export default Rules;
