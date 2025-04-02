import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/homeindex';
import ProductsPage from '../pages/produtos';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Adicione a rota para a página de produtos */}
          <Route path="/produtos/:categoria" element={<ProductsPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
<div className='Logo'>
    <img src="/path/to/logo.png" alt="Logo Only Wave" />
</div>