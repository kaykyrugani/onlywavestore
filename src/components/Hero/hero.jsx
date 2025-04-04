import React from "react";
import { faTruck, faPiggyBank, faCreditCard, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import InfoCard from '../InfoCard/InfoCard';
import Container from '../Container/Container';
import styles from './Hero.module.css';

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.imgs}>
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
            <Container>
                <div className={styles.infos}>
                    <InfoCard 
                        icon={faTruck} 
                        text="Frete grátis, expresso para" 
                        highlightText="todo Brasil" 
                    />
                    <InfoCard 
                        icon={faPiggyBank} 
                        text="5% OFF via" 
                        highlightText="pix" 
                    />
                    <InfoCard 
                        icon={faCreditCard} 
                        text="Parcele em até 12x no" 
                        highlightText="cartão de crédito" 
                    />
                    <InfoCard 
                        icon={faRotateLeft} 
                        text="Troque ou devolva em até" 
                        highlightText="7 dias após a entrega" 
                    />
                </div>
            </Container>
        </div>
    );
}

export default Hero;
