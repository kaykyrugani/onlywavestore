import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ordersService, productsService } from '@/services';
import { formatCurrency, formatCEP, formatPhone } from '@/utils/format';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [validatingStock, setValidatingStock] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      }
    }
  });

  // Máscara de CEP
  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCEP(value);
    setValue('address.zipCode', formattedValue);
  };

  // Máscara de telefone
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatPhone(value);
    setValue('phone', formattedValue);
  };

  // Validação de CEP em tempo real
  const handleZipCodeBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue('address.street', data.logradouro);
          setValue('address.neighborhood', data.bairro);
          setValue('address.city', data.localidade);
          setValue('address.state', data.uf);
        } else {
          toast.error('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        toast.error('Erro ao buscar CEP. Tente novamente.');
      }
    }
  };

  // Validação de estoque
  const validateStock = async () => {
    setValidatingStock(true);
    try {
      for (const item of cartItems) {
        const product = await productsService.getProductById(item.id);
        if (product.stock < item.quantity) {
          toast.error(`Produto ${item.name} não possui estoque suficiente`);
          return false;
        }
      }
      return true;
    } catch (error) {
      toast.error('Erro ao validar estoque');
      return false;
    } finally {
      setValidatingStock(false);
    }
  };

  const onSubmit = async (data) => {
    if (!shippingMethod) {
      toast.error('Selecione um método de entrega');
      return;
    }
    
    if (!paymentMethod) {
      toast.error('Selecione um método de pagamento');
      return;
    }

    // Validar estoque antes de prosseguir
    const stockValid = await validateStock();
    if (!stockValid) return;

    setLoading(true);
    const loadingToast = toast.loading('Finalizando seu pedido...');

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size
        })),
        shipping: {
          method: shippingMethod,
          address: data.address
        },
        payment: {
          method: paymentMethod
        },
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone
        }
      };

      const order = await ordersService.createOrder(orderData);
      toast.dismiss(loadingToast);
      toast.success('Pedido criado com sucesso!');
      
      if (paymentMethod === 'card') {
        const payment = await ordersService.createPaymentIntent(order.id);
        window.location.href = payment.checkoutUrl;
      } else {
        clearCart();
        navigate(`/pedido/${order.id}`);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Erro ao finalizar pedido. Tente novamente.');
      console.error('Erro ao criar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos ao carrinho para continuar com a compra</p>
        <button onClick={() => navigate('/')}>Continuar Comprando</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-content">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            1. Endereço
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            2. Entrega
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            3. Pagamento
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Endereço */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="checkout-step"
            >
              <h2>Endereço de Entrega</h2>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nome completo"
                  {...register('name', { required: 'Nome é obrigatório' })}
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="E-mail"
                    {...register('email', { 
                      required: 'E-mail é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido'
                      }
                    })}
                  />
                  {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Telefone"
                    {...register('phone', { 
                      required: 'Telefone é obrigatório',
                      minLength: {
                        value: 14,
                        message: 'Telefone inválido'
                      }
                    })}
                    onChange={handlePhoneChange}
                  />
                  {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="CEP"
                  {...register('address.zipCode', { 
                    required: 'CEP é obrigatório',
                    pattern: {
                      value: /^\d{5}-\d{3}$/,
                      message: 'CEP inválido'
                    }
                  })}
                  onChange={handleZipCodeChange}
                  onBlur={handleZipCodeBlur}
                />
                {errors.address?.zipCode && (
                  <span className="error">{errors.address.zipCode.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group flex-grow">
                  <input
                    type="text"
                    placeholder="Rua"
                    {...register('address.street', { required: 'Rua é obrigatória' })}
                  />
                  {errors.address?.street && (
                    <span className="error">{errors.address.street.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Número"
                    {...register('address.number', { required: 'Número é obrigatório' })}
                  />
                  {errors.address?.number && (
                    <span className="error">{errors.address.number.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Complemento (opcional)"
                  {...register('address.complement')}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Bairro"
                    {...register('address.neighborhood', { required: 'Bairro é obrigatório' })}
                  />
                  {errors.address?.neighborhood && (
                    <span className="error">{errors.address.neighborhood.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Cidade"
                    {...register('address.city', { required: 'Cidade é obrigatória' })}
                  />
                  {errors.address?.city && (
                    <span className="error">{errors.address.city.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Estado"
                    {...register('address.state', { required: 'Estado é obrigatório' })}
                  />
                  {errors.address?.state && (
                    <span className="error">{errors.address.state.message}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={nextStep}>
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Entrega */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="checkout-step"
            >
              <h2>Método de Entrega</h2>

              <div className="shipping-methods">
                <label className={`shipping-method ${shippingMethod === 'express' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className="method-content">
                    <h3>Entrega Expressa</h3>
                    <p>Receba em até 2 dias úteis</p>
                    <span className="price">R$ 25,90</span>
                  </div>
                </label>

                <label className={`shipping-method ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className="method-content">
                    <h3>Entrega Padrão</h3>
                    <p>Receba em até 7 dias úteis</p>
                    <span className="price">R$ 15,90</span>
                  </div>
                </label>

                <label className={`shipping-method ${shippingMethod === 'free' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value="free"
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className="method-content">
                    <h3>Entrega Econômica</h3>
                    <p>Receba em até 12 dias úteis</p>
                    <span className="price">Grátis</span>
                  </div>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep}>
                  Voltar
                </button>
                <button type="button" onClick={nextStep}>
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pagamento */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="checkout-step"
            >
              <h2>Método de Pagamento</h2>

              <div className="payment-methods">
                <label className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-content">
                    <h3>Cartão de Crédito</h3>
                    <p>Parcele em até 12x</p>
                  </div>
                </label>

                <label className={`payment-method ${paymentMethod === 'pix' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-content">
                    <h3>PIX</h3>
                    <p>5% de desconto</p>
                  </div>
                </label>

                <label className={`payment-method ${paymentMethod === 'boleto' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="boleto"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="method-content">
                    <h3>Boleto Bancário</h3>
                    <p>3% de desconto</p>
                  </div>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep}>
                  Voltar
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Finalizando...' : 'Finalizar Compra'}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Resumo do pedido */}
      <div className="order-summary">
        <h2>Resumo do Pedido</h2>
        
        <div className="summary-items">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="summary-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Tamanho: {item.size}</p>
                <p>Quantidade: {item.quantity}</p>
              </div>
              <span className="item-price">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(getTotal())}</span>
          </div>
          
          <div className="summary-row">
            <span>Frete</span>
            <span>
              {shippingMethod === 'express' && 'R$ 25,90'}
              {shippingMethod === 'standard' && 'R$ 15,90'}
              {shippingMethod === 'free' && 'Grátis'}
              {!shippingMethod && '--'}
            </span>
          </div>

          {(paymentMethod === 'pix' || paymentMethod === 'boleto') && (
            <div className="summary-row discount">
              <span>Desconto</span>
              <span>
                {paymentMethod === 'pix' && `- ${formatCurrency(getTotal() * 0.05)}`}
                {paymentMethod === 'boleto' && `- ${formatCurrency(getTotal() * 0.03)}`}
              </span>
            </div>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span>
              {formatCurrency(
                getTotal() +
                (shippingMethod === 'express' ? 25.9 :
                 shippingMethod === 'standard' ? 15.9 : 0) -
                (paymentMethod === 'pix' ? getTotal() * 0.05 :
                 paymentMethod === 'boleto' ? getTotal() * 0.03 : 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 