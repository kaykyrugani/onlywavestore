import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPiggyBank, faCreditCard, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function Hero() {
    return (
        <div className="Hero">
            <div className="Imgs">
                <img src="" alt="" />
                <img src="" alt="" />
            </div>{/* imgs */}
            <div className="Infos">
                <p>
                    <FontAwesomeIcon icon={faTruck} className="info-icon" /> 
                    Frete grátis, expresso para <br /> 
                    <span className="info-text">todo Brasil</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faPiggyBank} className="info-icon" /> 
                    5% OFF via <br />
                    <span className="info-text">pix</span> 
                </p>
                <p>
                    <FontAwesomeIcon icon={faCreditCard} className="info-icon" /> 
                    Parcele em até 12x no <br /> 
                    <span className="info-text">cartão de crédito</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faRotateLeft} className="info-icon" /> 
                    Troque ou devolva em até <br /> 
                    <span className="info-text">7 dias após a entrega</span>
                </p>
            </div> {/* infos */}
        </div> //hero
    )
}

export default Hero;
