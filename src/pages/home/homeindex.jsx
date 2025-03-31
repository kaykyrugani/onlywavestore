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
            <h2>Calçados</h2>
            <ProductCarousel products={tenis} />
            <h2>Camisetas</h2>
            <ProductCarousel products={camisetas} />
            <h2>Acessórios</h2>
            <ProductCarousel products={acessorios} />
            <Footer />
        </div>
    );
}

export default Home;
