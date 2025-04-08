import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { useUsers } from '../../../contexts/UsersContext';
import UserForm from './UserForm';
import styles from './Users.module.css';

const Users = () => {
  const { users, loading, error, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (id) => {
    const user = users.find(u => u.id === id);
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        console.error('Erro ao deletar usuário:', err);
      }
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleSave = (userData) => {
    if (userData.id) {
      // Atualizar usuário existente
      setUsers(users.map(user => 
        user.id === userData.id ? { ...user, ...userData } : user
      ));
    } else {
      // Adicionar novo usuário
      const newUser = {
        ...userData,
        id: users.length + 1,
        lastLogin: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Erro ao carregar usuários: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <h1 className={styles.title}>Usuários</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          <FaUserPlus />
          Adicionar Usuário
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar usuários..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select 
            className={styles.filter}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todos os perfis</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select 
            className={styles.filter}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Status</th>
              <th>Último Login</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.role} ${styles[`role${user.role}`]}`}>
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${styles[`status${user.status}`]}`}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td>{formatDate(user.lastLogin)}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => handleEdit(user.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationButton}>Anterior</button>
        <span className={styles.paginationInfo}>Página 1 de 1</span>
        <button className={styles.paginationButton}>Próxima</button>
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          onClose={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Users; 