import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import styles from './Cart.module.css';

const CartPage = () => {
  return (
    <Container className={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Meu Carrinho
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Seu carrinho está vazio.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/produtos"
            className={styles.button}
          >
            Continuar Comprando
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage; 