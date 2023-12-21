import parse from "html-react-parser";
import styles from "./Tiptap.module.css";

const Details = ({ description }) => {
  return (
    <>
      <div className={styles.ProseMirror}>{parse(description)}</div>
    </>
  );
};

export default Details;
