import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  LocalShipping,
  Star,
  Visibility
} from '@mui/icons-material';
import { dashboardService, DashboardMetrics } from '../../../services/dashboard.service';
import { formatCurrency } from '../../../utils/format';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { sx: { color } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getMetrics();
      setMetrics(data);
    } catch (err) {
      setError('Erro ao carregar métricas do dashboard');
    } finally {
      setLoading(false);
    }
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

  if (error || !metrics) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error || 'Erro ao carregar métricas'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography color="textSecondary">
          Visão geral das métricas do seu negócio
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Cards de Métricas */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Vendas Totais"
            value={formatCurrency(metrics.totalSales)}
            icon={<AttachMoney />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pedidos Hoje"
            value={metrics.ordersToday}
            icon={<ShoppingCart />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(metrics.averageTicket)}
            icon={<TrendingUp />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pedidos Pendentes"
            value={metrics.pendingOrders}
            icon={<LocalShipping />}
            color="#f44336"
          />
        </Grid>

        {/* Produtos Mais Vendidos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Produtos Mais Vendidos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Vendidos</TableCell>
                    <TableCell align="right">Receita</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metrics.topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.totalSold}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(product.revenue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Pedidos Recentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pedidos Recentes
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Data</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metrics.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            backgroundColor:
                              order.status === 'completed'
                                ? '#4caf5015'
                                : order.status === 'pending'
                                ? '#ff980015'
                                : '#f4433615',
                            color:
                              order.status === 'completed'
                                ? '#4caf50'
                                : order.status === 'pending'
                                ? '#ff9800'
                                : '#f44336',
                            py: 0.5,
                            px: 1,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          {order.status === 'completed'
                            ? 'Concluído'
                            : order.status === 'pending'
                            ? 'Pendente'
                            : 'Cancelado'}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(order.createdAt), "dd 'de' MMMM", {
                          locale: ptBR
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 