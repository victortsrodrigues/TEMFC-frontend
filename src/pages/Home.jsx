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
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]};
    text-align: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 0;
  }
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  opacity: 0.9;
`;

const InfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  opacity: 0.9;
  line-height: 1.6;
`;

const InfoLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    opacity: 0.8;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 500px;
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
    cancelRequest,
    resetState
  } = useEligibilityCheck();

  const { 
    notification, 
    notifyError, 
    clearNotification 
  } = useNotification();

  // Handle form submission
  const handleSubmit = (formData) => {
    // setShowResults(false);
    
    // Use SSE for the request (preferred method)
    checkUserEligibilitySSE(formData);
  };

  // Reset the form and state
  const handleReset = () => {
    // setShowResults(false);
    // cancelRequest();
    resetState();
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
      <LeftSection>
        <Header>
          <Title>Verificador de Aptidão para o TEMFC</Title>
          <Subtitle>Saiba se você está apto a realizar a próxima Prova de Título de Especialista em Medicina de Família e Comunidade</Subtitle>
        </Header>

        <InfoSection>
          <InfoTitle>O que é o TEMFC?</InfoTitle>
          <InfoText>
            O Título de Especialista em Medicina de Família e Comunidade (TEMFC) é uma certificação concedida pela Sociedade Brasileira de Medicina de Família e Comunidade (SBMFC).
          </InfoText>
          <InfoText>
            Esta ferramenta verifica sua aptidão para realizar a prova com base nos critérios oficiais do edital atual.
          </InfoText>
        </InfoSection>

        <InfoSection>
          <InfoTitle>Links Importantes</InfoTitle>
          <InfoText>
            <InfoLink href="https://www.sbmfc.org.br/concurso-atual/" target="_blank" rel="noopener noreferrer">
              Edital Atual
            </InfoLink>
          </InfoText>
          <InfoText>
            <InfoLink href="https://www.sbmfc.org.br/concurso-atual/" target="_blank" rel="noopener noreferrer">
              Critérios de Aptidão
            </InfoLink>
          </InfoText>
        </InfoSection>
      </LeftSection>

      <RightSection>
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
      </RightSection>
    </PageContainer>
  );
};

export default Home;
