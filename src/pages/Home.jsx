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
  max-width: 600px;
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

  // Display any API errors
  const renderError = () => {
    if (!error) return null;

    const errorTitle = error.error || 'Error';
    const errorMessage = (() => {
      if (error.details?.cpf) {
        return `CPF validation error: ${error.details.cpf}`;
      } else if (error.details?.source === 'data_retrieval') {
        return 'Could not find user data with the provided information.';
      } else if (error.status_code === 422) {
        return 'Data processing error. Please check your information and try again.';
      } else if (error.status_code === 503) {
        return 'External service error. Please try again later.';
      } else if (error.status_code === 500) {
        return 'Server error. Please try again later.';
      }
      return 'An unexpected error occurred. Please try again.';
    })();

    return (
      <ErrorContainer>
        <ErrorTitle>{errorTitle}</ErrorTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        {error.details && (
          <ErrorDetails>
            {JSON.stringify(error.details, null, 2)}
          </ErrorDetails>
        )}
      </ErrorContainer>
    );
  };

  // Determine what content to show
  const renderContent = () => {
    if (loading) {
      return (
        <Loading 
          message="Processing your eligibility check..." 
          progress={progress} 
        />
      );
    }

    if (result) {
      return (
        <EligibilityResult 
          result={result} 
          onReset={handleReset} 
        />
      );
    }

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
        <Title>Exam Eligibility Checker</Title>
        <Subtitle>Verify your eligibility status instantly</Subtitle>
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