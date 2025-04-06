import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { CarrinhoProvider } from "../contexts/CarrinhoContext";
import { ProdutosProvider } from "../contexts/ProdutosContext";
import HomePage from "../pages/home/homeindex";
import AccountPage from "../pages/conta/";
import ProdutosPage from "../pages/produtos";
import ProdutoPage from "../pages/produto/ProdutoPage";
import CheckoutPage from "../pages/checkout";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import TestePage from "../pages/teste/TestePage";

function App() {
  return (
    <AuthProvider>
      <ProdutosProvider>
        <CarrinhoProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/conta" element={<AccountPage />} />
                <Route path="/produtos" element={<ProdutosPage />} />
                <Route path="/produtos/:categoria" element={<ProdutosPage />} />
                <Route path="/produto/:id" element={<ProdutoPage />} />
                <Route path="/teste" element={<TestePage />} />
                
                {/* Rotas protegidas que exigem autenticação */}
                <Route path="/conta/profile" element={
                  <ProtectedRoute>
                    <AccountPage initialTab="profile" />
                  </ProtectedRoute>
                } />
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
                <Route path="*" element={<NotFoundPage />} />
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
        </CarrinhoProvider>
      </ProdutosProvider>
    </AuthProvider>
  );
}

export default App;
