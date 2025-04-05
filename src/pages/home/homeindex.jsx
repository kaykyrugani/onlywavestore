import React from "react";
import { useCart } from "../../contexts/CartContext";
import Header from "../../components/Header"; // Importando o Header
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import ProductCarousel from "../../components/ProdutosCaroussel/index";
import { tenis, camisetas, acessorios } from "./produtoscards";

function Home() {
  const { cartItems } = useCart();

  return (
    <div className="Home">
      <Header /> {/* Usando o Header importado */}
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
      <Footer />
    </div>
  );
}

export default Home;