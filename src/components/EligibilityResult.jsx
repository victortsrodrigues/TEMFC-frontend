import React from "react";
import styled from "styled-components";
import Button from "./Button";
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
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StatusBadge = styled.div`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;

  background-color: ${({ status, theme }) =>
    status === "ELIGIBLE" ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
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
  text-align: center;

  background-color: ${({ status, theme }) =>
    status === "ELIGIBLE" ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
`;

const DetailTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;
{/* <StatusBadge status={status}>{formatStatus(status)}</StatusBadge> */}
const EligibilityResult = ({ result, onReset }) => {
  if (!result) return null;

  const { status, name, valid_months, pending_months, details } = result;

  const handleReset = () => {
    if (onReset) {
      // Call the reset function from parent component
      onReset();
    }
  };
  
  return (
    <ResultContainer>
      <StatusIndicator>
        <DotLottieReact src={status === "ELIGIBLE" ? "src/assets/purple-success.lottie" : "src/assets/purple-fail.lottie"} autoplay speed={0.7} style={{ width: '300px' , maxWidth: '300px', height: 'auto' }}/>
      </StatusIndicator>

      <ResultTitle>Resultado</ResultTitle>
      <ResultSubtitle>{name}</ResultSubtitle>

      <InfoSection>
      <InfoRow>
          <InfoLabel>Status</InfoLabel>
          <InfoValueText status={status}>{formatStatus(status)}</InfoValueText>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Valid Months</InfoLabel>
          <InfoValue>{formatDecimal(valid_months)}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Pending Months</InfoLabel>
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

export default EligibilityResult;


// {details && (
//   <InfoSection>
//     <DetailTitle>Semester Details</DetailTitle>

//     <InfoRow>
//       <InfoLabel>20% Semesters</InfoLabel>
//       <InfoValue>{details.semesters_20}</InfoValue>
//     </InfoRow>

//     <InfoRow>
//       <InfoLabel>30% Semesters</InfoLabel>
//       <InfoValue>{details.semesters_30}</InfoValue>
//     </InfoRow>

//     <InfoRow>
//       <InfoLabel>40% Semesters</InfoLabel>
//       <InfoValue>{details.semesters_40}</InfoValue>
//     </InfoRow>
//   </InfoSection>
// )}