import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Alternar tema"
    >
      <div className="toggle-icons">
        <FaSun className="sun-icon" />
        <FaMoon className="moon-icon" />
      </div>
    </button>
  );
} 