import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes'
import { CartProvider } from './contexts/CartContext'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AppRouter />
    </CartProvider>
  </React.StrictMode>,
);
