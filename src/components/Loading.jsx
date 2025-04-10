import React from "react";
import styled from "styled-components";
import { MagnifyingGlass } from "react-loader-spinner";

const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const LoadingTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const LoadingMessage = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const LoadingAlert = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 12px;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${({ theme, status }) =>
    status === "error"
      ? theme.colors.error
      : status === "completed"
      ? theme.colors.success
      : theme.colors.primary};
  width: ${({ percentage }) => `${percentage}%`};
  transition: width 0.3s ease;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing[4]} 0;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 12px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: ${({ theme, active, completed }) =>
      completed
        ? theme.colors.success
        : active
        ? theme.colors.primary
        : theme.colors.background};
  }
`;

const StepCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme, active, completed }) =>
    completed
      ? theme.colors.success
      : active
      ? theme.colors.primary
      : theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  z-index: 1;
`;

const StepNumber = styled.span`
  color: ${({ theme, active, completed }) =>
    active || completed ? theme.colors.white : theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: bold;
`;

const StepLabel = styled.span`
  color: ${({ theme, active, completed }) =>
    completed
      ? theme.colors.success
      : active
      ? theme.colors.primary
      : theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-align: center;
`;

const Loading = ({
  message = "Carregando...",
  progress = { step: 0, message: "", percentage: 0, status: "in_progress" },
}) => {
  const steps = [
    { number: 1, label: "Data Retrieval" },
    { number: 2, label: "Validation" },
    { number: 3, label: "Processing" },
  ];

  const currentStep = progress.step || 0;

  return (
    <LoadingContainer>
      <LoadingTitle>{message}</LoadingTitle>

      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#6375f0"
      />
          
      <LoadingMessage>
        {progress.message || `Step ${currentStep}: Processing...`}
      </LoadingMessage>

      <LoadingAlert>
      Isto pode demorar alguns segundos
      </LoadingAlert>
    
    </LoadingContainer>
  );
};

export default Loading;
