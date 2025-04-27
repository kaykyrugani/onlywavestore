import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  Category as CategoriesIcon,
  Inventory as ProductsIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Assessment as ReportsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Pedidos', icon: <OrdersIcon />, path: '/admin/orders' },
  { text: 'Produtos', icon: <ProductsIcon />, path: '/admin/products' },
  { text: 'Categorias', icon: <CategoriesIcon />, path: '/admin/categories' },
  { text: 'Usuários', icon: <UsersIcon />, path: '/admin/users' },
  { text: 'Relatórios', icon: <ReportsIcon />, path: '/admin/reports' },
  { text: 'Configurações', icon: <SettingsIcon />, path: '/admin/settings' }
];

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: '64px', // Altura do AppBar
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default AdminSidebar; 