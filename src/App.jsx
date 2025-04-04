import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes';
import { CartProvider } from './contexts/CartContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <CartProvider>
      <ErrorBoundary>
        <Router>
          <AppRouter />
        </Router>
      </ErrorBoundary>
    </CartProvider>
  );
}

export default App;
