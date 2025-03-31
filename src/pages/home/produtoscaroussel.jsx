import React, { useState } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faChevronLeft, faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons"; 

// Componente ProductCarousel que recebe uma lista de produtos como props
const ProductCarousel = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para rastrear o índice atual do carrossel
    const itemsPerPage = 4; // Número de produtos a serem exibidos por página
    const totalPages = Math.ceil(products.length / itemsPerPage); // Calcula o número total de páginas com base na quantidade de produtos

    // Função para avançar para o próximo slide
    const nextSlide = () => {
        if (currentIndex < totalPages - 1) { // Verifica se não está na última página
            setCurrentIndex(currentIndex + 1); // Avança para o próximo índice
        }
    };

    // Função para voltar ao slide anterior
    const prevSlide = () => {
        if (currentIndex > 0) { // Verifica se não está na primeira página
            setCurrentIndex(currentIndex - 1); // Retorna ao índice anterior
        }
    };

    // Calcula o início e o fim dos produtos visíveis com base no índice atual
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    const visibleProducts = products.slice(start, end); // Seleciona os produtos que devem ser exibidos na página atual

    return (
        <div className="carousel-container"> {/* Contêiner principal do carrossel */}
            {/* Botões de navegação posicionados acima */}
            <div className="carousel-controls">
                <button onClick={prevSlide} disabled={currentIndex === 0}> {/* Botão para voltar ao slide anterior */}
                    <FontAwesomeIcon icon={faChevronLeft} /> {/* Ícone de seta para a esquerda */}
                </button>
                <button onClick={nextSlide} disabled={currentIndex === totalPages - 1}> {/* Botão para avançar ao próximo slide */}
                    <FontAwesomeIcon icon={faChevronRight} /> {/* Ícone de seta para a direita */}
                </button>
            </div>

            {/* Carrossel de produtos */}
            <div className="carousel">
                {visibleProducts.map((product) => ( // Mapeia os produtos visíveis para criar os cartões de produto
                    <div key={product.id} className="product-card"> {/* Cada cartão de produto */}
                        <div className="product-image">
                            <img src={product.imagem} alt={product.nome} /> {/* Imagem do produto */}
                            {product.promocao && ( // Verifica se o produto está em promoção
                                <FontAwesomeIcon icon={faTag} className="promo-icon" /> 
                            )}
                        </div>
                        <div className="product-info"> {/* Informações do produto */}
                            <div className="product-name">{product.nome}</div> {/* Nome do produto */}
                            <div className="product-price">R$ {product.preco.toFixed(2)}</div> {/* Preço do produto formatado */}
                            <div className="product-promo">{product.divisao}</div> {/* Divisão ou categoria do produto */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação */}
            <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => ( // Cria um array de pontos para a paginação
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`} // Adiciona classe "active" ao ponto correspondente à página atual
                        onClick={() => setCurrentIndex(index)} // Altera o índice atual ao clicar no ponto
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel; 
