import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const { theme } = useTheme();

  return (
    <Box className={`${styles.root} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <AdminHeader />
      <Box className={styles.container}>
        <AdminSidebar />
        <Container component="main" className={styles.main}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout; 