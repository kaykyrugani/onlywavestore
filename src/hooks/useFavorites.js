import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    // Carregar favoritos do localStorage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Salvar favoritos no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Adicionar produto aos favoritos
  const addToFavorites = (product) => {
    setFavorites(prevFavorites => {
      // Verificar se o produto já está nos favoritos
      if (prevFavorites.some(item => item.id === product.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  };

  // Remover produto dos favoritos
  const removeFromFavorites = (productId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== productId)
    );
  };

  // Verificar se um produto está nos favoritos
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  return { 
    favorites, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  };
};
