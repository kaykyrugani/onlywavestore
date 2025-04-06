import React, { createContext, useContext, useState, useEffect } from 'react';

// Criando o contexto
const ThemeContext = createContext();

// Provedor do contexto
export function ThemeProvider({ children }) {
  // Estado para armazenar o tema atual
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    // Se não houver tema salvo, usar o tema claro como padrão
    return savedTheme === 'dark';
  });

  // Efeito para aplicar o tema ao documento e salvar no localStorage
  useEffect(() => {
    // Aplicar o tema ao elemento HTML
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    // Salvar o tema no localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Função para alternar entre temas
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Valores do contexto
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}

export default ThemeContext; 