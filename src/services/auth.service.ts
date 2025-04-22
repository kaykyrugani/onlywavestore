import api from '../lib/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    const { token, user } = response.data;
    
    // Armazenar token de acesso no sessionStorage
    sessionStorage.setItem('accessToken', token);
    // Armazenar dados do usuário
    sessionStorage.setItem('userData', JSON.stringify(user));
    
    return response.data;
  }
  
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    const { token, user } = response.data;
    
    // Armazenar token de acesso no sessionStorage
    sessionStorage.setItem('accessToken', token);
    // Armazenar dados do usuário
    sessionStorage.setItem('userData', JSON.stringify(user));
    
    return response.data;
  }
  
  async refreshToken(): Promise<AuthResponse> {
    // O refreshToken é enviado automaticamente como cookie
    const response = await api.post('/auth/refresh');
    const { token, user } = response.data;
    
    // Atualizar token de acesso
    sessionStorage.setItem('accessToken', token);
    // Atualizar dados do usuário
    sessionStorage.setItem('userData', JSON.stringify(user));
    
    return response.data;
  }
  
  async logout(): Promise<void> {
    // Remover token de acesso e dados do usuário
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userData');
    
    // O cookie HttpOnly será removido pelo backend
    await api.post('/auth/logout');
  }
  
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  }
  
  async resetPassword(token: string, password: string): Promise<void> {
    await api.post('/auth/reset-password', { token, password });
  }
  
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('accessToken');
  }
  
  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  getUser(): AuthResponse['user'] | null {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}

export default new AuthService(); 