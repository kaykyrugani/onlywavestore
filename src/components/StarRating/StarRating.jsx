import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import styles from './StarRating.module.css';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={fasStar} className={styles.starFilled} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={farStar} className={styles.starEmpty} />
        );
      }
    }

    return stars;
  };

  return (
    <div className={styles.starRating} role="text" aria-label={`Avaliação: ${rating} de 5 estrelas`}>
      {renderStars()}
    </div>
  );
};

export default StarRating; 