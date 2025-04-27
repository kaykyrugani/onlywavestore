import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import { formatCurrency, formatDate } from '../../../utils/format';
import './OrderCard.css';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
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

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em Processamento';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="order-card">
        <CardContent>
          <Box className="order-header">
            <Box>
              <Typography variant="h6" className="order-id">
                Pedido #{order.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Realizado em {formatDate(order.createdAt)}
              </Typography>
            </Box>
            <Chip
              label={getStatusLabel(order.status)}
              color={getStatusColor(order.status)}
              className="status-chip"
            />
          </Box>

          <Divider className="order-divider" />

          <Box className="order-items">
            {order.items.map((item) => (
              <Box key={item.id} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />
                <Box className="item-details">
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.quantity}x {formatCurrency(item.price)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider className="order-divider" />

          <Box className="order-footer">
            <Box className="order-total">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" className="total-value">
                {formatCurrency(order.total)}
              </Typography>
            </Box>

            <Box className="order-actions">
              <Button
                variant="outlined"
                color="primary"
                className="details-button"
              >
                Ver Detalhes
              </Button>
              {order.status.toLowerCase() === 'pending' && (
                <Button
                  variant="outlined"
                  color="error"
                  className="cancel-button"
                >
                  Cancelar Pedido
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderCard; 