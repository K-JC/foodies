import React from "react";
import NoResults from "../assets/not-found.png";
import styles from "../styles/NotFound.module.css";
import Asset from "../components/Asset";

const NotFound = () => {
  return (
    <div 
    className={styles.image}>
    <Asset src={NoResults}
    message="Sorry, the page you're looking for doesn't exist..."/>
   </div>
  )
};

export default NotFound;