import api from './api';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  media: MediaItem[]; // Array de imagens e vídeos
  features: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  media: MediaItem[]; // Array de imagens e vídeos
  features: string[];
  specifications: Record<string, string>;
}

export interface UpdateProductData extends Partial<CreateProductData> {}

class ProductService {
  async list(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products');
    return response.data;
  }

  async getById(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }

  async create(data: CreateProductData): Promise<Product> {
    const response = await api.post<Product>('/products', data);
    return response.data;
  }

  async update(id: string, data: UpdateProductData): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  async search(query: string): Promise<Product[]> {
    const response = await api.get<Product[]>(`/products/search?q=${query}`);
    return response.data;
  }

  async getByCategory(category: string): Promise<Product[]> {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  }

  async addMedia(productId: string, mediaItem: MediaItem): Promise<Product> {
    const product = await this.getById(productId);
    const updatedProduct = {
      ...product,
      media: [...product.media, mediaItem]
    };
    return this.update(productId, updatedProduct);
  }

  async removeMedia(productId: string, mediaUrl: string): Promise<Product> {
    const product = await this.getById(productId);
    const updatedProduct = {
      ...product,
      media: product.media.filter(item => item.url !== mediaUrl)
    };
    return this.update(productId, updatedProduct);
  }

  async reorderMedia(productId: string, mediaUrls: string[]): Promise<Product> {
    const product = await this.getById(productId);
    const updatedProduct = {
      ...product,
      media: mediaUrls.map(url => 
        product.media.find(item => item.url === url)
      ).filter(Boolean)
    };
    return this.update(productId, updatedProduct);
  }
}

export const productService = new ProductService(); 