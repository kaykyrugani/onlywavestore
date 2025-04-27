import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Button,
  ButtonGroup,
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Stack,
  IconButton,
  Collapse
} from '@mui/material';
import { 
  TrendingUp, 
  ShoppingCart, 
  LocalShipping, 
  CheckCircle,
  Today,
  DateRange,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FileDownload,
  MoreVert,
  FilterList,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import orderService from '../../../services/order.service'; // Alterado para default import
import StatCard from '../../../components/admin/StatCard';
import { LineChart } from '../../../components/admin/Charts';
import { dashboardService } from '../../../services/dashboard.service';
import categoryService from '../../../services/category.service';
import './DashboardPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PAYMENT_METHODS = [
  { value: 'pix', label: 'PIX' },
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'bank_slip', label: 'Boleto' }
];

const ORDER_STATUS = [
  { value: 'pending', label: 'Pendente' },
  { value: 'processing', label: 'Em Processamento' },
  { value: 'shipped', label: 'Enviado' },
  { value: 'delivered', label: 'Entregue' },
  { value: 'cancelled', label: 'Cancelado' }
];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const chartsRef = useRef([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageTicket: 0,
    ordersByStatus: [],
    salesByMonth: [],
    topProducts: [],
    comparison: {
      totalSales: { value: 0, percentage: 0 },
      totalOrders: { value: 0, percentage: 0 },
      averageTicket: { value: 0, percentage: 0 }
    }
  });
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    loadCategories();
    loadDashboardData();
  }, [startDate, endDate, selectedCategories, selectedPaymentMethods, selectedOrderStatus]);

  const loadCategories = async () => {
    try {
      const response = await categoryService.list();
      setCategories(response.data);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      toast.error('Falha ao carregar categorias');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');
      
      const data = await orderService.getDashboardStats({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        categories: selectedCategories,
        paymentMethods: selectedPaymentMethods,
        orderStatus: selectedOrderStatus
      });
      
      setStats(data);
      setSalesData(data.salesByMonth);
      setCategoryData(data.topProducts);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard. Tente novamente mais tarde.');
      toast.error('Falha ao atualizar dados do dashboard');
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDateSelect = (period) => {
    const today = new Date();
    
    switch (period) {
      case 'today':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'last7days':
        setStartDate(subDays(today, 7));
        setEndDate(today);
        break;
      case 'thisMonth':
        setStartDate(startOfMonth(today));
        setEndDate(endOfMonth(today));
        break;
      case 'lastMonth':
        const lastMonth = subMonths(today, 1);
        setStartDate(startOfMonth(lastMonth));
        setEndDate(endOfMonth(lastMonth));
        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethods(event.target.value);
  };

  const handleOrderStatusChange = (event) => {
    setSelectedOrderStatus(event.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getComparisonColor = (value) => {
    return value > 0 ? '#2e7d32' : value < 0 ? '#d32f2f' : '#757575';
  };

  const getComparisonIcon = (value) => {
    return value > 0 ? <TrendingUpIcon /> : value < 0 ? <TrendingDownIcon /> : null;
  };

  const handleExportCSV = async () => {
    try {
      const filters = {
        startDate,
        endDate,
        categories: selectedCategories,
        paymentMethods: selectedPaymentMethods,
        orderStatus: selectedOrderStatus,
      };
      await dashboardService.exportCSV(filters);
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const filters = {
        startDate,
        endDate,
        categories: selectedCategories,
        paymentMethods: selectedPaymentMethods,
        orderStatus: selectedOrderStatus,
      };
      await dashboardService.exportPDF(filters);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  const handleExportMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <Box className="dashboard-page__loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className="dashboard-page">
      <Box className="dashboard-page__header">
        <Typography variant="h4" component="h1" className="dashboard-page__title">
          Dashboard
        </Typography>
        <Box className="dashboard-page__actions">
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={toggleFilters}
            className="dashboard-page__filter-button"
          >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownload />}
            onClick={handleExportMenuOpen}
            className="dashboard-page__export-button"
          >
            Exportar
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleExportMenuClose}
          >
            <MenuItem onClick={() => {
              handleExportCSV();
              handleExportMenuClose();
            }}>
              Exportar CSV
            </MenuItem>
            <MenuItem onClick={() => {
              handleExportPDF();
              handleExportMenuClose();
            }}>
              Exportar PDF
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Filtro de Período */}
      <Paper className="dashboard-page__filters">
        <Box className="dashboard-page__filters-content">
          <ButtonGroup className="dashboard-page__quick-filters">
            <Button
              startIcon={<Today />}
              onClick={() => handleQuickDateSelect('today')}
            >
              Hoje
            </Button>
            <Button
              startIcon={<DateRange />}
              onClick={() => handleQuickDateSelect('last7days')}
            >
              Últimos 7 dias
            </Button>
            <Button
              startIcon={<DateRange />}
              onClick={() => handleQuickDateSelect('thisMonth')}
            >
              Este mês
            </Button>
            <Button
              startIcon={<DateRange />}
              onClick={() => handleQuickDateSelect('lastMonth')}
            >
              Mês anterior
            </Button>
          </ButtonGroup>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Box className="dashboard-page__date-filters">
              <DatePicker
                label="Data Inicial"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
                maxDate={endDate}
              />
              <DatePicker
                label="Data Final"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
              />
            </Box>
          </LocalizationProvider>
        </Box>
      </Paper>

      {/* Filtros Avançados */}
      <Collapse in={showFilters}>
        <Paper className="dashboard-page__advanced-filters">
          <Typography variant="h6" className="dashboard-page__filters-title">
            Filtros Avançados
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Categorias</InputLabel>
                <Select
                  multiple
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={categories.find(c => c.id === value)?.name || value} 
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Métodos de Pagamento</InputLabel>
                <Select
                  multiple
                  value={selectedPaymentMethods}
                  onChange={handlePaymentMethodChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={PAYMENT_METHODS.find(p => p.value === value)?.label || value} 
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {PAYMENT_METHODS.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status dos Pedidos</InputLabel>
                <Select
                  multiple
                  value={selectedOrderStatus}
                  onChange={handleOrderStatusChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={ORDER_STATUS.find(s => s.value === value)?.label || value} 
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {ORDER_STATUS.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={loadDashboardData}>
              Aplicar Filtros
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {error && (
        <Alert severity="error" className="dashboard-page__error">
          {error}
        </Alert>
      )}

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} className="dashboard-page__stats">
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Vendas Totais"
            value={formatCurrency(stats.totalSales)}
            icon={TrendingUp}
            color="#1976d2"
            comparison={{
              value: stats.comparison.totalSales.percentage,
              icon: getComparisonIcon(stats.comparison.totalSales.percentage),
              color: getComparisonColor(stats.comparison.totalSales.percentage)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Pedidos"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="#2e7d32"
            comparison={{
              value: stats.comparison.totalOrders.percentage,
              icon: getComparisonIcon(stats.comparison.totalOrders.percentage),
              color: getComparisonColor(stats.comparison.totalOrders.percentage)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pedidos Pendentes"
            value={stats.ordersByStatus.find(s => s.status === 'pending')?.count || 0}
            icon={LocalShipping}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ticket Médio"
            value={formatCurrency(stats.averageTicket)}
            icon={CheckCircle}
            color="#9c27b0"
            comparison={{
              value: stats.comparison.averageTicket.percentage,
              icon: getComparisonIcon(stats.comparison.averageTicket.percentage),
              color: getComparisonColor(stats.comparison.averageTicket.percentage)
            }}
          />
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3} className="dashboard-page__charts">
        {/* Vendas por Mês */}
        <Grid item xs={12} md={8}>
          <Paper className="dashboard-page__chart-paper">
            <Typography variant="h6" className="dashboard-page__chart-title">
              Vendas por Mês
            </Typography>
            <Box className="dashboard-page__chart-container" ref={el => chartsRef.current[0] = el}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="sales" name="Vendas" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Pedidos por Status */}
        <Grid item xs={12} md={4}>
          <Paper className="dashboard-page__chart-paper">
            <Typography variant="h6" className="dashboard-page__chart-title">
              Pedidos por Status
            </Typography>
            <Box className="dashboard-page__chart-container" ref={el => chartsRef.current[1] = el}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.ordersByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                  >
                    {stats.ordersByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Produtos Mais Vendidos */}
        <Grid item xs={12}>
          <Paper className="dashboard-page__chart-paper">
            <Typography variant="h6" className="dashboard-page__chart-title">
              Produtos Mais Vendidos
            </Typography>
            <Box className="dashboard-page__chart-container" ref={el => chartsRef.current[2] = el}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="quantity" name="Quantidade Vendida" fill="#2e7d32" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 