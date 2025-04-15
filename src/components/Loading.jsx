import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { MagnifyingGlass } from "react-loader-spinner";
import Button from "./Button";

const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  width: 100%;
  max-width: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]}; // Less padding on small screens
  }
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const Loading = ({
  message = "Processando sua solicitação...",
  progress = { step: 0, message: "", percentage: 0, status: "in_progress" },
  onCancel,
}) => {

  const spinnerSize = window.innerWidth < 480 ? 80 : 100;

  return (
    <LoadingContainer>
      <LoadingTitle>{message}</LoadingTitle>

      <MagnifyingGlass
        visible={true}
        height={spinnerSize}
        width={spinnerSize}
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#6375f0"
      />
          
      <LoadingMessage>
        {progress.message || "Estamos processando sua solicitação."}
      </LoadingMessage>

      <LoadingAlert>
      Isto pode demorar alguns segundos
      </LoadingAlert>

      {onCancel && (
        <ButtonContainer>
          <Button onClick={onCancel} variant="outline" size="md">
            Cancelar Solicitação
          </Button>
        </ButtonContainer>
      )}

    </LoadingContainer>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
  progress: PropTypes.shape({
    step: PropTypes.number,
    message: PropTypes.string,
    percentage: PropTypes.number,
    status: PropTypes.oneOf(["progress", "in_progress", "completed", "error", "result", "connected"]),
  }),
  onCancel: PropTypes.func,
};

export default Loading;
