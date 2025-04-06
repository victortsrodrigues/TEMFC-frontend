import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import { NotificationProvider } from './contexts/NotificationContext';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <GlobalStyles />
        <Home />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;