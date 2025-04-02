import React from 'react';
import './style.css';
import { motion } from 'framer-motion';

import Header from './header';
import Hero from './hero';
import ProductCarousel from "./produtoscaroussel";
import { tenis, camisetas, acessorios } from "./produtoscards";
import Footer from './footer';

// Configuração da animação de página
const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

function Home() {
    return (
        <div className="home">
            <Header />
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="page-content"
            >
                <Hero />
                
                {/* Carrossel de Calçados com título específico e slug da categoria */}
                <ProductCarousel 
                    products={tenis} 
                    title="Calçados" 
                    categorySlug="tenis"
                />
                
                <ProductCarousel 
                    products={camisetas} 
                    title="Camisetas" 
                    categorySlug="camisetas"
                />
                
                <ProductCarousel 
                    products={acessorios} 
                    title="Acessórios" 
                    categorySlug="acessorios"
                />
            </motion.div>
            <Footer />
        </div>
    );
}

export default Home;
