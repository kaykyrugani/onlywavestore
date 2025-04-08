import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useUsers } from '../../../contexts/UsersContext';
import './UserForm.css';

const UserForm = ({ user, onClose }) => {
  const { addUser, updateUser } = useUsers();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem!');
      }

      const userData = {
        ...formData,
        id: user?.id
      };

      // Remove campos vazios de senha se estiver editando
      if (user && !formData.password) {
        delete userData.password;
        delete userData.confirmPassword;
      }

      if (user) {
        await updateUser(userData);
      } else {
        await addUser(userData);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form-overlay">
      <div className="user-form-container">
        <div className="user-form-header">
          <h2>{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          <button className="user-form-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="user-form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="user-form">
          <div className="user-form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="user-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="user-form-group">
            <label htmlFor="role">Perfil</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="user-form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>

          <div className="user-form-group">
            <label htmlFor="password">
              {user ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!user}
            />
          </div>

          <div className="user-form-group">
            <label htmlFor="confirmPassword">
              {user ? 'Confirmar Nova Senha' : 'Confirmar Senha'}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!user}
            />
          </div>

          <div className="user-form-actions">
            <button 
              type="button" 
              className="user-form-cancel" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="user-form-save"
              disabled={loading}
            >
              {loading ? 'Salvando...' : (user ? 'Salvar Alterações' : 'Criar Usuário')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm; 