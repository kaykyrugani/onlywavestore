import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import { addressService, Address, CreateAddressData } from '../../../services/address.service';
import { userService } from '../../../services/user.service';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<CreateAddressData>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });
  const [searchingZipCode, setSearchingZipCode] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.list();
      setAddresses(data);
    } catch (err) {
      setError('Erro ao carregar endereços');
      toast.error('Não foi possível carregar seus endereços');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchZipCode = async () => {
    if (!formData.zipCode || formData.zipCode.length < 8) {
      toast.error('Digite um CEP válido');
      return;
    }

    setSearchingZipCode(true);
    try {
      const data = await addressService.searchZipCode(formData.zipCode);
      setFormData(prev => ({
        ...prev,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }));
    } catch (err) {
      toast.error('CEP não encontrado');
    } finally {
      setSearchingZipCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await addressService.update(editingAddress.id, formData);
        toast.success('Endereço atualizado com sucesso');
      } else {
        await addressService.create(formData);
        toast.success('Endereço adicionado com sucesso');
      }
      setOpenDialog(false);
      loadAddresses();
      resetForm();
    } catch (err) {
      toast.error('Erro ao salvar endereço');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este endereço?')) return;

    try {
      await addressService.delete(id);
      toast.success('Endereço removido com sucesso');
      loadAddresses();
    } catch (err) {
      toast.error('Erro ao remover endereço');
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await addressService.setDefault(id);
      toast.success('Endereço padrão atualizado');
      loadAddresses();
    } catch (err) {
      toast.error('Erro ao definir endereço padrão');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const updatedUser = await userService.update(user!.id, userData);
      updateUser(updatedUser);
      toast.success('Perfil atualizado com sucesso');
    } catch (err) {
      toast.error('Erro ao atualizar perfil');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const resetForm = () => {
    setFormData({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
    setEditingAddress(null);
  };

  const openAddressDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        street: address.street,
        number: address.number,
        complement: address.complement || '',
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        isDefault: address.isDefault
      });
    } else {
      resetForm();
    }
    setOpenDialog(true);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Perfil */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Meu Perfil
            </Typography>
            <form onSubmit={handleUpdateProfile}>
              <TextField
                fullWidth
                label="Nome"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                margin="normal"
              />
              <TextField
                fullWidth
                label="E-mail"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                margin="normal"
                disabled
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={updatingProfile}
              >
                {updatingProfile ? <CircularProgress size={24} /> : 'Salvar Alterações'}
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Endereços */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Meus Endereços
              </Typography>
              <Button
                variant="contained"
                onClick={() => openAddressDialog()}
              >
                Adicionar Endereço
              </Button>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {addresses.length === 0 ? (
              <Typography color="text.secondary" align="center">
                Você ainda não cadastrou nenhum endereço
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {addresses.map((address) => (
                  <Grid item xs={12} key={address.id}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="subtitle1">
                              {address.street}, {address.number}
                            </Typography>
                            {address.isDefault && (
                              <Chip
                                size="small"
                                label="Padrão"
                                color="primary"
                                icon={<StarIcon />}
                              />
                            )}
                          </Box>
                          {address.complement && (
                            <Typography variant="body2" color="text.secondary">
                              {address.complement}
                            </Typography>
                          )}
                          <Typography variant="body2">
                            {address.neighborhood} - {address.city}/{address.state}
                          </Typography>
                          <Typography variant="body2">
                            CEP: {address.zipCode}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => openAddressDialog(address)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(address.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          {!address.isDefault && (
                            <IconButton
                              size="small"
                              onClick={() => handleSetDefault(address.id)}
                            >
                              <StarBorderIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog de Endereço */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CEP"
                  value={formData.zipCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSearchZipCode}
                          disabled={searchingZipCode}
                        >
                          {searchingZipCode ? (
                            <CircularProgress size={20} />
                          ) : (
                            <SearchIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rua"
                  value={formData.street}
                  onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número"
                  value={formData.number}
                  onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Complemento"
                  value={formData.complement}
                  onChange={(e) => setFormData(prev => ({ ...prev, complement: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bairro"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Cidade"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Estado"
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isDefault}
                      onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                    />
                  }
                  label="Definir como endereço padrão"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ProfilePage; 