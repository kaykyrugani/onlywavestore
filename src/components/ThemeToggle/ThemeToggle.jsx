import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      <FontAwesomeIcon 
        icon={theme === 'light' ? faMoon : faSun} 
        className={styles.icon}
      />
    </button>
  );
};

export default ThemeToggle;
