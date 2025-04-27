import api from './api.service';

class AuthService {
  async login({ email, password }) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, refreshToken, user } = response.data;
      
      // Salvar tokens
      localStorage.setItem('onlywave_token', token);
      localStorage.setItem('onlywave_refresh_token', refreshToken);
      localStorage.setItem('onlywave_user', JSON.stringify(user));
      
      return { user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  }

  async register({ name, email, password }) {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      
      const { token, refreshToken, user } = response.data;
      
      // Salvar tokens
      localStorage.setItem('onlywave_token', token);
      localStorage.setItem('onlywave_refresh_token', refreshToken);
      localStorage.setItem('onlywave_user', JSON.stringify(user));
      
      return { user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('onlywave_refresh_token');
      const response = await api.post('/auth/refresh', { refreshToken });
      
      const { token, user } = response.data;
      
      localStorage.setItem('onlywave_token', token);
      localStorage.setItem('onlywave_user', JSON.stringify(user));
      
      return { user };
    } catch (error) {
      throw new Error('Erro ao renovar token');
    }
  }

  logout() {
    localStorage.removeItem('onlywave_token');
    localStorage.removeItem('onlywave_refresh_token');
    localStorage.removeItem('onlywave_user');
  }

  getToken() {
    return localStorage.getItem('onlywave_token');
  }

  getUser() {
    const user = localStorage.getItem('onlywave_user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService(); // Exportação padrão