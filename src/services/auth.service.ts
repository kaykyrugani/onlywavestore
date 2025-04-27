import axios from 'axios';
import { toast } from 'react-hot-toast';
import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL;

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiResponse<AuthResponse>>(
        `${API_URL}/auth/login`,
        data
      );
      toast.success('Login realizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Email ou senha inválidos');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiResponse<AuthResponse>>(
        `${API_URL}/auth/register`,
        data
      );
      toast.success('Conta criada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw new Error('Não foi possível criar a conta');
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      toast.success('Email de recuperação enviado com sucesso');
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      throw new Error('Não foi possível enviar o email de recuperação');
    }
  },

  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, data);
      toast.success('Senha alterada com sucesso');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      throw new Error('Não foi possível alterar a senha');
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/verify-email`, { token });
      toast.success('Email verificado com sucesso');
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      throw new Error('Não foi possível verificar o email');
    }
  },

  async resendVerificationEmail(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/resend-verification-email`);
      toast.success('Email de verificação reenviado com sucesso');
    } catch (error) {
      console.error('Erro ao reenviar email de verificação:', error);
      throw new Error('Não foi possível reenviar o email de verificação');
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiResponse<AuthResponse>>(
        `${API_URL}/auth/refresh-token`,
        { refreshToken }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      throw new Error('Não foi possível atualizar o token');
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      toast.success('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw new Error('Não foi possível fazer logout');
    }
  }
};

export default authService; 