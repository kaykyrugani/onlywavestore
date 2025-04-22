import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEnvelope, FaLock, FaUser, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AccountForm.module.css';

// Schema de validação para login
const loginSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Endereço de e-mail inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
});

// Schema de validação para registro
const registerSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Endereço de e-mail inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

const AccountForm = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const { login, register: registerUser, error: authError, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Atualizar o modo com base na propriedade initialMode
    setIsLogin(initialMode === 'login');
  }, [initialMode]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
    watch
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    mode: 'onBlur'
  });
  
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login
        await login(data.email, data.password);
        toast.success('Login realizado com sucesso!');
        
        // Redirecionar para a página anterior ou para a conta
        const from = location.state?.from?.pathname || '/conta';
        navigate(from);
      } else {
        // Registro
        await registerUser(data.name, data.email, data.password);
        toast.success('Conta criada com sucesso!');
        navigate('/conta');
      }
    } catch (error) {
      // O erro já está sendo tratado no AuthContext
      toast.error(authError || 'Ocorreu um erro. Tente novamente.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Limpar o formulário ao alternar
    reset();
  };

  // Funções para login social
  const handleSocialLogin = (provider) => {
    toast.info(`Login com ${provider} será implementado em breve.`);
  };

  return (
    <div className={styles.accountFormContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2>{isLogin ? 'Entrar' : 'Criar Conta'}</h2>
          <p>
            {isLogin 
              ? 'Entre com suas credenciais para acessar sua conta' 
              : 'Preencha os campos abaixo para criar sua conta'}
          </p>
        </div>

        <div className={styles.formTabs}>
          <button 
            className={`${styles.tabButton} ${isLogin ? styles.activeTab : ''}`}
            onClick={() => setIsLogin(true)}
            aria-selected={isLogin}
            role="tab"
            type="button"
          >
            Login
          </button>
          <button 
            className={`${styles.tabButton} ${!isLogin ? styles.activeTab : ''}`}
            onClick={() => setIsLogin(false)}
            aria-selected={!isLogin}
            role="tab"
            type="button"
          >
            Cadastro
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nome completo</label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="Digite seu nome completo"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className={styles.errorMessage} role="alert">{errors.name.message}</p>
              )}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} aria-hidden="true" />
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Digite seu e-mail"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className={styles.errorMessage} role="alert">{errors.email.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} aria-hidden="true" />
              <input
                id="password"
                type="password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder={isLogin ? "Digite sua senha" : "Crie uma senha"}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className={styles.errorMessage} role="alert">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar senha</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="confirmPassword"
                  type="password"
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                  placeholder="Confirme sua senha"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className={styles.errorMessage} role="alert">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          {isLogin && (
            <div className={styles.forgotPassword}>
              <a href="/recuperar-senha">Esqueceu sua senha?</a>
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting || authLoading}
          >
            {isSubmitting || authLoading
              ? 'Processando...' 
              : isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>ou continue com</span>
        </div>

        <div className={styles.socialLogin}>
          <button 
            type="button"
            className={`${styles.socialButton} ${styles.facebookButton}`} 
            aria-label="Entrar com Facebook"
            disabled={isSubmitting || authLoading}
            onClick={() => handleSocialLogin('Facebook')}
          >
            <FaFacebookF aria-hidden="true" />
            <span>Facebook</span>
          </button>
          <button 
            type="button"
            className={`${styles.socialButton} ${styles.googleButton}`} 
            aria-label="Entrar com Google"
            disabled={isSubmitting || authLoading}
            onClick={() => handleSocialLogin('Google')}
          >
            <FaGoogle aria-hidden="true" />
            <span>Google</span>
          </button>
        </div>

        <div className={styles.switchForm}>
          <p>
            {isLogin 
              ? 'Não tem uma conta?' 
              : 'Já tem uma conta?'}
            <button 
              type="button" 
              onClick={toggleForm} 
              className={styles.switchButton}
              disabled={isSubmitting || authLoading}
            >
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;