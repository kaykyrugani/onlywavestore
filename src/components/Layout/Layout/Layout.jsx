import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
}; 