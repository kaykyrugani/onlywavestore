import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './InfoCard.module.css';

const InfoCard = ({ icon, text, highlightText }) => {
  return (
    <p className={styles.infoCard}>
      <FontAwesomeIcon icon={icon} className={styles.infoIcon} /> 
      {text} <br /> 
      <span className={styles.infoHighlight}>{highlightText}</span>
    </p>
  );
};

export default InfoCard;
