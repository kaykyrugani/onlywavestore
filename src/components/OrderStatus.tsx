import React from 'react';
import './OrderStatus.css';
import { 
  Chip, 
  CircularProgress, 
  Typography, 
  Tooltip, 
  Fade,
  Box
} from '@mui/material';
import {
  PendingOutlined,
  LoopOutlined,
  LocalShippingOutlined,
  CheckCircleOutlined,
  CancelOutlined
} from '@mui/icons-material';
import { useOrderStatus } from '../hooks/useOrderStatus';
import { OrderStatus as OrderStatusType } from '../services/order.service';

interface OrderStatusProps {
  orderId: string;
  pollInterval?: number;
  showTooltip?: boolean;
}

const statusColors: Record<OrderStatusType, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  pending: 'warning',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error'
};

const statusLabels: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  processing: 'Em Processamento',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado'
};

const statusIcons: Record<OrderStatusType, React.ReactElement> = {
  pending: <PendingOutlined />,
  processing: <LoopOutlined className="rotating" />,
  shipped: <LocalShippingOutlined />,
  delivered: <CheckCircleOutlined />,
  cancelled: <CancelOutlined />
};

const sourceLabels: Record<'system' | 'admin' | 'user', string> = {
  system: 'Sistema',
  admin: 'Administrador',
  user: 'Usuário'
};

export function OrderStatus({ orderId, pollInterval, showTooltip = false }: OrderStatusProps) {
  const { data, isLoading, error } = useOrderStatus(orderId, { pollInterval });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={20} />
        <Typography>Carregando status...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Erro ao carregar status: {error.message}
      </Typography>
    );
  }

  if (!data) {
    return null;
  }

  const tooltipContent = showTooltip ? (
    <Box sx={{ p: 1 }}>
      <Typography variant="body2">
        Status: {statusLabels[data.status]}
      </Typography>
      {data.internalCode && (
        <Typography variant="body2">
          Código interno: {data.internalCode}
        </Typography>
      )}
      {data.updatedBy && (
        <Typography variant="body2">
          Atualizado por: {data.updatedBy}
        </Typography>
      )}
      {data.source && (
        <Typography variant="body2">
          Origem: {sourceLabels[data.source]}
        </Typography>
      )}
    </Box>
  ) : null;

  const statusChip = (
    <Fade in timeout={300}>
      <Chip
        icon={statusIcons[data.status]}
        label={statusLabels[data.status]}
        color={statusColors[data.status]}
        size="small"
      />
    </Fade>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {showTooltip ? (
        <Tooltip title={tooltipContent} arrow>
          {statusChip}
        </Tooltip>
      ) : (
        statusChip
      )}
      <Typography variant="caption" color="textSecondary">
        Última atualização: {new Date(data.updatedAt).toLocaleString()}
      </Typography>
    </Box>
  );
} 