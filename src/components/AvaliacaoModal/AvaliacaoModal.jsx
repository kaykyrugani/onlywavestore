import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faTimes, faCloud, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import styles from './AvaliacaoModal.module.css';

const AvaliacaoModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment, image });
    setRating(0);
    setComment('');
    setImage(null);
    setImagePreview('');
    onClose();
  };

  const renderStars = () => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      const filled = i <= rating;
      stars.push(
        <span
          key={i}
          className={styles.star}
          onMouseEnter={() => setRating(i)}
          onClick={() => setRating(i)}
        >
          <FontAwesomeIcon
            icon={filled ? fasStar : farStar}
            className={filled ? styles.starFilled : styles.starEmpty}
          />
        </span>
      );
    }

    return stars;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className={styles.modalTitle}>Avaliar Produto</h2>

        <form onSubmit={handleSubmit} className={styles.avaliacaoForm}>
          <div className={styles.starsContainer}>
            {renderStars()}
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment">Comentário</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte sua experiência com o produto..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <h5 className={styles.uploadTitle}>Escolher Imagem</h5>
            <label htmlFor="image" className={styles.uploadLabel}>
              <div className={styles.uploadIcon}>
                <FontAwesomeIcon icon={faCloud} className={styles.cloudIcon} />
                <FontAwesomeIcon icon={faArrowUp} className={styles.arrowIcon} />
              </div>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </label>
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvaliacaoModal; 