import React, { createContext, useContext, useState, useEffect } from 'react';

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers deve ser usado dentro de um UsersProvider');
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simular carregamento inicial de usuários
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Aqui você faria uma chamada à API real
        // Por enquanto, vamos usar dados mockados
        const mockUsers = [
          {
            id: 1,
            name: 'João Silva',
            email: 'joao@example.com',
            role: 'admin',
            status: 'active',
            lastLogin: '2023-06-15T10:30:00'
          },
          {
            id: 2,
            name: 'Maria Oliveira',
            email: 'maria@example.com',
            role: 'user',
            status: 'active',
            lastLogin: '2023-06-14T15:45:00'
          },
          {
            id: 3,
            name: 'Pedro Santos',
            email: 'pedro@example.com',
            role: 'user',
            status: 'inactive',
            lastLogin: '2023-06-10T09:20:00'
          }
        ];

        setUsers(mockUsers);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar usuários');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    try {
      // Aqui você faria uma chamada à API real
      const newUser = {
        ...userData,
        id: users.length + 1,
        lastLogin: new Date().toISOString()
      };

      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      setError('Erro ao adicionar usuário');
      throw err;
    }
  };

  const updateUser = async (userData) => {
    try {
      // Aqui você faria uma chamada à API real
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userData.id ? { ...user, ...userData } : user
        )
      );
      return userData;
    } catch (err) {
      setError('Erro ao atualizar usuário');
      throw err;
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Aqui você faria uma chamada à API real
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      setError('Erro ao deletar usuário');
      throw err;
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const value = {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext; 