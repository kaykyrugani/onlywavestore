import React, { useState, useCallback } from 'react';
import '../styles/ProductPage.css';

const ProductPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isAnimating]);

  const prevImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, isAnimating]);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  return (
    <div className="product-page">
      {/* Header - Estrutura básica simulada */}
      <header className="header">
        <nav className="header__nav">
          <div className="header__logo">OnlyWave Store</div>
          <ul className="header__menu">
            <li><a href="/">Home</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li><a href="/carrinho">Carrinho</a></li>
          </ul>
        </nav>
      </header>

      <main className="product-main">
        <div className="product-container">
          {/* Coluna 1 - Carrossel de miniaturas */}
          <div className="product-thumbnails">
            <div className="thumbnails-container">
              <img src="https://example.com/thumbnail1.jpg" alt="Miniatura 1" className="thumbnail" />
              <img src="https://example.com/thumbnail2.jpg" alt="Miniatura 2" className="thumbnail" />
              <img src="https://example.com/thumbnail3.jpg" alt="Miniatura 3" className="thumbnail" />
              <img src="https://example.com/thumbnail4.jpg" alt="Miniatura 4" className="thumbnail" />
            </div>
          </div>

          {/* Coluna 2 - Informações do produto */}
          <div className="product-info">
            <div className="product-image">
              <img src="https://example.com/main-product.jpg" alt="Tênis OnlyWave" />
            </div>

            <div className="product-details">
              <h1 className="product-title">Tênis OnlyWave Premium</h1>
              
              <div className="product-price">
                <span className="current-price">R$ 299,90</span>
                <span className="original-price">R$ 399,90</span>
                <span className="discount">-25%</span>
              </div>

              <div className="size-selector">
                <h3>Tamanhos</h3>
                <div className="size-options">
                  {[37, 38, 39, 40, 41, 42, 43, 44].map(size => (
                    <button key={size} className="size-button">{size}</button>
                  ))}
                </div>
              </div>

              <div className="quantity-selector">
                <h3>Quantidade</h3>
                <div className="quantity-controls">
                  <button className="quantity-btn">-</button>
                  <input type="number" value="1" min="1" className="quantity-input" />
                  <button className="quantity-btn">+</button>
                </div>
              </div>

              <button className="add-to-cart">Adicionar à sacola</button>
            </div>

            {/* Seções de informações */}
            <section className="product-sections">
              <div className="info-section">
                <h2>Descrição do Produto</h2>
                <p>O Tênis OnlyWave Premium é desenvolvido com tecnologia de ponta para oferecer o máximo de conforto e estilo. Ideal para o dia a dia, combina design moderno com funcionalidade.</p>
              </div>

              <div className="info-section">
                <h2>Qualidade do Produto</h2>
                <p>Fabricado com materiais de alta qualidade, nosso tênis passa por rigorosos controles de qualidade para garantir durabilidade e conforto em cada passo.</p>
              </div>

              <div className="info-section">
                <h2>Troca e Devolução</h2>
                <p>Aceitamos trocas e devoluções em até 30 dias após a compra, desde que o produto esteja em sua embalagem original e com a nota fiscal.</p>
              </div>
            </section>

            {/* Seção de avaliações */}
            <section className="product-reviews">
              <h2>Avaliações</h2>
              <p>Este produto ainda não possui avaliações.</p>
              <button className="review-button">Avaliar produto</button>
            </section>

            {/* Produtos relacionados */}
            <section className="related-products">
              <h2>Produtos Relacionados</h2>
              <div className="related-grid">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="related-product">
                    <img src={`https://example.com/related${item}.jpg`} alt={`Produto relacionado ${item}`} />
                    <h3>Tênis OnlyWave Modelo {item}</h3>
                    <a href={`/produto/${item}`}>Ver produto</a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer - Estrutura básica simulada */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sobre nós</h3>
            <p>OnlyWave Store - Sua loja de tênis premium</p>
          </div>
          <div className="footer-section">
            <h3>Contato</h3>
            <p>contato@onlywave.com</p>
          </div>
          <div className="footer-section">
            <h3>Redes Sociais</h3>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage; 