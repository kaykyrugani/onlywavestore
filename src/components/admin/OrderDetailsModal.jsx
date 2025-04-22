import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  IconButton,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import StatusBadge from './StatusBadge';
import './OrderDetailsModal.css';

const OrderDetailsModal = ({ open, onClose, order, onUpdateStatus }) => {
  if (!order) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="order-details-modal"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Pedido #{order.id}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Informações do Cliente */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Cliente
            </Typography>
            <Typography>
              {order.user.name}
            </Typography>
            <Typography color="textSecondary">
              {order.user.email}
            </Typography>
          </Grid>

          {/* Informações do Pedido */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Detalhes do Pedido
            </Typography>
            <Typography>
              Data: {formatDate(order.createdAt)}
            </Typography>
            <StatusBadge status={order.status} />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Itens do Pedido */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Itens do Pedido
            </Typography>
            {order.items.map((item) => (
              <Box key={item.id} className="order-item">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantidade: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" align="right">
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Resumo do Pedido */}
          <Grid item xs={12}>
            <Box className="order-summary">
              <Typography variant="subtitle1">
                Subtotal: {formatCurrency(order.subtotal)}
              </Typography>
              <Typography variant="subtitle1">
                Frete: {formatCurrency(order.shipping)}
              </Typography>
              <Typography variant="h6">
                Total: {formatCurrency(order.total)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Fechar
        </Button>
        {order.status !== 'cancelled' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onUpdateStatus(order.id)}
          >
            Atualizar Status
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsModal; 