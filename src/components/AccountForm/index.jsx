import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AccountForm.module.css';

const AccountForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
    watch
  } = useForm({
    mode: 'onBlur'
  });
  
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login
        await login(data.email, data.password);
        toast.success('Login realizado com sucesso!');
        navigate('/'); // Redirecionar para a página inicial após login
      } else {
        // Registro
        await registerUser(data.name, data.email, data.password);
        toast.success('Conta criada com sucesso!');
        navigate('/'); // Redirecionar para a página inicial após registro
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
                  {...register("name", { 
                    required: !isLogin && "Nome é obrigatório",
                    minLength: { 
                      value: 3, 
                      message: "Nome deve ter pelo menos 3 caracteres" 
                    }
                  })}
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
                {...register("email", { 
                  required: "E-mail é obrigatório",
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de e-mail inválido" 
                  }
                })}
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
                {...register("password", { 
                  required: "Senha é obrigatória",
                  minLength: { 
                    value: 6, 
                    message: "Senha deve ter pelo menos 6 caracteres" 
                  }
                })}
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
                  {...register("confirmPassword", { 
                    required: !isLogin && "Confirmação de senha é obrigatória",
                    validate: value => 
                      value === password || "As senhas não coincidem"
                  })}
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
            disabled={isSubmitting}
          >
            {isSubmitting 
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
            disabled={isSubmitting}
            onClick={() => handleSocialLogin('Facebook')}
          >
            <FaFacebookF aria-hidden="true" />
            <span>Facebook</span>
          </button>
          <button 
            type="button"
            className={`${styles.socialButton} ${styles.googleButton}`} 
            aria-label="Entrar com Google"
            disabled={isSubmitting}
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
              disabled={isSubmitting}
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