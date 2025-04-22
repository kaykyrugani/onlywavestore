import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { toast } from 'react-hot-toast';
import AdminOrderTable from '../../../components/admin/AdminOrderTable';
import { orderService } from '../../../services/order.service';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.list();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar pedidos. Tente novamente mais tarde.');
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      // Aqui você pode implementar um modal de seleção de status
      // Por enquanto, vamos apenas avançar para o próximo status
      const statusFlow = {
        pending: 'processing',
        processing: 'shipped',
        shipped: 'delivered'
      };

      const newStatus = statusFlow[order.status];
      if (!newStatus) {
        toast.error('Não é possível atualizar o status deste pedido.');
        return;
      }

      await orderService.updateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, status: newStatus } : o
      ));
      
      toast.success('Status do pedido atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar status do pedido.');
      console.error('Erro ao atualizar status:', err);
    }
  };

  if (loading) {
    return (
      <Box className="orders-page__loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className="orders-page">
      <Box className="orders-page__header">
        <Typography variant="h4" component="h1">
          Gerenciar Pedidos
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" className="orders-page__error">
          {error}
        </Alert>
      )}

      <AdminOrderTable
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
      />
    </Container>
  );
};

export default OrdersPage; 