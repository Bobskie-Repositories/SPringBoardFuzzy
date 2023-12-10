import React from "react";
import styles from "./ScrollSnapItem.module.css";

const ScrollSnapItem = (props) => {
  const style = `${props.className} ${styles.item}`;
  return <div className={style}>{props.children}</div>;
};

export default ScrollSnapItem;
