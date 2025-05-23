import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Button from "./Button";
import successAnimation from '../assets/purple-success.lottie'
import failAnimation    from '../assets/purple-fail.lottie'
import { formatDecimal, formatStatus } from "../utils/formatters";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ResultContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .dotlottie-container {
      width: 250px !important;
    }
  }
`;

const ResultTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ResultSubtitle = styled.h3`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const InfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
`;

const InfoValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValueText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${({ theme }) => theme.spacing[2]};
  padding-right: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ status, theme }) =>
    status === "ELIGIBLE" ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const EligibilityResult = ({ result, onReset }) => {
  if (!result) return null;

  const { status, name, valid_months, pending_months } = result;

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };
  
  return (
    <ResultContainer>
      <StatusIndicator>
        <DotLottieReact src={status === "ELIGIBLE" ? successAnimation : failAnimation} autoplay speed={0.7} style={{ width: '300px' , maxWidth: '300px', height: 'auto' }}/>
      </StatusIndicator>

      <ResultTitle>Resultado</ResultTitle>
      <ResultSubtitle>{name}</ResultSubtitle>

      <InfoSection>
      <InfoRow>
          <InfoLabel>Status</InfoLabel>
          <InfoValueText status={status}>{formatStatus(status)}</InfoValueText>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Meses Válidos</InfoLabel>
          <InfoValue>{formatDecimal(valid_months)}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Meses Pendentes</InfoLabel>
          <InfoValue>{formatDecimal(pending_months)}</InfoValue>
        </InfoRow>
      </InfoSection>

      <ButtonContainer>
        <Button onClick={handleReset} variant="outline" size="md">
          Fazer outra verificação
        </Button>
      </ButtonContainer>
    </ResultContainer>
  );
};

EligibilityResult.propTypes = {
  result: PropTypes.shape({
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    valid_months: PropTypes.number.isRequired,
    pending_months: PropTypes.number.isRequired,
    details: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  onReset: PropTypes.func,
};

export default EligibilityResult;


