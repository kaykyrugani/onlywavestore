import api from './api';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  estoque: number;
  destaque: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProdutosResponse {
  data: Produto[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface ProdutoFiltros {
  categoria?: string;
  search?: string;
  page?: number;
  limit?: number;
  destaque?: boolean;
  orderBy?: 'preco' | 'nome' | 'createdAt';
  order?: 'asc' | 'desc';
}

class ProdutosService {
  private readonly baseUrl = '/produtos';

  /**
   * Lista todos os produtos com paginação e filtros
   */
  async listar(filtros: ProdutoFiltros = {}): Promise<ProdutosResponse> {
    const params = new URLSearchParams();
    
    if (filtros.categoria) params.append('categoria', filtros.categoria);
    if (filtros.search) params.append('search', filtros.search);
    if (filtros.page) params.append('page', filtros.page.toString());
    if (filtros.limit) params.append('limit', filtros.limit.toString());
    if (filtros.destaque) params.append('destaque', 'true');
    if (filtros.orderBy) params.append('orderBy', filtros.orderBy);
    if (filtros.order) params.append('order', filtros.order);

    const response = await api.get<ProdutosResponse>(`${this.baseUrl}?${params.toString()}`);
    return response.data;
  }

  /**
   * Busca um produto pelo ID
   */
  async buscarPorId(id: number): Promise<Produto> {
    const response = await api.get<Produto>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Busca produtos por categoria
   */
  async buscarPorCategoria(categoria: string, page = 1, limit = 12): Promise<ProdutosResponse> {
    return this.listar({ categoria, page, limit });
  }

  /**
   * Busca produtos em destaque
   */
  async buscarDestaques(limit = 8): Promise<ProdutosResponse> {
    return this.listar({ destaque: true, limit });
  }

  /**
   * Pesquisa produtos por termo
   */
  async pesquisar(termo: string, page = 1, limit = 12): Promise<ProdutosResponse> {
    return this.listar({ search: termo, page, limit });
  }
}

export const produtosService = new ProdutosService(); 