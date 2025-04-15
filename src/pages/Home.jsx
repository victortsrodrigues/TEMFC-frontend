import React, { useState, useRef } from "react";
import styled from "styled-components";
import UserForm from "../components/UserForm";
import EligibilityResult from "../components/EligibilityResult";
import Loading from "../components/Loading";
import CriteriaDialog from "../components/CriteriaDialog";
import useEligibilityCheck from "../hooks/useEligibilityCheck";
import homeImage from "../assets/home-image.svg";

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
  margin-left: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0; // Remove left margin on mobile
    padding: ${({ theme }) => theme.spacing[6]};
    text-align: center;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]}; // Even smaller padding on small screens
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  opacity: 0.9;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  padding: 0;
`;

const FeatureItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  &::before {
    content: "✓";
    margin-right: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: ${props => props.$hideButton ? 'none !important' : 'block'};
  width: 100%;
  max-width: 360px;
  margin: ${({ theme }) => theme.spacing[0]} auto ${({ theme }) => theme.spacing[8]};
  font-size: 1.25rem;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[10]}`};
  min-height: 3.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: none;
  box-shadow: 0 4px 12px rgba(99, 117, 240, 0.3);
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%; // Full width on small screens
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`}; // Smaller padding
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    transform: translateY(1px);
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
    // Center the form/loading/results content
    min-height: 100vh; // Ensure enough space for the form
    justify-content: center;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacing[8]}; // Add more padding at top
    padding-bottom: ${({ theme }) => theme.spacing[8]}; // Add more padding at bottom
    margin-top: ${({ theme }) => theme.spacing[6]}; // Create separation from left section
    scroll-margin-top: 20px; // Helps with scroll positioning
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes["5xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]}; // Smaller font on mobile
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  opacity: 0.9;
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
  position: relative;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '20px'});
  transition: 
    opacity 0.4s 0.1s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    // Make sure the container is properly centered
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HomeImage = styled.img`
  max-width: 85%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    scale(${props => props.$isVisible ? 1 : 0.95})
    translateY(${props => props.$isExiting ? '-20px' : '0'});
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: 
    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
  pointer-events: none;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const ErrorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  max-width: 500px;
`;

const ErrorTitle = styled.h3`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Home = () => {
  const [transitionStage, setTransitionStage] = useState('image-visible');
  // Add state to track if the button should be hidden
  const [hideButton, setHideButton] = useState(false);

  const {
    loading,
    progress,
    result,
    error,
    checkUserEligibilitySSE,
    cancelRequest,
    resetState,
  } = useEligibilityCheck();

  // Reference for the form container
  const formContainerRef = useRef(null);
  const rightSectionRef = useRef(null); // Add ref for the right section

  // Handle smooth transition from image to form
  const handleCTAClick = () => {
    
    setHideButton(true);
    setTransitionStage('image-exit');
    
    // Use rAF for smooth animation sequencing
    requestAnimationFrame(() => {
      setTransitionStage('form-enter');
      setTimeout(() => {
        if (rightSectionRef.current) {
          const section = rightSectionRef.current;
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;
          const scrollTarget = section.offsetTop - (windowHeight - sectionHeight) / 2;
  
          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth',
          });
        }
      }, 40);
    });
  };

  // Handle form submission
  const handleSubmit = (formData) => {
    checkUserEligibilitySSE(formData);
  };

  // Reset the form and state
  const handleReset = () => {
    resetState();
    // Keep the button hidden as we're going back to the form
    setHideButton(true);
    // Keep the form enter stage
    setTransitionStage('form-enter');
    
    // Scroll back to the form
    setTimeout(() => {
      if (rightSectionRef.current) {
        const top = rightSectionRef.current.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerHeight / 2 - rightSectionRef.current.offsetHeight / 2;
        window.scrollTo({
          top: top - offset,
          behavior: 'smooth',
        });
      }
    }, 500);
  };

  // Display any API errors with improved error handling
  const renderError = () => {
    if (!error) return null;

    // Extract error details for display
    const errorTitle = error.error || "Error";

    // Generate appropriate error message based on error details
    const errorMessage = (() => {
      // Handle specific status codes
      if (error.status_code === 404) {
        return "Por favor, verifique os dados e tente novamente.";
      } else if (error.status_code === 422) {
        return "Por favor, tente novamente mais tarde.";
      } else if (error.status_code === 503) {
        return "Conexão externa indisponível. Por favor, tente novamente mais tarde.";
      } else if (error.status_code === 500) {
        return "Por favor, tente novamente mais tarde.";
      }

      // Check for data retrieval errors
      if (error.details?.source === "data_retrieval") {
        return `Could not find user data with the provided information. ${
          error.error || ""
        }`;
      }

      // Connection errors
      if (error.details?.source === "connection") {
        return "Connection to the server was lost. Please check your internet connection and try again.";
      }

      // Network errors
      if (error.details?.source === "network") {
        return "Network error occurred. Please check your internet connection and try again.";
      }

      // Progress event errors
      if (error.details?.source === "progress") {
        return `Error during processing: ${error.error || "Unknown error"}`;
      }

      // Default error message as fallback
      return error.error || "An unexpected error occurred. Please try again.";
    })();

    return (
      <ErrorContainer>
        <ErrorTitle>{errorTitle}</ErrorTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ErrorContainer>
    );
  };

  // Determine what content to show
  const renderContent = () => {
    // If there's an error, we still show the form below the error message
    if (error) {
      return (
        <>
          {renderError()}
          <UserForm onSubmit={handleSubmit} isLoading={loading} />
        </>
      );
    }
    
    // If still loading, show the loading component
    if (loading) {
      return (
        <Loading
          message="Processando sua solicitação..."
          progress={progress}
          onCancel={() => {
            cancelRequest();
          }}
        />
      );
    }

    // If there's a result, show the result component
    if (result) {
      return <EligibilityResult result={result} onReset={handleReset} />;
    }

    return (
      <ImageContainer>
        <HomeImage 
          src={homeImage || "/src/assets/home-image.svg"}
          alt="TEMFC 36 Verificador" 
          $isVisible={transitionStage === 'image-visible'}
          $isExiting={transitionStage === 'image-exit'}
        />
        
        <ContentContainer 
          $isVisible={transitionStage === 'form-enter'}
          ref={formContainerRef}
        >
          <UserForm onSubmit={handleSubmit} isLoading={loading} />
        </ContentContainer>
      </ImageContainer>
    );
  };

  // Dialog state management
  let [isOpen, setIsOpen] = useState(false);
  function openDialog() {
    setIsOpen(true);
  }
  function closeDialog() {
    setIsOpen(false);
  }

  return (
    <PageContainer>
      <LeftSection>
        <Header>
          <Title>Verificador TEMFC 36</Title>
          <Subtitle>Cheque sua elegibilidade em segundos</Subtitle>
        </Header>

        <Description>
          Insira seu nome completo e CPF para verificar automaticamente sua
          elegibilidade para a prova de Título de Especialista em Medicina de
          Família e Comunidade (TEMFC 36). Nosso sistema analisa todos os critérios
          do edital atual e retorna seu status em poucos segundos.
        </Description>

        <FeatureList>
          <FeatureItem>Resultado em menos de 1 minuto.</FeatureItem>
          <FeatureItem>Seguro e confidencial.</FeatureItem>
          <FeatureItem>100% gratuito.</FeatureItem>
        </FeatureList>

        <LinkGroup>
          <InfoLink
            href="https://www.sbmfc.org.br/concurso-atual/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edital Atual
          </InfoLink> {/* Mantido: link edital */}
          <InfoLink href="#" onClick={(e) => { e.preventDefault(); openDialog(); }}>
            Critérios de Cálculo
          </InfoLink> {/* Mantido: link abre diálogo */}
        </LinkGroup>

        <CTAButton onClick={handleCTAClick} $hideButton={hideButton}>
          Verificar Agora
        </CTAButton>
      </LeftSection>

      <RightSection ref={rightSectionRef}>
        {renderContent()}
      </RightSection>
      <CriteriaDialog isOpen={isOpen} closeDialog={closeDialog} />
    </PageContainer>
  );
};

export default Home;
