import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes, FaTrash, FaUpload, FaArrowUp, FaArrowDown, FaPlay } from 'react-icons/fa';
import { uploadService } from '../../../services/upload.service';
import productService from '../../../services/product.service';
import toast from 'react-hot-toast';
import './ProductForm.css';
import { TextField, Button, Grid, Typography, Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { UploadService } from '../../../services/upload.service';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImagePreviewModal from '../../../components/ImagePreviewModal';
import VideoPreviewModal from '../../../components/VideoPreviewModal';

const SortableMediaItem = ({ mediaItem, index, onRemove, onPreview }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: mediaItem.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="admin-product-form__media-item"
      {...attributes}
      {...listeners}
    >
      {mediaItem.type === 'image' ? (
        <img 
          src={mediaItem.url} 
          alt={`Produto ${index + 1}`} 
          onClick={() => onPreview(mediaItem)}
        />
      ) : (
        <div 
          className="admin-product-form__video-thumbnail"
          onClick={() => onPreview(mediaItem)}
        >
          <img 
            src={mediaItem.thumbnailUrl || mediaItem.url} 
            alt={`Vídeo ${index + 1}`} 
          />
          <div className="admin-product-form__video-play">
            <FaPlay />
          </div>
        </div>
      )}
      <div className="admin-product-form__media-actions">
        <button
          type="button"
          className="admin-product-form__remove-button"
          onClick={() => onRemove(mediaItem.url)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

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
    media: [],
    features: [],
    specifications: {}
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id, isEditing]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await productService.getById(id);
      setFormData(product);
    } catch (err) {
      setError('Erro ao carregar produto');
      toast.error('Não foi possível carregar os dados do produto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadService.uploadMedia(file);
      
      const mediaItem = {
        type: file.type.startsWith('video/') ? 'video' : 'image',
        url,
        thumbnailUrl: file.type.startsWith('video/') ? await generateVideoThumbnail(file) : undefined
      };

      setFormData(prev => ({
        ...prev,
        media: [...prev.media, mediaItem]
      }));
    } catch (err) {
      setError('Erro ao fazer upload da mídia');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const generateVideoThumbnail = async (file) => {
    // Aqui você pode implementar a geração de thumbnail do vídeo
    // Por exemplo, usando a primeira frame do vídeo
    return URL.createObjectURL(file);
  };

  const handleRemoveMedia = async (mediaUrl) => {
    try {
      setLoading(true);
      await productService.removeMedia(id, mediaUrl);
      setFormData(prev => ({
        ...prev,
        media: prev.media.filter(item => item.url !== mediaUrl)
      }));
    } catch (err) {
      setError('Erro ao remover mídia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = formData.media.findIndex(item => item.url === active.id);
      const newIndex = formData.media.findIndex(item => item.url === over.id);
      
      const newMedia = arrayMove(formData.media, oldIndex, newIndex);
      
      try {
        setLoading(true);
        await productService.reorderMedia(id, newMedia.map(item => item.url));
        setFormData(prev => ({
          ...prev,
          media: newMedia
        }));
      } catch (err) {
        setError('Erro ao reordenar mídia');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
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
    try {
      setLoading(true);
      if (isEditing) {
        await productService.update(id, formData);
        toast.success('Produto atualizado com sucesso');
      } else {
        await productService.create(formData);
        toast.success('Produto criado com sucesso');
      }
      navigate('/admin/produtos');
    } catch (err) {
      setError('Erro ao salvar produto');
      console.error(err);
      toast.error('Erro ao salvar produto. Tente novamente.');
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
          <h2>Mídia do Produto</h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={formData.media.map(item => item.url)}
              strategy={verticalListSortingStrategy}
            >
              <div className="admin-product-form__media-gallery">
                {formData.media.map((mediaItem, index) => (
                  <SortableMediaItem
                    key={mediaItem.url}
                    mediaItem={mediaItem}
                    index={index}
                    onRemove={handleRemoveMedia}
                    onPreview={setPreviewMedia}
                  />
                ))}
                
                {formData.media.length < 4 && (
                  <div className="admin-product-form__upload-area">
                    <input
                      type="file"
                      id="media"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      disabled={uploading}
                    />
                    <label htmlFor="media">
                      <FaUpload />
                      {uploading ? 'Enviando...' : 'Adicionar Mídia'}
                    </label>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
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
            disabled={loading || uploading}
          >
            <FaSave />
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>

      {previewMedia?.type === 'image' && (
        <ImagePreviewModal
          open={!!previewMedia}
          onClose={() => setPreviewMedia(null)}
          imageUrl={previewMedia.url}
        />
      )}

      {previewMedia?.type === 'video' && (
        <VideoPreviewModal
          open={!!previewMedia}
          onClose={() => setPreviewMedia(null)}
          videoUrl={previewMedia.url}
          thumbnailUrl={previewMedia.thumbnailUrl}
        />
      )}
    </div>
  );
};

export default ProductForm; 