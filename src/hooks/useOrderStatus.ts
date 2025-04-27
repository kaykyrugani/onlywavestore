import { useState, useEffect } from 'react';
import { default as orderService, OrderStatus } from '../services/order.service';

export interface OrderStatusData {
  status: OrderStatus;
  updatedAt: string;
  updatedBy?: string;
  source?: 'system' | 'admin' | 'user';
  internalCode?: string;
}

interface UseOrderStatusOptions {
  pollInterval?: number;
}

export function useOrderStatus(orderId: string, options: UseOrderStatusOptions = {}) {
  const [data, setData] = useState<OrderStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const statusData = await orderService.getOrderStatus(orderId);
        setData(statusData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao buscar status do pedido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();

    // Configurar polling se o intervalo for fornecido
    let intervalId: NodeJS.Timeout | undefined;
    if (options.pollInterval && options.pollInterval > 0) {
      intervalId = setInterval(fetchStatus, options.pollInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId, options.pollInterval]);

  return { data, isLoading, error };
} 