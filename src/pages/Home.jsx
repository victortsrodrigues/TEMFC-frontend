import React, { useState } from 'react';
import styled from 'styled-components';
import UserForm from '../components/UserForm';
import EligibilityResult from '../components/EligibilityResult';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { useNotification } from '../contexts/NotificationContext';
import useEligibilityCheck from '../hooks/useEligibilityCheck';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 450px;
`;

const ErrorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const ErrorTitle = styled.h3`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ErrorDetails = styled.pre`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow-x: auto;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Home = () => {
  const [showResults, setShowResults] = useState(false);
  const { 
    loading, 
    progress, 
    result, 
    error,
    checkUserEligibilitySSE, 
    cancelRequest 
  } = useEligibilityCheck();

  const { 
    notification, 
    notifyError, 
    clearNotification 
  } = useNotification();

  // Handle form submission
  const handleSubmit = (formData) => {
    setShowResults(false);
    
    // Use SSE for the request (preferred method)
    checkUserEligibilitySSE(formData);
  };

  // Reset the form and state
  const handleReset = () => {
    setShowResults(false);
    cancelRequest();
  };

  // Display any API errors with improved error handling
  const renderError = () => {
    if (!error) return null;

    // Extract error details for display
    const errorTitle = error.error || 'Error';
    
    // Generate appropriate error message based on error details
    const errorMessage = (() => {
      // Check for data retrieval errors
      if (error.details?.source === 'data_retrieval') {
        return `Could not find user data with the provided information. ${error.error || ''}`;
      }
      
      // Check for specific CPF validation errors
      if (error.details?.details?.cpf) {
        return `CPF validation error: ${error.details.details.cpf}`;
      }
      
      // Handle specific status codes
      if (error.status_code === 404) {
        return 'User data not found. Please check your information and try again.';
      } else if (error.status_code === 422) {
        return 'Data processing error. Please check your information and try again.';
      } else if (error.status_code === 503) {
        return 'Service currently unavailable. Please try again later.';
      } else if (error.status_code === 500) {
        return 'Server error. Please try again later.';
      }
      
      // Connection errors
      if (error.details?.source === 'connection') {
        return 'Connection to the server was lost. Please check your internet connection and try again.';
      }
      
      // Network errors
      if (error.details?.source === 'network') {
        return 'Network error occurred. Please check your internet connection and try again.';
      }
      
      // Progress event errors
      if (error.details?.source === 'progress') {
        return `Error during processing: ${error.error || 'Unknown error'}`;
      }
      
      // Default error message as fallback
      return error.error || 'An unexpected error occurred. Please try again.';
    })();

    // Find the most useful details to display
    const displayDetails = error.details?.details || error.details || {};

    return (
      <ErrorContainer>
        <ErrorTitle>{errorTitle}</ErrorTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        {Object.keys(displayDetails).length > 0 && (
          <ErrorDetails>
            {JSON.stringify(displayDetails, null, 2)}
          </ErrorDetails>
        )}
      </ErrorContainer>
    );
  };

  // Determine what content to show
  const renderContent = () => {
    // If still loading, show the loading component
    if (loading) {
      return (
        <Loading 
          message="Processando sua solicitação..." 
          progress={progress} 
        />
      );
    }

    // If there's a result, show the result component
    if (result) {
      return (
        <EligibilityResult 
          result={result} 
          onReset={handleReset} 
        />
      );
    }

    // Otherwise, show the form with any errors
    return (
      <>
        {renderError()}
        <UserForm 
          onSubmit={handleSubmit} 
          isLoading={loading} 
        />
      </>
    );
  };

  return (
    <PageContainer>
      <Header>
        <Title>Verificador de Aptidão para o TEMFC</Title>
        <Subtitle>Saiba se você está apto a realizar a próxima Prova de Título de Especialista em Medicina de Família e Comunidade em poucos segundos</Subtitle>
      </Header>

      <ContentContainer>
        {renderContent()}
      </ContentContainer>

      {notification && (
        <Alert
          type={notification.type}
          message={notification.message}
          onClose={clearNotification}
        />
      )}
    </PageContainer>
  );
};

export default Home;