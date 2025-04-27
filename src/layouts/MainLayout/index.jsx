import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.layout} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 