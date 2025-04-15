import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing[16]};
  padding-right: ${({ theme }) => theme.spacing[16]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: ${({ theme }) => theme.spacing[8]}; // Less padding on medium screens
    padding-right: ${({ theme }) => theme.spacing[8]};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: ${({ theme }) => theme.spacing[2]}; // Minimal padding on small screens
    padding-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  margin-left: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.primary}; // Changed to primary color
  letter-spacing: 0.01em;
`;

const InputField = styled.input`
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ hasError, theme }) => 
    hasError ? theme.colors.error : 'rgba(0, 0, 0, 0.1)'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => theme.colors.inputBg};
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md}; // Larger font on mobile for better touch input
    padding: ${({ theme }) => theme.spacing[3]}; // More padding for better touch targets
  }
  
  &:focus {
    outline: none;
    border-color: ${({ hasError, theme }) => 
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ hasError, theme }) => 
      hasError 
        ? `${theme.colors.error}20` 
        : `${theme.colors.primary}20`};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    opacity: 0.5;
    color: #aab2c0;
  }
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const HelperText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const FormInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder,
  maxLength,
  ...rest
}) => {
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </Label>
      )}
      <InputField
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        hasError={!!error}
        required={required}
        maxLength={maxLength}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

export default FormInput;