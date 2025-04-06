import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      <div className={styles.toggleContainer}>
        <div className={`${styles.iconContainer} ${theme === 'dark' ? styles.active : ''}`}>
          <FaMoon className={styles.icon} />
        </div>
        <div className={`${styles.iconContainer} ${theme === 'light' ? styles.active : ''}`}>
          <FaSun className={styles.icon} />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
