import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website'
}) => {
  // Título padrão da loja
  const defaultTitle = 'OnlyWave Store - Sua moda, nossa onda';
  // Descrição padrão da loja
  const defaultDescription = 'OnlyWave Store - Sua moda, nossa onda. Encontre as melhores roupas, tênis e acessórios com frete grátis para todo o Brasil.';
  
  // Título formatado: se houver título específico, adiciona o nome da loja
  const formattedTitle = title ? `${title} | OnlyWave Store` : defaultTitle;
  
  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
