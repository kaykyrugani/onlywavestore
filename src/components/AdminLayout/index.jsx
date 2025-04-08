import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaChartBar, FaCog } from 'react-icons/fa';
import styles from './AdminLayout.module.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/produtos', icon: <FaBox />, label: 'Produtos' },
    { path: '/admin/usuarios', icon: <FaUsers />, label: 'Usuários' },
    { path: '/admin/pedidos', icon: <FaShoppingCart />, label: 'Pedidos' },
    { path: '/admin/relatorios', icon: <FaChartBar />, label: 'Relatórios' },
    { path: '/admin/configuracoes', icon: <FaCog />, label: 'Configurações' },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.adminSidebar}>
        <div className={styles.adminSidebarHeader}>
          <h1>OnlyWave Admin</h1>
        </div>
        <nav className={styles.adminSidebarNav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.adminSidebarLink} ${location.pathname === item.path ? styles.active : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div className={styles.adminHeaderUser}>
            <span>Admin</span>
          </div>
        </header>
        <div className={styles.adminContent}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 