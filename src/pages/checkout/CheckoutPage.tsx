import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { couponService } from '../../services/coupon.service';
import { orderService } from '../../services/order.service';
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pixCode, setPixCode] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, cartItems, navigate]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Digite um código de cupom');
      return;
    }

    setCouponError('');
    try {
      const coupon = await couponService.validate(couponCode);
      if (coupon) {
        const discountAmount = await couponService.calculateDiscount(couponCode, calculateTotal());
        setDiscount(discountAmount);
        toast.success('Cupom aplicado com sucesso!');
      }
    } catch (error) {
      setCouponError('Cupom inválido ou expirado');
      toast.error('Erro ao aplicar cupom');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProcessOrder = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para finalizar a compra');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod: 'PIX' as const,
        shippingAddress: {
          street: user.address?.street || '',
          number: user.address?.number || '',
          complement: user.address?.complement || '',
          neighborhood: user.address?.neighborhood || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || ''
        }
      };

      const order = await orderService.create(orderData);
      const pixData = await orderService.generatePixPayment(order.id);
      setPixCode(pixData.qrCode);
      clearCart();
      toast.success('Pedido criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao processar pedido');
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Finalizar Compra
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resumo do Pedido
          </Typography>
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', mb: 1 }}>
              <Box sx={{ flex: '0 0 66.666667%' }}>
                <Typography>{item.name}</Typography>
              </Box>
              <Box sx={{ flex: '0 0 33.333333%', textAlign: 'right' }}>
                <Typography>
                  {item.quantity}x R$ {item.price.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Box sx={{ flex: '0 0 66.666667%' }}>
              <Typography variant="subtitle1">Subtotal</Typography>
            </Box>
            <Box sx={{ flex: '0 0 33.333333%', textAlign: 'right' }}>
              <Typography variant="subtitle1">
                R$ {calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
          {discount > 0 && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Box sx={{ flex: '0 0 66.666667%' }}>
                <Typography variant="subtitle1" color="success.main">
                  Desconto
                </Typography>
              </Box>
              <Box sx={{ flex: '0 0 33.333333%', textAlign: 'right' }}>
                <Typography variant="subtitle1" color="success.main">
                  - R$ {discount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Box sx={{ flex: '0 0 66.666667%' }}>
              <Typography variant="h6">Total</Typography>
            </Box>
            <Box sx={{ flex: '0 0 33.333333%', textAlign: 'right' }}>
              <Typography variant="h6">
                R$ {(calculateTotal() - discount).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Cupom de Desconto
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: '0 0 66.666667%' }}>
              <TextField
                fullWidth
                label="Código do Cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                error={!!couponError}
                helperText={couponError}
              />
            </Box>
            <Box sx={{ flex: '0 0 33.333333%' }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleApplyCoupon}
                disabled={loading}
                sx={{ height: '100%' }}
              >
                Aplicar
              </Button>
            </Box>
          </Box>
        </Box>

        {pixCode ? (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Pagamento via PIX
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Escaneie o código PIX abaixo para realizar o pagamento
            </Typography>
            <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 1,
                display: 'inline-block',
              }}
            >
              <img
                src={`data:image/png;base64,${pixCode}`}
                alt="Código PIX"
                style={{ maxWidth: '200px' }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleProcessOrder}
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Finalizar Compra'
              )}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}; 