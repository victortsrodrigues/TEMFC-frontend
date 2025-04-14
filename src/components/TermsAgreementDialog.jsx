import React, { useRef, Fragment, useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

// Dialog Styled Components
const StyledDialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 40;
`;

const StyledDialogContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const StyledDialogPanel = styled(DialogPanel)`
  width: 90%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 95%;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]}
      ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const DialogContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const DialogText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CheckboxContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const StyledCheckbox = styled.input`
  margin-right: ${({ theme }) => theme.spacing[3]};
  margin-top: 3px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const LabelText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]};
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  }
`;

const CancelButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const ConfirmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TermsAgreementDialog = ({ isOpen, closeDialog, onContinue }) => {
  const [termsAccepted, setTermsAccepted] = useState({
    historicDate: false,
    responsibility: false,
  });

  const cancelButtonRef = useRef(null);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTermsAccepted((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleContinue = () => {
    onContinue();
    closeDialog();
  };

  const bothChecked =
    termsAccepted.historicDate && termsAccepted.responsibility;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeDialog}
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <StyledDialogOverlay />
        </Transition.Child>

        <StyledDialogContainer>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <StyledDialogPanel>
              <DialogHeader>
                <DialogTitleStyled>
                  Termo de Uso e Responsabilidade
                </DialogTitleStyled>
              </DialogHeader>

              <DialogContentWrapper>
                <DialogText>
                  Para prosseguir com a verificação de aptidão, você precisa
                  concordar com os seguintes termos:
                </DialogText>

                <CheckboxContainer>
                  <CheckboxLabel>
                    <StyledCheckbox
                      type="checkbox"
                      name="historicDate"
                      checked={termsAccepted.historicDate}
                      onChange={handleCheckboxChange}
                    />
                    <LabelText>
                      Atualmente o CNES disponibiliza registros até fevereiro de 2025. 
                      Sabendo disso, eu concordo que esta avaliação considera o 
                      histórico profissional até fevereiro de 2025 e que dados 
                      posteriores a esta data não serão incluídos na análise.
                    </LabelText>
                  </CheckboxLabel>

                  <CheckboxLabel>
                    <StyledCheckbox
                      type="checkbox"
                      name="responsibility"
                      checked={termsAccepted.responsibility}
                      onChange={handleCheckboxChange}
                    />
                    <LabelText>
                      Eu entendo que o resultado desta avaliação serve apenas
                      como referência e sou responsável por verificar minha
                      própria elegibilidade de acordo com os critérios oficiais
                      da SBMFC.
                    </LabelText>
                  </CheckboxLabel>
                </CheckboxContainer>
              </DialogContentWrapper>

              <DialogFooter>
                <CancelButton
                  type="button"
                  onClick={closeDialog}
                  ref={cancelButtonRef}
                >
                  Cancelar
                </CancelButton>
                <ConfirmButton
                  type="button"
                  onClick={handleContinue}
                  disabled={!bothChecked}
                >
                  Continuar
                </ConfirmButton>
              </DialogFooter>
            </StyledDialogPanel>
          </Transition.Child>
        </StyledDialogContainer>
      </Dialog>
    </Transition>
  );
};

export default TermsAgreementDialog;
