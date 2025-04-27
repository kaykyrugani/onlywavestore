import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import productService, { Product, CreateProductData } from '../../../services/product.service';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Eletrônicos',
  'Roupas',
  'Acessórios',
  'Casa e Decoração',
  'Livros',
  'Esportes',
  'Outros'
];

interface FormData extends Omit<CreateProductData, 'imageUrl'> {
  imageFile: File | null;
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const product = await productService.getById(Number(id));
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        imageFile: null
      });
      setImagePreview(product.imageUrl);
    } catch (err) {
      setError('Erro ao carregar produto');
      toast.error('Não foi possível carregar os dados do produto');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' 
        ? Number(value)
        : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Nome do produto é obrigatório');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Descrição do produto é obrigatória');
      return false;
    }
    if (formData.price <= 0) {
      toast.error('Preço deve ser maior que zero');
      return false;
    }
    if (!formData.category) {
      toast.error('Categoria é obrigatória');
      return false;
    }
    if (formData.stock < 0) {
      toast.error('Estoque não pode ser negativo');
      return false;
    }
    if (!isEditing && !formData.imageFile) {
      toast.error('Imagem do produto é obrigatória');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      // TODO: Implementar upload de imagem e obter URL
      const imageUrl = formData.imageFile 
        ? await uploadImage(formData.imageFile)
        : imagePreview;

      const productData: CreateProductData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        stock: formData.stock,
        imageUrl: imageUrl!
      };

      if (isEditing) {
        await productService.update(Number(id), productData);
        toast.success('Produto atualizado com sucesso');
      } else {
        await productService.create(productData);
        toast.success('Produto criado com sucesso');
      }

      navigate('/admin/produtos');
    } catch (err) {
      setError('Erro ao salvar produto');
      toast.error('Não foi possível salvar o produto');
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implementar função de upload de imagem
  const uploadImage = async (file: File): Promise<string> => {
    // Simular upload por enquanto
    return URL.createObjectURL(file);
  };

  if (loadingProduct) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/produtos')}
        >
          Voltar
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nome do Produto"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="Descrição"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Preço"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="stock"
                label="Estoque"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Categoria"
                >
                  {CATEGORIES.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                >
                  {imagePreview ? 'Trocar Imagem' : 'Upload de Imagem'}
                </Button>
              </label>
              {imagePreview && (
                <Box mt={2} textAlign="center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              startIcon={<SaveIcon />}
            >
              {isEditing ? 'Atualizar' : 'Criar'} Produto
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductForm; 