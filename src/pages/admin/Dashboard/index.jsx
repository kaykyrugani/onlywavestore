import React from 'react';
import { FaUsers, FaShoppingCart, FaDollarSign, FaChartLine } from 'react-icons/fa';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaUsers />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Total de Usuários</h3>
            <p className={styles.cardValue}>1,234</p>
            <p className={`${styles.cardChange} ${styles.cardChangePositive}`}>
              <FaChartLine /> +12% desde o último mês
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaShoppingCart />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Total de Pedidos</h3>
            <p className={styles.cardValue}>567</p>
            <p className={`${styles.cardChange} ${styles.cardChangePositive}`}>
              <FaChartLine /> +8% desde o último mês
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaDollarSign />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Receita Total</h3>
            <p className={styles.cardValue}>R$ 89,432</p>
            <p className={`${styles.cardChange} ${styles.cardChangePositive}`}>
              <FaChartLine /> +15% desde o último mês
            </p>
          </div>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Vendas por Mês</h2>
          <div className={styles.chartContent}>
            Gráfico de vendas será implementado aqui
          </div>
        </div>

        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Produtos Mais Vendidos</h2>
          <div className={styles.chartContent}>
            Gráfico de produtos será implementado aqui
          </div>
        </div>
      </div>
    </div>
  );
} 