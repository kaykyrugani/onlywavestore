import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Collapse
} from '@mui/material';
import { formatCurrency } from '../../../utils/formatters';
import orderService from '../../../services/order.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface OrderItem {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  paymentMethod: 'pix' | 'credit_card';
  paymentUrl?: string;
  couponCode?: string;
  discount?: number;
}

const statusColors = {
  pending: 'warning',
  paid: 'info',
  cancelled: 'error',
  processing: 'primary',
  shipped: 'info',
  delivered: 'success'
} as const;

const statusLabels = {
  pending: 'Pendente',
  paid: 'Pago',
  cancelled: 'Cancelado',
  processing: 'Em Processamento',
  shipped: 'Enviado',
  delivered: 'Entregue'
} as const;

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState<number | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.list();
      setOrders(response.data);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      toast.error('Não foi possível carregar seus pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      setCancellingOrder(orderId);
      await orderService.cancel(orderId);
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' }
          : order
      ));
      toast.success('Pedido cancelado com sucesso');
    } catch (err) {
      toast.error('Erro ao cancelar pedido');
    } finally {
      setCancellingOrder(null);
    }
  };

  const handleOpenPayment = (paymentUrl: string) => {
    window.open(paymentUrl, '_blank');
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Meus Pedidos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Você ainda não fez nenhum pedido
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pedido</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      {format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[order.status]}
                        color={statusColors[order.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        {expandedOrder === order.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                      {order.status === 'pending' && order.paymentUrl && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenPayment(order.paymentUrl!)}
                        >
                          <PaymentIcon />
                        </IconButton>
                      )}
                      {order.status === 'pending' && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={cancellingOrder === order.id}
                        >
                          {cancellingOrder === order.id ? (
                            <CircularProgress size={20} />
                          ) : (
                            <CancelIcon />
                          )}
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ py: 0 }}>
                      <Collapse in={expandedOrder === order.id}>
                        <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Itens do Pedido
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Produto</TableCell>
                                <TableCell align="right">Quantidade</TableCell>
                                <TableCell align="right">Preço Unit.</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align="right">{item.quantity}</TableCell>
                                  <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                                  <TableCell align="right">
                                    {formatCurrency(item.price * item.quantity)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                            {order.discount && (
                              <Typography color="success.main">
                                Desconto: -{formatCurrency(order.discount)}
                              </Typography>
                            )}
                            <Typography variant="subtitle1">
                              Total: {formatCurrency(order.total)}
                            </Typography>
                          </Box>
                          {order.couponCode && (
                            <Typography variant="body2" color="text.secondary" align="right">
                              Cupom aplicado: {order.couponCode}
                            </Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrdersPage; 