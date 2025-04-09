import React, { useRef, Fragment } from "react";
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
  max-width: 800px;
  max-height: 80vh; /* Limit height to 80% of viewport height */
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* Important for layout */

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 95%;
    max-height: 90vh; /* More space on mobile */
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[3]};
  border-bottom: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]}
      ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding-right: ${({ theme }) => theme.spacing[8]};
`;

const DialogCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const DialogContentWrapper = styled.div`
  flex: 1; /* Take available space */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: ${({ theme }) => theme.spacing[6]};

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundLight};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textLight};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const DialogContent = styled.div``;

const DialogText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DialogOrderedList = styled.ol`
  list-style-type: decimal;
  padding-left: ${({ theme }) => theme.spacing[5]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DialogUnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: ${({ theme }) => theme.spacing[5]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DialogListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  }
`;

const DialogButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Subtle scroll indicator that appears when content is scrollable
const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 70px; /* Position above footer */
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.borderColor};
  border-radius: 2px;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  /* Show only when needed - controlled by JS */
  display: ${({ show }) => (show ? "block" : "none")};
`;

// Dialog Implementation
const CriteriaDialog = ({ isOpen, closeDialog }) => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);

  // Check if content is scrollable
  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      const checkScroll = () => {
        const { scrollHeight, clientHeight } = contentRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      };

      // Check after content loads
      checkScroll();

      // Recheck on window resize
      window.addEventListener("resize", checkScroll);
      return () => window.removeEventListener("resize", checkScroll);
    }
  }, [isOpen, contentRef.current]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeDialog}
        initialFocus={buttonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <StyledDialogOverlay aria-hidden="true" />
        </Transition.Child>

        <StyledDialogContainer>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <StyledDialogPanel>
              <DialogHeader>
                <DialogTitleStyled as="h3">
                  Critérios para o cálculo de Aptidão ao TEMFC
                </DialogTitleStyled>
                <DialogCloseButton
                  onClick={closeDialog}
                  aria-label="Close dialog"
                >
                  ×
                </DialogCloseButton>
              </DialogHeader>

              <DialogContentWrapper ref={contentRef}>
                <DialogContent>
                  <DialogText>
                    Para ser considerado apto a realizar a prova do TEMFC, o
                    candidato deve atender a pelo menos um dos seguintes
                    critérios:
                  </DialogText>

                  <DialogOrderedList>
                    <DialogListItem>
                      Ter concluído Programa de Residência Médica em Medicina de
                      Família e Comunidade (MFC) - ou em sua denominação
                      anterior (Medicina Geral Comunitária) - credenciado pela
                      Comissão Nacional de Residência Médica (CNRM);
                    </DialogListItem>
                    <DialogListItem>
                      Ser profissional médico na área de Atenção Primária em
                      Saúde (APS) por, no mínimo, 48 (quarenta e oito) meses,
                      consecutivos ou não, contados até a data final de
                      inscrição para este Exame de Suficiência. A atividade
                      profissional deve ser assistencial, prestada a pessoas de
                      todas as faixas etárias e realizada em cenário de prática
                      da APS no Brasil.
                    </DialogListItem>
                    <DialogListItem>
                      Ser bolsista no Programa Médicos pelo Brasil (PMpB) pelo
                      período mínimo de 2 (dois) anos completos, com aprovação
                      em todas as etapas do curso de especialização.
                    </DialogListItem>
                  </DialogOrderedList>

                  <DialogText>
                    As avaliações realizadas por este sistema consideram{" "}
                    <strong>única e exclusivamente o critério 2</strong>{" "}
                    informado acima.
                  </DialogText>
                  <DialogText>
                    Os critérios considerados para o cálculo de Aptidão ao TEMFC
                    baseiam-se única e exclusivamente no edital e nas informações
                    oficiais da Sociedade Brasileira de Medicina de Família e
                    Comunidade (SBMFC), os quais são:
                  </DialogText>

                  <DialogUnorderedList>
                    <DialogListItem>
                      Para as atividades profissionais registradas no CNES como
                      médico generalista e/ou médico clínico serem aceitas, a
                      atuação deve ser especificamente em Atenção Primária à
                      Saúde (APS), ou seja, que fornecem serviço especializado
                      de código 159 ou 152 conforme registro no CNES.
                    </DialogListItem>
                    <DialogListItem>
                      Para as atividades profissionais registradas no CNES como
                      médico de família serão aceitas independentemente do local de
                      atuação.
                    </DialogListItem>
                    <DialogListItem>
                      Para contabilizar o tempo de atuação do critério “2”,
                      serão consideradas as atividades cumpridas com carga
                      horária mínima assistencial de 40 horas semanais. Além
                      disso, serão aceitos registros no CNES com carga horária
                      de 30 horas semanais ou 20 horas semanais, sendo que,
                      nesses casos, o tempo de serviço será contado com uma
                      redução proporcional de ¼ ou ½ respectivamente.
                    </DialogListItem>
                    <DialogListItem>
                      Os meses com carga horário maior ou igual a 10 horas
                      e inferior a 20 horas semanais serão contados
                      apenas se houver 2 (dois) ou mais registros no mesmo mês
                      ou se houver ocorrência no mesmo mês de carga horária de
                      20 horas semanais ou mais.
                    </DialogListItem>
                    <DialogListItem>
                      Serão considerados meses com no máximo 40 horas semanais e
                      no mínimo 20 horas semanais, sendo os meses com carga
                      horária inferior a 40 horas semanais contados de forma
                      proporcional, de acordo com o item acima.
                    </DialogListItem>
                    <DialogListItem>
                      Os meses que ultrapassem a carga horária de 40 horas
                      semanais serão contados como Meses de 40 horas semanais,
                      sendo as horas excedentes descartadas, ou seja, se o
                      referido mês já tiver ultrapassado o máximo de 40 horas
                      semanais, será contabilizado apenas 1 (um) mês de 40 horas
                      semanais, mesmo que as atividades tenham sido realizadas
                      em locais distintos.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 2 (dois) registros ou mais de 30 horas
                      semanais será contado como 1 (um) mês de 40 horas
                      semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 2 (dois) registros ou mais de 20 horas
                      semanais será contado como 1 (um) mês de 40 horas
                      semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 1 (um) registro de 20 horas semanais e 1
                      (um) registro de 30 horas semanais será contado como 1
                      (um) mês de 40 horas semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 2 (dois) registros de 10 horas semanais
                      será contado como 1 (um) mês de 20 horas semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 3 (três) registros de 10 horas semanais
                      será contado como 1 (um) mês de 30 horas semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 4 (quatro) ou mais registros de 10 horas
                      semanais será contado como 1 (um) mês de 40 horas
                      semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 1 (um) registro de 10 horas semanais e 1
                      (um) registro de 30 horas semanais será contado como 1
                      (um) mês de 40 horas semanais.
                    </DialogListItem>
                    <DialogListItem>
                      Um mês que possua 1 (um) registro de 10 horas semanais e 1
                      (um) registro de 20 horas semanais será contado como 1
                      (um) mês de 30 horas semanais.
                    </DialogListItem>
                  </DialogUnorderedList>
                </DialogContent>
              </DialogContentWrapper>

              <ScrollIndicator show={showScrollIndicator} />

              <DialogFooter>
                <DialogButton
                  type="button"
                  onClick={closeDialog}
                  ref={buttonRef}
                >
                  Entendi
                </DialogButton>
              </DialogFooter>
            </StyledDialogPanel>
          </Transition.Child>
        </StyledDialogContainer>
      </Dialog>
    </Transition>
  );
};

export default CriteriaDialog;
