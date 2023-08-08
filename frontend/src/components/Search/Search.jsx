import React from 'react';
import styles from "./Search.module.css";

const Search = ({ text, onChange }) => {
  return (
    <input
      type="text"
      className={ styles.Search }
      placeholder={ text } 
      onChange={onChange}
    />
  )
}

export default Search;