import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Card from "../UI/Card/Card";
import styles from "./ResultBoard.module.css";
import CircularProgressWithLabel from "../UI/ProgressBar/CircularProgressWithLabel";
import config from "../../config";
import convertToLinguisticVariable from "../../FuzzyLogic";

const ResultBoard = ({ boardid }) => {
  const [board, setBoard] = useState(null);
  const [template, setTemplate] = useState(null);
  const navigate = useNavigate();
  const { API_HOST } = config;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/projectboards/${boardid}`);
        setBoard(response.data);
        const template = await axios.get(`${API_HOST}/api/template/${response.data.templateId}`);
        setTemplate(template.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [boardid]);

  if (!board || !template) {
    return <p></p>;
  }

  const recommendationLines = board.recommendation.split("\n");
  const feedbackLines = board.feedback.split("\n");

  return (
    <div className={styles.container}>
      <span className={styles.title}>Results</span>

      <div className={styles.resultContainer}>
        <div className={styles.criteria}>
          <Card className={styles.outputCriteria}>
            {board.feasibility === -1 && board.viability === -1 ? (
              <>
                <h2
                  className={getClassNameForOutput(
                    convertToLinguisticVariable(board.output_metric, "desirability")
                  )}
                >
                  {convertToLinguisticVariable(board.output_metric, "output")}
                </h2>
                <CircularProgressWithLabel size={100} value={board.desirability} />
                <h4 className={styles.ratingsOutput}>{template.desirability}</h4>
              </>
            ) : (
              <>
                <h2
                  className={getClassNameForOutput(
                    convertToLinguisticVariable(board.output_metric, "output")
                  )}
                >
                  {convertToLinguisticVariable(board.output_metric, "output")}
                </h2>
                <CircularProgressWithLabel size={100} value={board.output_metric} />
                <h4 className={styles.ratingsOutput}>{template.exp_output}</h4>
              </>
            )}
          </Card>
        </div>

        <div className={styles.criteria}>
          {board.desirability != -1 && board.feasibility != -1 && board.viability != -1 && (
            <Card className={styles.cardCriteria}>
              <h5 className={styles.ratings}>Desirability</h5>
              <div className={styles.cardContent} style={{ gap: "10px" }}>
                <CircularProgressWithLabel value={board.desirability} size={80} />
              </div>
            </Card>
          )}
          {board.feasibility != -1 && (
            <Card className={styles.cardCriteria}>
              <h5 className={styles.ratings}>Feasibility</h5>
              <div className={styles.cardContent}>
                <CircularProgressWithLabel value={board.feasibility} size={80} />
              </div>
            </Card>
          )}
          {board.viability != -1 && (
            <Card className={styles.cardCriteria}>
              <h5 className={styles.ratings}>Viability</h5>
              <div className={styles.cardContent}>
                <CircularProgressWithLabel value={board.viability} size={80} />
              </div>
            </Card>
          )}
        </div>

        <div className={styles.adviceDiv} style={{ marginTop: "40px" }}>
          <div className={styles.advice}>
            <h4>Feedback</h4>
            <div className={styles.content}>
              {feedbackLines.map((line, index) => (
                <p key={index} style={{ margin: 0, padding: 0 }}>
                  {line}
                  {index % 2 === 0 ? <br /> : null}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.advice}>
            <h4>Recommendations</h4>
            <div className={styles.content}>
              {recommendationLines.map((line, index) => (
                <p key={index} style={{ margin: 0, padding: 0 }}>
                  {line}
                  {index % 2 === 0 ? <br /> : null}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

function getClassNameForOutput(output) {
  switch (output) {
    case "Very Low":
    case "Low":
      return styles.red;
    case "Medium":
      return styles.black;
    case "High":
    case "Very High":
      return styles.green;
    default:
      return ""; // Default class if the output doesn't match any case
  }
}

export default ResultBoard;
