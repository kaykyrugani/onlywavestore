import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import authService from '../services/auth.service'; // Importação default

// Criar instância do Axios com configuração base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.onlywave.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de acesso
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = authService.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor para renovar token expirado
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Se o erro for 401 e não for uma tentativa de refresh
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Tentar renovar o token
        const newToken = await authService.refreshToken();
        
        // Atualizar o token no cabeçalho da requisição original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        // Repetir a requisição original
        return api(originalRequest);
      } catch (refreshError) {
        // Se falhar ao renovar, fazer logout
        await authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;