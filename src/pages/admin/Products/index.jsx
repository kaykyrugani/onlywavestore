import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import ProductForm from './ProductForm';
import styles from './Products.module.css';

const ProductsList = () => {
  const navigate = useNavigate();
  const [products] = useState([
    {
      id: 1,
      name: 'Produto 1',
      category: 'Categoria 1',
      price: 99.90,
      stock: 50,
      status: 'active'
    },
    {
      id: 2,
      name: 'Produto 2',
      category: 'Categoria 2',
      price: 149.90,
      stock: 30,
      status: 'active'
    },
    // Adicione mais produtos aqui
  ]);

  const handleEdit = (id) => {
    navigate(`/admin/produtos/editar/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      console.log('Deletar produto:', id);
    }
  };

  const handleAdd = () => {
    navigate('/admin/produtos/novo');
  };

  return (
    <div className={styles.products}>
      <div className={styles.header}>
        <h1 className={styles.title}>Produtos</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          <FaPlus />
          Adicionar Produto
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className={styles.search}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select className={styles.filter}>
            <option value="">Todas as categorias</option>
            <option value="categoria1">Categoria 1</option>
            <option value="categoria2">Categoria 2</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select className={styles.filter}>
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`${styles.status} ${styles[`status${product.status}`]}`}>
                    {product.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => handleEdit(product.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationButton}>Anterior</button>
        <span className={styles.paginationInfo}>Página 1 de 1</span>
        <button className={styles.paginationButton}>Próxima</button>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <Routes>
      <Route index element={<ProductsList />} />
      <Route path="novo" element={<ProductForm />} />
      <Route path="editar/:id" element={<ProductForm />} />
    </Routes>
  );
};

export default Products; 