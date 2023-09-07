import React from "react";
import NoResults from "../assets/not-found.png";
import styles from "../styles/module.css";
import Asset from "../components/Asset";

const NotFound = () => {
  return (
    <div 
    className={styles.image}>
    <Asset src={NoResults}
    message="Sorry, the page you're looking for doesn't exist..."/>
    NotFound</div>
  )
};

export default NotFound;