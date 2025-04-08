import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTheme = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (newTheme) => {
        set({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useTheme; 