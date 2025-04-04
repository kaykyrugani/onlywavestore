import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Retornar tema salvo ou preferência do sistema
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  // Efeito para aplicar o tema ao documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};
