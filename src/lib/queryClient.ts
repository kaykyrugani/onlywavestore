import { QueryClient } from '@tanstack/react-query';

// Criar instância do QueryClient com configurações personalizadas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Não recarregar dados quando a janela recebe foco
      retry: 1, // Tentar novamente apenas uma vez em caso de falha
      staleTime: 5 * 60 * 1000, // Considerar dados como obsoletos após 5 minutos
      cacheTime: 30 * 60 * 1000, // Manter dados em cache por 30 minutos
    },
    mutations: {
      retry: 1, // Tentar novamente apenas uma vez em caso de falha
    },
  },
});

export default queryClient; 