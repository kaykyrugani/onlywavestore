import useSWR from 'swr';
import { useCallback } from 'react';

// Função para buscar dados da API
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Falha na requisição');
  }
  return response.json();
};

// Configurações padrão para o SWR
const defaultConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minuto
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 segundos
};

// Hook principal para cache
export const useCache = (key, options = {}) => {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(key, fetcher, {
    ...defaultConfig,
    ...options,
  });

  // Função para atualizar o cache manualmente
  const updateCache = useCallback(async (newData) => {
    await mutate(newData, false);
  }, [mutate]);

  // Função para invalidar o cache
  const invalidateCache = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    updateCache,
    invalidateCache,
  };
};

// Hooks específicos para diferentes tipos de dados
export const useProductCache = (id) => {
  return useCache(id ? `/api/products/${id}` : null);
};

export const useProductsCache = (category) => {
  return useCache(category ? `/api/products?category=${category}` : '/api/products');
};

export const useCategoriesCache = () => {
  return useCache('/api/categories');
};

export const useOrdersCache = () => {
  return useCache('/api/orders');
};

export const useOrderCache = (id) => {
  return useCache(id ? `/api/orders/${id}` : null);
};

export const useUserCache = () => {
  return useCache('/api/user');
};

export const useAddressesCache = () => {
  return useCache('/api/addresses');
};

export const usePaymentMethodsCache = () => {
  return useCache('/api/payment-methods');
};

export default useCache; 