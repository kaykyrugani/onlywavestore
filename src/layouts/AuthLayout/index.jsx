import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Box className={styles.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Link to="/" className={styles.logo}>
            <img 
              src="/logo.png" 
              alt="OnlyWave" 
              height="40"
            />
          </Link>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" className={styles.main}>
        {children}
      </Container>

      <Box component="footer" className={styles.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} OnlyWave. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout; 