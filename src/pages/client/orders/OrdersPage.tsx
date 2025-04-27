import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ordersService } from '../../../services/orders.service';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import OrderCard from './OrderCard';
import './OrdersPage.css';

interface Order {
  id: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  createdAt: string;
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userOrders = await ordersService.getUserOrders(user?.id || '');
        setOrders(userOrders);
      } catch (err) {
        setError('Erro ao carregar pedidos');
        toast.error('Não foi possível carregar seus pedidos');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} />
        <Typography variant="h6" className="loading-text">
          Carregando seus pedidos...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <Box className="empty-orders">
          <Typography variant="h5" className="empty-title">
            Você ainda não fez nenhum pedido
          </Typography>
          <Typography variant="body1" className="empty-text">
            Quando você fizer um pedido, ele aparecerá aqui.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container className="orders-container">
      <Typography variant="h4" className="orders-title">
        Meus Pedidos
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </motion.div>
    </Container>
  );
};

export default OrdersPage; 