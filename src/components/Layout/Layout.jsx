import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import styles from './Layout.module.css';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = ({ children, seo }) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HelmetProvider>
      <div className={styles.layout}>
        {seo}
        <Header />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Layout;
