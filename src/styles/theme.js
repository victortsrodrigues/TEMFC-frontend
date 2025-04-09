// Theme with colors, spacing, typography, and other design tokens
// background: 'radial-gradient(circle at bottom left, #3BAAFC 0%, #6D7CFD 20%, #77C3FD 50%, #9ad3fe  75%)',
const theme = {
  colors: {
    primary: '#6375f0',
    primaryHover: '#4f61e6',
    secondary: '#64748b',
    background: 'linear-gradient(to right, #6D7CFD, #77C3FD, #3BAAFC)',
    white: '#ffffff',
    text: '#262626',
    textLight: '#64748b',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    border: '#e2e8f0',
    inputBg: '#ffffff',
    disabled: '#e2e8f0',
    card: 'rgba(255, 255, 255, 0.95)',
    cardHover: 'rgba(255, 255, 255, 1)',
    overlay: 'rgba(0, 0, 0, 0.05)'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem'
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.6rem',
    xl: '1.20rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

export default theme;