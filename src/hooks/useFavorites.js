import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavorites = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.find((item) => item.id === product.id)) {
          set({
            favorites: [...currentFavorites, product],
          });
        }
      },

      removeFavorite: (productId) => {
        const currentFavorites = get().favorites;
        set({
          favorites: currentFavorites.filter((item) => item.id !== productId),
        });
      },

      isFavorite: (productId) => {
        const currentFavorites = get().favorites;
        return currentFavorites.some((item) => item.id === productId);
      },

      toggleFavorite: (product) => {
        const currentFavorites = get().favorites;
        const isCurrentlyFavorite = currentFavorites.some(
          (item) => item.id === product.id
        );

        if (isCurrentlyFavorite) {
          set({
            favorites: currentFavorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            favorites: [...currentFavorites, product],
          });
        }
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavorites;
