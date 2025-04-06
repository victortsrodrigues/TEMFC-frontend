import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define animations
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

// Main container for the loading indicator
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
`;

// Spinner component
const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Text that appears below the spinner
const LoadingText = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  animation: ${pulse} 1.5s ease infinite;
`;

// Progress bar container
const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 300px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing[4]};
  overflow: hidden;
`;

// Progress bar fill
const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`;

// Progress value text
const ProgressValue = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Loading = ({ message = 'Loading...', progress = null }) => {
  const showProgress = progress !== null;
  
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
      
      {showProgress && (
        <>
          <ProgressBarContainer>
            <ProgressBarFill progress={progress} />
          </ProgressBarContainer>
          <ProgressValue>{progress}%</ProgressValue>
        </>
      )}
    </LoadingContainer>
  );
};

export default Loading;