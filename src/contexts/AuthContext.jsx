import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se o usuário já está logado ao carregar a página
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Verificar se há um token no localStorage
        const token = authService.getToken();
        
        if (token) {
          // Obter dados do usuário do localStorage
          const userData = authService.getUser();
          
          if (userData) {
            setCurrentUser(userData);
          } else {
            // Se não houver dados do usuário, tentar renovar o token
            try {
              const response = await authService.refreshToken();
              setCurrentUser(response.user);
            } catch (refreshError) {
              // Se falhar ao renovar o token, fazer logout
              authService.logout();
              setCurrentUser(null);
            }
          }
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setError('Falha ao verificar autenticação');
        // Limpar token inválido
        authService.logout();
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Função de login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Chamar o serviço de autenticação
      const response = await authService.login({ email, password });
      
      // Atualizar estado do usuário
      setCurrentUser(response.user);
      
      return response.user;
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(err.message || 'Credenciais inválidas. Verifique seu e-mail e senha.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de registro
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Chamar o serviço de autenticação
      const response = await authService.register({ 
        name, 
        email, 
        password,
        confirmPassword: password // Assumindo que o backend aceita isso
      });
      
      // Atualizar estado do usuário
      setCurrentUser(response.user);
      
      return response.user;
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError(err.message || 'Falha ao criar conta. Este e-mail pode já estar em uso.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setError(null);
  };

  // Função para verificar se o usuário é admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
