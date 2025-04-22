import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../contexts/AuthContext';
import { Outlet } from 'react-router-dom';

// Páginas principais
import HomePage from '../pages/home/homeindex';
import ProductsPage from '../pages/produtos/index';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/cart';

// Páginas de autenticação
import LoginPage from '../pages/login/index';
import RegisterPage from '../pages/cadastro/index';

// Páginas administrativas
import AdminDashboard from '../pages/admin/Dashboard/DashboardPage';
import AdminProducts from '../pages/admin/Products/index';
import AdminOrders from '../pages/admin/Orders/OrdersPage';
import AdminUsers from '../pages/admin/Users/index';

// Componente de rota protegida
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas principais com Layout padrão */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="/carrinho" element={<CartPage />} />
      </Route>

      {/* Rotas de autenticação com AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
      </Route>

      {/* Rotas administrativas com AdminLayout */}
      <Route
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/produtos" element={<AdminProducts />} />
        <Route path="/admin/pedidos" element={<AdminOrders />} />
        <Route path="/admin/usuarios" element={<AdminUsers />} />
      </Route>

      {/* Página 404 */}
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
};

export default AppRoutes; 