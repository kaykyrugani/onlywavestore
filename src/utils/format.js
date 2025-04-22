export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date));
};

export const formatCPF = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
};

export const formatPhone = (phone) => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
};

export const formatCEP = (cep) => {
  return cep.replace(/(\d{5})(\d{3})/g, '$1-$2');
};

export const formatCardNumber = (number) => {
  return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, '$1 $2 $3 $4');
};

export const formatCardExpiry = (expiry) => {
  return expiry.replace(/(\d{2})(\d{2})/g, '$1/$2');
}; 