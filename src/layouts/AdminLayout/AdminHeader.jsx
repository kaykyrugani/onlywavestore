import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import styles from './AdminHeader.module.css';

export default function AdminHeader({ onToggleDrawer, darkMode, onToggleDarkMode }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    handleClose();
  };

  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="abrir menu"
          onClick={onToggleDrawer}
          edge="start"
          className={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={styles.title}>
          OnlyWave Admin
        </Typography>

        <div className={styles.actions}>
          <IconButton color="inherit" onClick={onToggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            aria-label="conta do usuário"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar className={styles.avatar}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </div>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
} 