// Validate CPF format - must be exactly 11 digits
export const validateCPF = (cpf) => {
  // Remove any non-numeric characters
  const numericCPF = cpf.replace(/\D/g, '');
  
  // Check if it has exactly 11 digits
  if (numericCPF.length !== 11) {
    return {
      isValid: false,
      error: 'CPF deve conter 11 dígitos.'
    };
  }
  
  return {
    isValid: true,
    formatted: numericCPF
  };
};

// Validate name - must not be empty
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      error: 'Nome completo não pode estar vazio.'
    };
  }
  
  return {
    isValid: true,
    formatted: name.trim()
  };
};

// Validate the entire form
export const validateForm = (formData) => {
  const cpfValidation = validateCPF(formData.cpf);
  const nameValidation = validateName(formData.name);
  
  const errors = {};
  
  if (!cpfValidation.isValid) {
    errors.cpf = cpfValidation.error;
  }
  
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    formattedData: {
      cpf: cpfValidation.isValid ? cpfValidation.formatted : formData.cpf,
      name: nameValidation.isValid ? nameValidation.formatted : formData.name
    }
  };
};