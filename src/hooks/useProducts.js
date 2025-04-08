import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useProducts = create(
  devtools(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      categories: [],
      isLoading: false,
      error: null,
      filters: {
        category: null,
        priceRange: null,
        search: '',
        sort: 'name',
      },

      setProducts: (products) => {
        set({ products, filteredProducts: products });
      },

      setCategories: (categories) => {
        set({ categories });
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
        get().applyFilters();
      },

      applyFilters: () => {
        const { products, filters } = get();
        let filtered = [...products];

        // Filtro por categoria
        if (filters.category) {
          filtered = filtered.filter(
            (product) => product.category === filters.category
          );
        }

        // Filtro por faixa de preço
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          filtered = filtered.filter(
            (product) => product.price >= min && product.price <= max
          );
        }

        // Filtro por busca
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filtered = filtered.filter(
            (product) =>
              product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm)
          );
        }

        // Ordenação
        switch (filters.sort) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }

        set({ filteredProducts: filtered });
      },

      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simular chamada à API
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Falha ao carregar produtos');
          }
          const data = await response.json();
          set({
            products: data.products,
            filteredProducts: data.products,
            categories: data.categories,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      fetchProductById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // Simular chamada à API
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error('Produto não encontrado');
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

      clearFilters: () => {
        set({
          filters: {
            category: null,
            priceRange: null,
            search: '',
            sort: 'name',
          },
        });
        get().applyFilters();
      },
    })
  )
);

export default useProducts; 