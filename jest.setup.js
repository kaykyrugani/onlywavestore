// src/components/SEO/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ title, description, keywords, canonicalUrl, ogImage, ogType = 'website' }) => {
  useEffect(() => {
    // Atualizar título
    document.title = title;
    
    // Atualizar meta tags
    const metaTags = {
      description: description,
      keywords: keywords,
      'og:title': title,
      'og:description': description,
      'og:type': ogType,
      'og:image': ogImage,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    };
    
    // Atualizar ou criar meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });
    
    // Atualizar link canônico
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }
    
    // Limpar ao desmontar
    return () => {
      // Opcional: remover meta tags ao desmontar
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType]);
  
  return null; // Este componente não renderiza nada
};

export default SEO;
