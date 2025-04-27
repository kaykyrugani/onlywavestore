import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CarrinhoProvider>
            <CartProvider>
              <AppRoutes />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--background-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)'
                  }
                }}
              />
            </CartProvider>
          </CarrinhoProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
