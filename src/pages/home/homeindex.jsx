import React from "react";
import { useCart } from "../../contexts/CartContext";
import Hero from "../../components/Hero";
import ProductCarousel from "../../components/ProdutosCaroussel/index";
import { tenis, camisetas, acessorios } from "./produtoscards";
import SEO from "../../components/SEO/SEO";

function Home() {
  const { cartItems } = useCart();

  return (
    <div className="Home">
      <SEO title="Home" description="Bem-vindo à OnlyWave Store - Sua moda, nossa onda. Veja os melhores tênis, camisetas e acessórios em destaque." />
      <Hero />
      <ProductCarousel 
        products={tenis} 
        title="Tênis em Destaque" 
        categorySlug="tenis" 
      />
      <ProductCarousel 
        products={camisetas} 
        title="Camisetas em Promoção" 
        categorySlug="camisetas" 
      />
      <ProductCarousel 
        products={acessorios} 
        title="Acessórios Populares" 
        categorySlug="acessorios" 
      />
    </div>
  );
}

export default Home;