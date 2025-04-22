import api from './api.service';

class CartService {
  constructor() {
    this.storageKey = 'onlywave_cart';
  }

  // Métodos de persistência local
  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  // Métodos de manipulação do carrinho
  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => 
      item.id === product.id && item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        quantity
      });
    }

    this.saveCart(cart);
    return cart;
  }

  updateItemQuantity(productId, size, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => 
      item.id === productId && item.size === size
    );

    if (item) {
      item.quantity = Math.max(1, quantity); // Não permite quantidade menor que 1
      this.saveCart(cart);
    }

    return cart;
  }

  removeItem(productId, size) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => 
      !(item.id === productId && item.size === size)
    );
    
    this.saveCart(updatedCart);
    return updatedCart;
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
    return [];
  }

  // Cálculos do carrinho
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemsCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Métodos de sincronização com o backend
  async syncWithServer() {
    try {
      const cart = this.getCart();
      const { data } = await api.post('/cart/sync', { items: cart });
      this.saveCart(data.items);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao sincronizar carrinho');
    }
  }

  async getShippingRates(zipCode) {
    try {
      const cart = this.getCart();
      const { data } = await api.post('/shipping/calculate', {
        items: cart,
        zipCode
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao calcular frete');
    }
  }

  // Validações
  validateStock(productId, size, quantity) {
    // TODO: Implementar validação de estoque com o backend
    return true;
  }
}

export default new CartService(); 