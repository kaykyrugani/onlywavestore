import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from "../Header";
import Footer from "../Footer";
import styles from './Layout.module.css';

const Layout = ({ children, seo }) => {
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
