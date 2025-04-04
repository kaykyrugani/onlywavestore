import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ 
  title, 
  linkText, 
  linkUrl, 
  className = '' 
}) => {
  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>
      {linkText && linkUrl && (
        <Link to={linkUrl} className={styles.seeMoreLink}>
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
