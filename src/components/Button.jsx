import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// Styled button component
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  // Button variants
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          border: none;
          
          &:hover:not(:disabled) {
            filter: brightness(90%);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
    }
  }}
  
  // Button sizes
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${`${theme.spacing[1]} ${theme.spacing[3]}`};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return css`
          padding: ${`${theme.spacing[3]} ${theme.spacing[6]}`};
          font-size: ${theme.fontSizes.md};
        `;
      default:
        return css`
          padding: ${`${theme.spacing[2]} ${theme.spacing[4]}`};
          font-size: ${theme.fontSizes.md};
        `;
    }
  }}
  
  // Full width option
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  
  // Disabled state
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  fullWidth = false,
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;