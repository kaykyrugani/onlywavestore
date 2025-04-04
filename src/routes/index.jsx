import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/homeindex';
import ProductsPage from '../pages/produtos';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Redirecionar /produtos/ para uma categoria padrão */}
          <Route path="/produtos/" element={<Navigate to="/produtos/tenis" replace />} />
          {/* Rota para páginas de produtos com categoria */}
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