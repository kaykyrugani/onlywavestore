import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ordersService } from '@/services';
import { formatCurrency, formatDate } from '@/utils/format';
import { FaCheckCircle, FaTruck, FaCreditCard, FaHome } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await ordersService.getOrderById(id);
        setOrder(data);
      } catch (error) {
        toast.error('Erro ao carregar pedido');
        console.error('Erro ao buscar pedido:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="error-container">
        <h2>Pedido não encontrado</h2>
        <button onClick={() => navigate('/')}>Voltar à loja</button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'processing':
        return '#17a2b8';
      case 'shipped':
        return '#28a745';
      case 'delivered':
        return '#6c757d';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pagamento Pendente';
      case 'processing':
        return 'Em Processamento';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="order-success-page"
    >
      <div className="success-header">
        <FaCheckCircle className="success-icon" />
        <h1>Pedido Confirmado!</h1>
        <p>Seu pedido foi recebido e está sendo processado.</p>
      </div>

      <div className="order-details">
        <div className="order-info">
          <div className="info-card">
            <h3>Informações do Pedido</h3>
            <div className="info-row">
              <span>Número do Pedido:</span>
              <strong>#{order.id}</strong>
            </div>
            <div className="info-row">
              <span>Data:</span>
              <strong>{formatDate(order.createdAt)}</strong>
            </div>
            <div className="info-row">
              <span>Status:</span>
              <strong style={{ color: getStatusColor(order.status) }}>
                {getStatusText(order.status)}
              </strong>
            </div>
          </div>

          <div className="info-card">
            <h3>Método de Pagamento</h3>
            <div className="payment-method">
              <FaCreditCard />
              <span>{order.payment.method === 'card' ? 'Cartão de Crédito' : 
                     order.payment.method === 'pix' ? 'PIX' : 'Boleto Bancário'}</span>
            </div>
            {order.payment.method === 'card' && (
              <div className="card-info">
                <span>Final {order.payment.cardLastDigits}</span>
                <span>Vencimento: {order.payment.cardExpiry}</span>
              </div>
            )}
          </div>

          <div className="info-card">
            <h3>Endereço de Entrega</h3>
            <div className="address-info">
              <FaHome />
              <div>
                <p>{order.shipping.address.street}, {order.shipping.address.number}</p>
                {order.shipping.address.complement && (
                  <p>Complemento: {order.shipping.address.complement}</p>
                )}
                <p>{order.shipping.address.neighborhood}</p>
                <p>{order.shipping.address.city} - {order.shipping.address.state}</p>
                <p>CEP: {order.shipping.address.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-items">
          <h3>Itens do Pedido</h3>
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Tamanho: {item.size}</p>
                <p>Quantidade: {item.quantity}</p>
              </div>
              <div className="item-price">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="total-row">
              <span>Frete</span>
              <span>{formatCurrency(order.shipping.cost)}</span>
            </div>
            {order.discount > 0 && (
              <div className="total-row discount">
                <span>Desconto</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="total-row total">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-actions">
        <button onClick={() => navigate('/')} className="continue-shopping">
          Continuar Comprando
        </button>
        <button onClick={() => navigate('/cliente/pedidos')} className="view-orders">
          Ver Meus Pedidos
        </button>
      </div>
    </motion.div>
  );
};

export default OrderSuccessPage; 