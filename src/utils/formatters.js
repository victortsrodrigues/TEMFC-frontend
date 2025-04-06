// Format CPF with mask (e.g., 123.456.789-00)
export const formatCPF = (cpf) => {
  // Remove any non-numeric characters
  const numericCPF = cpf.replace(/\D/g, '');
  
  // Return empty string if no digits
  if (numericCPF === '') {
    return '';
  }
  
  // Apply mask with regular expression
  return numericCPF
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

// Format decimal numbers with 1 decimal place
export const formatDecimal = (value) => {
  if (value === undefined || value === null) {
    return '0.0';
  }
  return Number(value).toFixed(1);
};

// Format status to more readable text
export const formatStatus = (status) => {
  if (!status) return '';
  
  // Convert "ELIGIBLE" to "Eligible" and "NOT_ELIGIBLE" to "Not Eligible"
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};