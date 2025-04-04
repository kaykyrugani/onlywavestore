import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"; 
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductCarousel.module.css";

const ProductCarousel = ({ products, title, categorySlug }) => {
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

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                    {title || "Produtos"}
                </h2>
                {/* Link para a página de categoria */}
                <Link to={`/produtos/${categorySlug}`} className={styles.verMaisLink}>Ver mais</Link>
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
                {/* Left edge indicator */}
                <div className={`${styles.edgeIndicator} ${styles.left} ${isAtStart ? styles.hidden : ''}`}></div>
                
                <div 
                    className={styles.carousel} 
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                >
                    {products.map((product) => (
                        <div key={product.id} className={styles.carouselItem}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                
                {/* Right edge indicator */}
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
                        tabIndex={0}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
