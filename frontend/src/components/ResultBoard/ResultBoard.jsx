import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Card from "../UI/Card/Card";
import styles from "./ResultBoard.module.css";
import CircularProgressWithLabel from "../UI/ProgressBar/CircularProgressWithLabel";

const ResultBoard = ({ boardid }) => {
  const [board, setBoard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projectboards/${boardid}`
        );
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [boardid]);

  if (!board) {
    return <p></p>;
  }

  // Function to parse references string into an array
  const parseReferences = (references) => {
    if (!references) return [];

    // Remove the first and last characters from the entire string
    // const trimmedReferencesString = references.slice(0, -1).trim();

    // Split the references string by ',' and trim spaces
    const referencesArray = references
      .split(",")
      .map((reference) => reference.trim());

    return referencesArray;
  };

  const referencesArray = parseReferences(board.references);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Results</span>

      <div className={styles.resultContainer}>
        <div className={styles.criteria}>
          <Card className={styles.cardCriteria}>
            <h5 className={styles.ratings}>Novelty</h5>
            <div className={styles.cardContent} style={{ gap: "10px" }}>
              <CircularProgressWithLabel value={board.novelty * 10} size={80} />
            </div>
          </Card>

          <Card className={styles.cardCriteria}>
            <h5 className={styles.ratings}>Technical Feasibility</h5>
            <div className={styles.cardContent}>
              <CircularProgressWithLabel
                value={board.technical_feasibility * 10}
                size={80}
              />
            </div>
          </Card>

          <Card className={styles.cardCriteria}>
            <h5 className={styles.ratings}>Capability</h5>
            <div className={styles.cardContent}>
              <CircularProgressWithLabel
                value={board.capability * 10}
                size={80}
              />
            </div>
          </Card>
        </div>

        <div className={styles.adviceDiv} style={{ marginTop: "40px" }}>
          <div className={styles.advice}>
            <h4>Feedback</h4>
            <div className={styles.content}>{board.feedback}</div>
          </div>
          <div className={styles.advice}>
            <h4>Recommendations</h4>
            <div className={styles.content}>{board.recommendation}</div>
          </div>
        </div>

        <div>
          <h4>References</h4>
          <div className={styles.boxContent}>
            {referencesArray.map((reference, index) => (
              <li key={index}>
                <a href={reference} target="_blank" rel="noopener noreferrer">
                  {reference}
                </a>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBoard;
