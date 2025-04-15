import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";


const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.2s ease;
  cursor: pointer;
  letter-spacing: 0.01em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  }

  // Button variants
  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;
          box-shadow: 0 4px 8px rgba(81, 81, 211, 0.3);

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(81, 81, 211, 0.4);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          border: none;
          box-shadow: 0 4px 8px rgba(100, 116, 139, 0.3);

          &:hover:not(:disabled) {
            filter: brightness(90%);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(100, 116, 139, 0.4);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: rgba(81, 81, 211, 0.05);
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
          }
        `;
      default:
        return css`
          // Same as primary
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;
          box-shadow: 0 4px 8px rgba(81, 81, 211, 0.3);

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(81, 81, 211, 0.4);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
          }
        `;
    }
  }}
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
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
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
