export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
};

export const validateCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleaned.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11;
};

export const validateCEP = (cep) => {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8;
};

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, '');
  return cleaned.length === 16;
};

export const validateCardExpiry = (expiry) => {
  const cleaned = expiry.replace(/\D/g, '');
  if (cleaned.length !== 4) return false;
  
  const month = parseInt(cleaned.substring(0, 2));
  const year = parseInt(cleaned.substring(2, 4));
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  
  return true;
};

export const validateCardCVV = (cvv) => {
  const cleaned = cvv.replace(/\D/g, '');
  return cleaned.length === 3 || cleaned.length === 4;
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value, min) => {
  if (typeof value === 'string') {
    return value.trim().length >= min;
  }
  return false;
};

export const validateMaxLength = (value, max) => {
  if (typeof value === 'string') {
    return value.trim().length <= max;
  }
  return false;
}; 