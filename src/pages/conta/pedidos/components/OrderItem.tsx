import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { OrderItem as OrderItemType } from '../../../../services/order.service';
import { formatCurrency } from '../../../../utils/formatters';

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <Box sx={{ py: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Produto #{item.productId}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="textSecondary">
            Quantidade: {item.quantity}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="textSecondary">
            Preço: {formatCurrency(item.price)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderItem; 