import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTag, faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import ProductCard from "../ProductCard/ProductCard";
import styles from './Produtocarousel.module.css';

const ProductCarousel = ({ products, title, categorySlug }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(totalPages <= 1);

  useEffect(() => {
    // Atualiza os indicadores de navegação ao mudar o índice atual
    setIsAtStart(currentIndex === 0);
    setIsAtEnd(currentIndex === totalPages - 1);
  }, [currentIndex, totalPages]);

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Função para formatar preço com separador de milhares
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Função para calcular porcentagem de desconto
  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  // Função para renderizar avaliações em estrelas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={fasStar} className={styles.starFilled} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={farStar} className={styles.starEmpty} />
        );
      }
    }

    return stars;
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {title || "Produtos"}
        </h2>
        <Link to={`/produtos/${categorySlug}`} className={styles.verMaisLink}>
          Ver mais
        </Link>
      </div>

      <div className={styles.carouselControls}>
        <button
          onClick={prevSlide}
          disabled={isAtStart}
          aria-label="Slide anterior"
          className={isAtStart ? styles.navDisabled : ""}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAtEnd}
          aria-label="Próximo slide"
          className={isAtEnd ? styles.navDisabled : ""}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className={styles.carouselWrapper}>
        {/* Indicador da borda esquerda */}
        <div className={`${styles.edgeIndicator} ${styles.left} ${isAtStart ? styles.hidden : ''}`}></div>

        <div
          className={styles.carousel}
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {products.map((product) => {
            // Assume preço com desconto de 10% para produtos em promoção
            const discountedPrice = product.promocao ? product.preco * 0.9 : null;

            return (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.imagem || "https://via.placeholder.com/200x200"} alt={product.nome} />
                  {product.promocao && (
                    <div className={styles.discountTag}>
                      -{calculateDiscount(product.preco, discountedPrice)}%
                    </div>
                  )}
                </div>

                <div className={styles.productRating}>
                  {renderStars(product.avaliacoes)}
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>{product.nome}</div>

                  <div className={styles.productPriceContainer}>
                    {product.promocao ? (
                      <>
                        <span className={styles.originalPrice}>{formatPrice(product.preco)}</span>
                        <span className={styles.discountedPrice}>{formatPrice(discountedPrice)}</span>
                      </>
                    ) : (
                      <div className={styles.productPrice}>{formatPrice(product.preco)}</div>
                    )}
                  </div>

                  <div
                    className={styles.productInstallment}
                    dangerouslySetInnerHTML={{ __html: product.divisao }}
                  ></div>

                  <button className={styles.productButton}>Comprar</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador da borda direita */}
        <div className={`${styles.edgeIndicator} ${styles.right} ${isAtEnd ? styles.hidden : ''}`}></div>
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => setCurrentIndex(index)}
            role="button"
            aria-label={`Ir para slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;