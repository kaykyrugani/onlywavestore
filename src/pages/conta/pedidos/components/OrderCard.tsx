import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { Order } from '../../../../services/order.service';
import { formatCurrency, formatDate } from '../../../../utils/formatters';
import OrderItem from './OrderItem';

interface OrderCardProps {
  order: Order;
  onCancel: (orderId: number, reason?: string) => void;
  onPaymentRetry: (orderId: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onCancel, onPaymentRetry }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em Processamento';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'paid':
        return 'success';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPaymentStatusLabel = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending':
        return 'Pagamento Pendente';
      case 'paid':
        return 'Pago';
      case 'failed':
        return 'Falhou';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
  };

  const handleCancelClick = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    onCancel(order.id, cancelReason);
    setCancelDialogOpen(false);
    setCancelReason('');
  };

  const handleCancelClose = () => {
    setCancelDialogOpen(false);
    setCancelReason('');
  };

  const canCancel = order.status === 'pending' || order.status === 'processing';
  const canRetryPayment = order.paymentStatus === 'failed' || order.paymentStatus === 'pending';

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Pedido #{order.id}
            </Typography>
            <Box>
              <Chip 
                label={getStatusLabel(order.status)} 
                color={getStatusColor(order.status) as any} 
                sx={{ mr: 1 }} 
              />
              <Chip 
                label={getPaymentStatusLabel(order.paymentStatus)} 
                color={getPaymentStatusColor(order.paymentStatus) as any} 
              />
            </Box>
          </Box>

          <Typography variant="body2" color="textSecondary" gutterBottom>
            Data: {formatDate(order.createdAt)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box mb={2}>
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Total: {formatCurrency(order.total)}
            </Typography>

            <Box>
              {canCancel && (
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleCancelClick}
                  sx={{ mr: 1 }}
                >
                  Cancelar Pedido
                </Button>
              )}
              
              {canRetryPayment && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onPaymentRetry(order.id)}
                >
                  Tentar Pagamento Novamente
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={cancelDialogOpen} onClose={handleCancelClose}>
        <DialogTitle>Cancelar Pedido</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Tem certeza que deseja cancelar este pedido?
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Motivo do cancelamento (opcional)"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Voltar</Button>
          <Button onClick={handleCancelConfirm} color="error" variant="contained">
            Confirmar Cancelamento
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderCard; 