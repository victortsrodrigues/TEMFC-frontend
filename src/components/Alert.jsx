import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NOTIFICATION_TYPES } from '../contexts/NotificationContext';

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  z-index: 1000;
  min-width: 300px;
  max-width: 450px;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: ${slideIn} 0.3s ease forwards;
  
  ${({ type, theme }) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return css`
          background-color: ${theme.colors.success};
          color: white;
        `;
      case NOTIFICATION_TYPES.ERROR:
        return css`
          background-color: ${theme.colors.error};
          color: white;
        `;
      case NOTIFICATION_TYPES.WARNING:
        return css`
          background-color: ${theme.colors.warning};
          color: white;
        `;
      case NOTIFICATION_TYPES.INFO:
      default:
        return css`
          background-color: ${theme.colors.info};
          color: white;
        `;
    }
  }}
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  background: none;
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  padding: 0;
  opacity: 0.7;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    opacity: 1;
  }
`;

const AlertTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const AlertMessage = styled.div`
  margin-right: ${({ theme }) => theme.spacing[4]};
`;

const Alert = ({ type = NOTIFICATION_TYPES.INFO, message, onClose }) => {
  const getTitleByType = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'Success';
      case NOTIFICATION_TYPES.ERROR:
        return 'Error';
      case NOTIFICATION_TYPES.WARNING:
        return 'Warning';
      case NOTIFICATION_TYPES.INFO:
      default:
        return 'Information';
    }
  };

  return (
    <AlertContainer type={type}>
      <AlertTitle>{getTitleByType()}</AlertTitle>
      <AlertMessage>{message}</AlertMessage>
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </AlertContainer>
  );
};

export default Alert;