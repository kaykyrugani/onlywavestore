import React from 'react';
import { Chip } from '@mui/material';
import './StatusBadge.css';

const statusConfig = {
  pending: {
    label: 'Pendente',
    color: 'warning',
    icon: '⏳'
  },
  processing: {
    label: 'Processando',
    color: 'info',
    icon: '🔄'
  },
  shipped: {
    label: 'Enviado',
    color: 'primary',
    icon: '📦'
  },
  delivered: {
    label: 'Entregue',
    color: 'success',
    icon: '✅'
  },
  cancelled: {
    label: 'Cancelado',
    color: 'error',
    icon: '❌'
  }
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    label: 'Desconhecido',
    color: 'default',
    icon: '❓'
  };

  return (
    <Chip
      label={`${config.icon} ${config.label}`}
      color={config.color}
      className="status-badge"
      size="small"
    />
  );
};

export default StatusBadge; 