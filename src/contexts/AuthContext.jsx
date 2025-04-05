import React, { createContext, useContext, useState, useEffect } from 'react';

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
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Aqui você faria uma chamada à API para validar o token
          // e obter os dados do usuário
          
          // Simulando uma chamada de API
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Exemplo de dados do usuário
          const userData = {
            id: '123',
            name: 'Usuário Exemplo',
            email: 'usuario@exemplo.com',
          };
          
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setError('Falha ao verificar autenticação');
        // Limpar token inválido
        localStorage.removeItem('authToken');
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
      // Aqui você faria uma chamada à API para autenticar o usuário
      
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Exemplo de resposta da API
      const response = {
        user: {
          id: '123',
          name: 'Usuário Exemplo',
          email: email,
        },
        token: 'token-exemplo-123456',
      };
      
      // Salvar token no localStorage
      localStorage.setItem('authToken', response.token);
      
      // Atualizar estado do usuário
      setCurrentUser(response.user);
      
      return response.user;
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
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
      // Aqui você faria uma chamada à API para registrar o usuário
      
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Exemplo de resposta da API
      const response = {
        user: {
          id: '456',
          name: name,
          email: email,
        },
        token: 'token-exemplo-654321',
      };
      
      // Salvar token no localStorage
      localStorage.setItem('authToken', response.token);
      
      // Atualizar estado do usuário
      setCurrentUser(response.user);
      
      return response.user;
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError('Falha ao criar conta. Este e-mail pode já estar em uso.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
