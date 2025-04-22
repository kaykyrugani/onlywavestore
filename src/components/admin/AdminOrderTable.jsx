import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Chip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import StatusBadge from './StatusBadge';
import OrderDetailsModal from './OrderDetailsModal';
import './AdminOrderTable.css';

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendente' },
  { value: 'processing', label: 'Processando' },
  { value: 'shipped', label: 'Enviado' },
  { value: 'delivered', label: 'Entregue' },
  { value: 'cancelled', label: 'Cancelado' }
];

const AdminOrderTable = ({ orders, onUpdateStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    startDate: null,
    endDate: null,
    search: ''
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesSearch = order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                         order.user.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDateRange = (!filters.startDate || new Date(order.createdAt) >= filters.startDate) &&
                           (!filters.endDate || new Date(order.createdAt) <= filters.endDate);
    
    return matchesStatus && matchesSearch && matchesDateRange;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="admin-order-table">
      {/* Filtros */}
      <Box className="admin-order-table__filters">
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="admin-order-table__filter"
        >
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DatePicker
            label="Data Inicial"
            value={filters.startDate}
            onChange={(date) => handleFilterChange('startDate', date)}
            className="admin-order-table__filter"
          />
          <DatePicker
            label="Data Final"
            value={filters.endDate}
            onChange={(date) => handleFilterChange('endDate', date)}
            className="admin-order-table__filter"
          />
        </LocalizationProvider>

        <TextField
          label="Buscar"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="admin-order-table__filter"
          placeholder="ID ou nome do cliente"
        />
      </Box>

      {/* Tabela */}
      <TableContainer component={Paper} className="admin-order-table__container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => setSelectedOrder(order)}
                    size="small"
                    className="admin-order-table__action-button"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Detalhes */}
      <OrderDetailsModal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
};

export default AdminOrderTable; 