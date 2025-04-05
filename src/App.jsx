import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/home';
import AccountPage from './pages/conta';
import ProdutosPage from './pages/produtos';
import ProtectedRoute from './components/ProtectedRoute';
// Importe outras páginas conforme necessário

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conta" element={<AccountPage />} />
            <Route path="/produtos/:categoria" element={<ProdutosPage />} />
            
            {/* Rotas protegidas que exigem autenticação */}
            <Route path="/conta/pedidos" element={
              <ProtectedRoute>
                <AccountPage initialTab="orders" />
              </ProtectedRoute>
            } />
            <Route path="/conta/favoritos" element={
              <ProtectedRoute>
                <AccountPage initialTab="wishlist" />
              </ProtectedRoute>
            } />
            <Route path="/conta/enderecos" element={
              <ProtectedRoute>
                <AccountPage initialTab="addresses" />
              </ProtectedRoute>
            } />
            <Route path="/conta/pagamentos" element={
              <ProtectedRoute>
                <AccountPage initialTab="payments" />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            
            {/* Rota para página não encontrada */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
