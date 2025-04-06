// Theme with colors, spacing, typography, and other design tokens
const theme = {
  colors: {
    primary: '#2563eb', // Blue
    primaryHover: '#1d4ed8',
    secondary: '#64748b', // Slate
    background: '#f8fafc',
    white: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b',
    success: '#10b981', // Green
    error: '#ef4444', // Red
    warning: '#f59e0b', // Amber
    info: '#3b82f6', // Blue
    border: '#e2e8f0',
    inputBg: '#ffffff',
    disabled: '#e2e8f0'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
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
    16: '4rem'
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
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