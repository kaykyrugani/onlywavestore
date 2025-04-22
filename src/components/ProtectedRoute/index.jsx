import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Mostrar spinner enquanto verifica a autenticação
  if (loading) {
    return <LoadingSpinner />;
  }

  // Se não estiver autenticado, redirecionar para login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota requer admin e o usuário não é admin, redirecionar para home
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado e tiver permissão, renderizar o componente
  return children;
};

export default ProtectedRoute;
