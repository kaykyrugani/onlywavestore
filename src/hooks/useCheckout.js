import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useCheckout = create(
  devtools(
    (set, get) => ({
      step: 1,
      shippingAddress: null,
      paymentMethod: null,
      orderSummary: null,
      isLoading: false,
      error: null,

      setStep: (step) => {
        set({ step });
      },

      setShippingAddress: (address) => {
        set({ shippingAddress: address });
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },

      setOrderSummary: (summary) => {
        set({ orderSummary: summary });
      },

      calculateShipping: async (address) => {
        set({ isLoading: true, error: null });
        try {
          // Simular chamada à API
          const response = await fetch('/api/shipping/calculate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(address),
          });

          if (!response.ok) {
            throw new Error('Falha ao calcular frete');
          }

          const data = await response.json();
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return null;
        }
      },

      processPayment: async (paymentData) => {
        set({ isLoading: true, error: null });
        try {
          // Simular chamada à API
          const response = await fetch('/api/payment/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          if (!response.ok) {
            throw new Error('Falha no processamento do pagamento');
          }

          const data = await response.json();
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return null;
        }
      },

      createOrder: async (orderData) => {
        set({ isLoading: true, error: null });
        try {
          // Simular chamada à API
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            throw new Error('Falha ao criar pedido');
          }

          const data = await response.json();
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return null;
        }
      },

      resetCheckout: () => {
        set({
          step: 1,
          shippingAddress: null,
          paymentMethod: null,
          orderSummary: null,
          error: null,
        });
      },
    })
  )
);

export default useCheckout; 