import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';
import './ProductForm.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    status: 'active',
    images: [],
    features: [],
    specifications: {}
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      // Aqui você faria uma chamada à API para buscar os dados do produto
      // Por enquanto, vamos simular com dados mockados
      setFormData({
        name: 'Produto Exemplo',
        description: 'Descrição do produto exemplo',
        price: '99.90',
        originalPrice: '129.90',
        category: 'categoria1',
        stock: '50',
        status: 'active',
        images: [],
        features: ['Feature 1', 'Feature 2'],
        specifications: {
          'Marca': 'Marca Exemplo',
          'Modelo': 'Modelo Exemplo',
          'Cor': 'Preto'
        }
      });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSpecificationChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const addSpecification = () => {
    const key = prompt('Digite o nome da especificação:');
    if (key) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: ''
        }
      }));
    }
  };

  const removeSpecification = (key) => {
    setFormData(prev => {
      const newSpecifications = { ...prev.specifications };
      delete newSpecifications[key];
      return {
        ...prev,
        specifications: newSpecifications
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Aqui você faria uma chamada à API para salvar o produto
      console.log('Dados do produto:', formData);
      
      // Simulando um delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionando de volta para a lista de produtos
      navigate('/admin/produtos');
    } catch (err) {
      setError('Erro ao salvar o produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-product-form">
      <div className="admin-product-form__header">
        <h1>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h1>
        <button 
          className="admin-product-form__cancel-button"
          onClick={() => navigate('/admin/produtos')}
        >
          <FaTimes />
          Cancelar
        </button>
      </div>

      {error && (
        <div className="admin-product-form__error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-product-form__form">
        <div className="admin-product-form__section">
          <h2>Informações Básicas</h2>
          
          <div className="admin-product-form__field">
            <label htmlFor="name">Nome do Produto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-product-form__field">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="admin-product-form__row">
            <div className="admin-product-form__field">
              <label htmlFor="price">Preço</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="admin-product-form__field">
              <label htmlFor="originalPrice">Preço Original</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="admin-product-form__row">
            <div className="admin-product-form__field">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="categoria1">Categoria 1</option>
                <option value="categoria2">Categoria 2</option>
              </select>
            </div>

            <div className="admin-product-form__field">
              <label htmlFor="stock">Estoque</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="admin-product-form__field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-product-form__section">
          <h2>Características</h2>
          
          <div className="admin-product-form__features">
            {formData.features.map((feature, index) => (
              <div key={index} className="admin-product-form__feature">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Digite uma característica"
                />
                <button 
                  type="button"
                  className="admin-product-form__remove-button"
                  onClick={() => removeFeature(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              className="admin-product-form__add-button"
              onClick={addFeature}
            >
              Adicionar Característica
            </button>
          </div>
        </div>

        <div className="admin-product-form__section">
          <h2>Especificações</h2>
          
          <div className="admin-product-form__specifications">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="admin-product-form__specification">
                <div className="admin-product-form__specification-key">{key}</div>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSpecificationChange(key, e.target.value)}
                />
                <button 
                  type="button"
                  className="admin-product-form__remove-button"
                  onClick={() => removeSpecification(key)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              className="admin-product-form__add-button"
              onClick={addSpecification}
            >
              Adicionar Especificação
            </button>
          </div>
        </div>

        <div className="admin-product-form__actions">
          <button 
            type="submit" 
            className="admin-product-form__save-button"
            disabled={loading}
          >
            <FaSave />
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 