import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import { ProdutosProvider } from './contexts/ProdutosContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import HomePage from './pages/home/HomePage';
import AccountPage from './pages/conta';
import ProdutosPage from './pages/produtos/ProdutosPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProdutoPage from './pages/produto/ProdutoPage';
import LoginPage from './pages/login/LoginPage';
import CadastroPage from './pages/cadastro/CadastroPage';
import CarrinhoPage from './pages/carrinho/CarrinhoPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import PerfilPage from './pages/perfil/PerfilPage';
import PedidosPage from './pages/pedidos/PedidosPage';
import FavoritosPage from './pages/favoritos/FavoritosPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import TestePage from './pages/teste/TestePage';
// Importe outras páginas conforme necessário

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ProdutosProvider>
            <CartProvider>
              <CarrinhoProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/conta" element={<AccountPage />} />
                  <Route path="/produtos" element={<ProdutosPage />} />
                  <Route path="/produto/:id" element={<ProdutoPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/cadastro" element={<CadastroPage />} />
                  <Route path="/carrinho" element={<CarrinhoPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/perfil" element={<PerfilPage />} />
                  <Route path="/pedidos" element={<PedidosPage />} />
                  <Route path="/favoritos" element={<FavoritosPage />} />
                  <Route path="/teste" element={<TestePage />} />
                  
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
                  
                  {/* Rota para página não encontrada */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
                <ThemeToggle />
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
              </CarrinhoProvider>
            </CartProvider>
          </ProdutosProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
