import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPiggyBank, faCreditCard, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Hero.module.css';

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.imgs}>
                <img src="" alt="Imagem 1" />
                <img src="" alt="Imagem 2" />
            </div>
            <div className={styles.infos}>
                <p>
                    <FontAwesomeIcon icon={faTruck} className={styles.infoicon} />
                    Frete grátis, expresso para <br />
                    <span className={styles.infotext}>todo Brasil</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faPiggyBank} className={styles.infoicon} />
                    5% OFF via <br />
                    <span className={styles.infotext}>pix</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faCreditCard} className={styles.infoicon} />
                    Parcele em até 12x no <br />
                    <span className={styles.infotext}>cartão de crédito</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faRotateLeft} className={styles.infoicon} />
                    Troque ou devolva em até <br />
                    <span className={styles.infotext}>7 dias após a entrega</span>
                </p>
            </div>
        </div>
    );
}

export default Hero;