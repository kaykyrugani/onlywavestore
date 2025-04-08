import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Falha na requisição');
  }
  return response.json();
};

export const useApi = (endpoint, options = {}) => {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minuto
    ...options,
  });

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const useProduct = (id) => {
  return useApi(id ? `/api/products/${id}` : null);
};

export const useProducts = (category) => {
  return useApi(category ? `/api/products?category=${category}` : '/api/products');
};

export const useCategories = () => {
  return useApi('/api/categories');
};

export const useOrders = () => {
  return useApi('/api/orders');
};

export const useOrder = (id) => {
  return useApi(id ? `/api/orders/${id}` : null);
};

export const useUser = () => {
  return useApi('/api/user');
};

export const useAddresses = () => {
  return useApi('/api/addresses');
};

export const usePaymentMethods = () => {
  return useApi('/api/payment-methods');
}; 