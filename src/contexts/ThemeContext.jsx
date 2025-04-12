import React, { createContext, useContext, useState, useEffect } from 'react';

// Criando o contexto
const ThemeContext = createContext();

// Provedor do contexto
export const ThemeProvider = ({ children }) => {
  // Estado para armazenar o tema atual
  const [theme, setTheme] = useState(() => {
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    // Se não houver tema salvo, usar o tema claro como padrão
    return savedTheme || 'light';
  });

  // Efeito para aplicar o tema ao documento e salvar no localStorage
  useEffect(() => {
    // Aplicar o tema ao elemento HTML
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    // Salvar o tema no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Valores do contexto
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 