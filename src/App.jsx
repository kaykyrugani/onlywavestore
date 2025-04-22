import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import CartModal from './components/CartModal';
import CartButton from './components/CartButton';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
            <CartButton />
            <CartModal />
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
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
