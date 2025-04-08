import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-right: ${({ theme }) => theme.spacing[8]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  margin-left: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
`;

const InputField = styled.input`
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ hasError, theme }) => 
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => theme.colors.inputBg};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ hasError, theme }) => 
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ hasError, theme }) => 
      hasError 
        ? `${theme.colors.error}33` 
        : `${theme.colors.primary}33`};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    opacity: 0.6;
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

export default FormInput;