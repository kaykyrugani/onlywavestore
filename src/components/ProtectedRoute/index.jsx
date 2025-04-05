import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Mostrar um indicador de carregamento enquanto verifica a autenticação
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(78, 186, 186, 0.3)',
          borderRadius: '50%',
          borderTop: '4px solid #4EBABA',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Se o usuário não estiver autenticado, redirecionar para a página de login
  // com o parâmetro de redirecionamento para voltar após o login
  if (!currentUser) {
    return <Navigate to="/conta" state={{ from: location }} replace />;
  }

  // Se o usuário estiver autenticado, renderizar o componente filho
  return children;
};

export default ProtectedRoute;
