import React from 'react';
import SEO from '../../components/SEO/SEO';

const orderSuccessSchema = {
  "@context": "https://schema.org",
  "@type": "Order",
  "orderStatus": "https://schema.org/OrderDelivered",
  "merchant": {
    "@type": "Organization",
    "name": "OnlyWave Store"
  },
  "potentialAction": {
    "@type": "ViewAction",
    "target": "https://onlywave.com.br/conta/pedidos"
  }
};

const SuccessPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <SEO
        title="Pedido realizado com sucesso! | OnlyWave Store"
        description="Seu pedido foi realizado com sucesso na OnlyWave Store. Confira detalhes, rastreio e acompanhe seu histórico de compras."
        jsonLd={orderSuccessSchema}
        canonical="https://onlywave.com.br/sucesso"
      />
      <h1>Pedido realizado com sucesso!</h1>
      <p>Obrigado por comprar na OnlyWave Store. Em breve você receberá um e-mail com os detalhes do pedido.</p>
      <p>Você pode acompanhar o status e rastreamento na sua <a href="/conta/pedidos">página de pedidos</a>.</p>
    </div>
  );
};

export default SuccessPage;
