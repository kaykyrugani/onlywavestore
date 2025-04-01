import React, { useState, useEffect } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faChevronLeft, faChevronRight, faTag, faStar as fasStar } from "@fortawesome/free-solid-svg-icons"; 
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "./style.css";

const ProductCarousel = ({ products, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(totalPages <= 1);

    useEffect(() => {
        // Update navigation limit indicators when currentIndex changes
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

    // Function to format price with thousand separator
    const formatPrice = (price) => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
    };

    // Function to calculate discount percentage
    const calculateDiscount = (originalPrice, discountedPrice) => {
        const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return Math.round(discount);
    };

    // Function to render star ratings
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <FontAwesomeIcon 
                        key={i} 
                        icon={fasStar} 
                        className="star-filled" 
                    />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon 
                        key={i} 
                        icon={farStar} 
                        className="star-empty" 
                    />
                );
            }
        }
        
        return stars;
    };

    return (
        <div className="carousel-container">
            <div className="section-header">
                <h2 className="section-title carousel-heading">
                    {title || "Produtos"}
                </h2>
                <a href="#" className="ver-mais-link">Ver mais</a>
            </div>
            
            <div className="carousel-controls">
                <button 
                    onClick={prevSlide} 
                    disabled={isAtStart}
                    aria-label="Slide anterior"
                    className={isAtStart ? "nav-disabled" : ""}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                    onClick={nextSlide} 
                    disabled={isAtEnd}
                    aria-label="Próximo slide"
                    className={isAtEnd ? "nav-disabled" : ""}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            <div className="carousel-wrapper">
                {/* Left edge indicator */}
                <div className={`edge-indicator left ${isAtStart ? 'hidden' : ''}`}></div>
                
                <div 
                    className="carousel" 
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                >
                    {products.map((product) => {
                        // Assume discounted price is 10% off for products with promotion
                        const discountedPrice = product.promocao 
                            ? product.preco * 0.9 
                            : null;
                        
                        return (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.imagem || "https://via.placeholder.com/200x200"} alt={product.nome} />
                                    {product.promocao && (
                                        <div className="discount-tag">
                                            -{calculateDiscount(product.preco, discountedPrice)}%
                                        </div>
                                    )}
                                </div>
                                
                                <div className="product-rating">
                                    {renderStars(product.avaliacoes)}
                                </div>
                                
                                <div className="product-info">
                                    <div className="product-title">{product.nome}</div>
                                    
                                    <div className="product-price-container">
                                        {product.promocao ? (
                                            <>
                                                <span className="original-price">{formatPrice(product.preco)}</span>
                                                <span className="discounted-price">{formatPrice(discountedPrice)}</span>
                                            </>
                                        ) : (
                                            <div className="product-price">{formatPrice(product.preco)}</div>
                                        )}
                                    </div>
                                    
                                    <div className="product-installment" dangerouslySetInnerHTML={{ __html: product.divisao }}></div>
                                    
                                    <button className="product-button">Comprar</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Right edge indicator */}
                <div className={`edge-indicator right ${isAtEnd ? 'hidden' : ''}`}></div>
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
