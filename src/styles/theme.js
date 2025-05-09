const theme = {
  colors: {
    // Changed primary to a darker purple for better contrast
    primary: '#5151d3',
    // Darker hover state
    primaryHover: '#4242b3',
    secondary: '#64748b',
    // Made terciary color darker for better contrast
    terciary: '#3090e8',
    // Modified the background gradient for better contrast with white text
    background: 'linear-gradient(to left, #5151d3, #4e7edb, #3090e8)',
    white: '#ffffff',
    text: '#262626',
    // Darkened textLight for better readability
    textLight: '#505b70',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    // Darkened border color slightly
    border: '#d1d7e5',
    inputBg: '#ffffff',
    disabled: '#e2e8f0',
    // Added slight opacity to card background for subtle effect
    card: 'rgba(255, 255, 255, 0.98)',
    cardHover: 'rgba(255, 255, 255, 1)',
    // Increased overlay opacity for better contrast
    overlay: 'rgba(0, 0, 0, 0.1)'
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
    md: '1023px',
    lg: '1024px',
    xl: '1280px'
  }
};

export default theme;