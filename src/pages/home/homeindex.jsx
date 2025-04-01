import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './header';
import Hero from './hero';
import ProductCarousel from "./produtoscaroussel";
import { tenis, camisetas, acessorios } from "./produtoscards";
import Footer from './footer';

function Home() {
    return (
        <div className="home">
            <Header />
            <Hero />
            
            {/* Carrossel de Calçados com título específico */}
            <ProductCarousel 
                products={tenis} 
                title="Calçados" 
            />
            
            <ProductCarousel 
                products={camisetas} 
                title="Camisetas" 
            />
            
            <ProductCarousel 
                products={acessorios} 
                title="Acessórios" 
            />
            
            <Footer />
        </div>
    );
}

export default Home;
