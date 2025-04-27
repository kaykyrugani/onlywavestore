import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPiggyBank, faCreditCard, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Hero.module.css';

const heroImages = [
    "https://png.pngtree.com/png-clipart/20210123/ourmid/pngtree-black-numbers-cool-no-1-png-image_2786897.jpg",
    "https://w7.pngwing.com/pngs/414/624/png-transparent-brand-black-and-white-angle-number-2-text-monochrome-black-thumbnail.png"
];

const ANIMATION_DURATION = 400; // ms
const IMAGE_INTERVAL = 7000; // ms

function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [nextIndex, setNextIndex] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNextIndex((activeIndex + 1) % heroImages.length);
            setAnimating(true);
        }, IMAGE_INTERVAL);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    useEffect(() => {
        if (animating) {
            const animTimer = setTimeout(() => {
                setActiveIndex(nextIndex);
                setAnimating(false);
                setNextIndex(null);
            }, ANIMATION_DURATION);
            return () => clearTimeout(animTimer);
        }
    }, [animating, nextIndex]);

    return (
        <div className={styles.hero}>
            <div className={styles.imgs}>
                <div className={styles.heroImgWrapper}>
                    <img
                        src={heroImages[activeIndex]}
                        alt={`Imagem ${activeIndex + 1}`}
                        className={
                            styles.heroImage +
                            (animating ? ' ' + styles.slideOut : '')
                        }
                        style={{ zIndex: 1 }}
                    />
                    {animating && (
                        <img
                            src={heroImages[nextIndex]}
                            alt={`Imagem ${nextIndex + 1}`}
                            className={styles.heroImage + ' ' + styles.slideIn}
                            style={{ zIndex: 2 }}
                        />
                    )}
                </div>
            </div>
            <div className={styles.infos}>
                <p>
                    <FontAwesomeIcon icon={faTruck} className={styles.infoicon} />
                    Frete grátis, expresso para <span>todo Brasil</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faPiggyBank} className={styles.infoicon} />
                    5% OFF via <span>pix</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faCreditCard} className={styles.infoicon} />
                    Parcele em até 12x no <span>cartão de crédito</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faRotateLeft} className={styles.infoicon} />
                    Troque ou devolva em até <span>7 dias após a entrega</span>
                </p>
            </div>
        </div>
    );
}

export default Hero;