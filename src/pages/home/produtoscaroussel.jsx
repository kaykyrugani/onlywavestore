import React, { useState } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faChevronLeft, faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons"; 
import "./style.css"; // Garantindo que o CSS está importado corretamente

const ProductCarousel = ({ products, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);

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

    // Importante: Agora vamos mostrar TODOS os produtos no DOM, mas só exibir visualmente os atuais
    // Isso permite que a navegação funcione corretamente com CSS

    return (
        <div className="carousel-container">
            <h2 
                className="section-title carousel-heading"
                style={{ 
                    color: 'var(--cor-primaria)', 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    marginBottom: '16px',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                {title || "Produtos"}
            </h2>
            
            <div className="carousel-controls">
                <button 
                    onClick={prevSlide} 
                    disabled={currentIndex === 0}
                    aria-label="Slide anterior"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                    onClick={nextSlide} 
                    disabled={currentIndex === totalPages - 1}
                    aria-label="Próximo slide"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            <div className="carousel-wrapper">
                <div 
                    className="carousel" 
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.imagem} alt={product.nome} />
                                {product.promocao && (
                                    <FontAwesomeIcon 
                                        icon={faTag} 
                                        className="promo-icon"
                                        style={{ color: 'var(--cor-primaria)' }}
                                    />
                                )}
                            </div>
                            <div className="product-info">
                                <div className="product-name">{product.nome}</div>
                                <div className="product-price">R$ {product.preco.toFixed(2)}</div>
                                <div className="product-promo" dangerouslySetInnerHTML={{ __html: product.divisao }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
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