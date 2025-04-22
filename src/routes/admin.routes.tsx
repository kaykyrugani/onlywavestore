import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/admin/Dashboard';
import ProductsPage from '../pages/admin/Products';
import ProductForm from '../pages/admin/Products/ProductForm';

const AdminRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/produtos/novo" element={<ProductForm />} />
        <Route path="/produtos/:id/editar" element={<ProductForm />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes; 