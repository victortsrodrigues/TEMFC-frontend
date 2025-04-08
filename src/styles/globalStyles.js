import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    line-height: 1.2;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
  }

  /* Container for content positioning */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Placeholder styling */
  ::placeholder {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    opacity: 0.7;
  }
`;

export default GlobalStyles;
