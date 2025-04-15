import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import Button from "./Button";
import TermsAgreementDialog from "./TermsAgreementDialog";
import { validateCPF, validateName, validateForm } from "../utils/validators";
import { formatCPF } from "../utils/formatters";

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  width: 100%;
  max-width: 500px;
`;

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const FormDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-left: ${({ theme }) => theme.spacing[16]};
  padding-right: ${({ theme }) => theme.spacing[16]};
`;

const UserForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    cpf: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    cpf: "",
    name: "",
  });

  // Dialog state management
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [validatedFormData, setValidatedFormData] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      // Format CPF as user types (e.g., 123.456.789-00)
      setFormData({
        ...formData,
        [name]: formatCPF(value),
      });

      // Clear error when user starts typing again
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear error when user starts typing again
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }
  };

  // Validate individual fields on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const cpfValidation = validateCPF(value);
      if (!cpfValidation.isValid) {
        setErrors({
          ...errors,
          cpf: cpfValidation.error,
        });
      }
    } else if (name === "name") {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid) {
        setErrors({
          ...errors,
          name: nameValidation.error,
        });
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the entire form before submission
    const validation = validateForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Store validated data and show terms dialog
    setValidatedFormData({
      cpf: validation.formattedData.cpf,
      name: validation.formattedData.name,
    });

    setShowTermsDialog(true);
  };

  const handleTermsAccepted = () => {
    if (validatedFormData) {
      onSubmit(validatedFormData);
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Verifique sua aptidão</FormTitle>
        <FormDescription>Envie seus dados para a avaliação.</FormDescription>

        <FormInput
          id="cpf"
          name="cpf"
          label="CPF"
          value={formData.cpf}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="000.000.000-00"
          error={errors.cpf}
          helperText="Insira os 11 dígitos do seu CPF, sem pontos ou traços."
          required
          disabled={isLoading}
          maxLength={14}
        />

        <FormInput
          id="name"
          name="name"
          label="Nome completo"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Insira seu nome completo"
          error={errors.name}
          helperText="Insira seu nome completo sem abreviações."
          required
          disabled={isLoading}
        />

        <ButtonContainer>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Verificar Aptidão"}
          </Button>
        </ButtonContainer>
      </FormContainer>
      <TermsAgreementDialog
        isOpen={showTermsDialog}
        closeDialog={() => setShowTermsDialog(false)}
        onContinue={handleTermsAccepted}
      />
    </>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UserForm;
