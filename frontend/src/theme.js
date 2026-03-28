/**
 * Global Theme Configuration — ARKA Dark Premium
 * Based on the "Assessment Hub" style reference.
 */

const theme = {
  colors: {
    // Core accents
    primary: '#8B5CF6',        // vibrant purple
    primaryGradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)', // purple → pink
    
    // Backgrounds
    background: '#0D0D10',    // deepest background
    surface: '#15151A',       // card background
    inputBg: '#1A1A20',
    gridColor: 'rgba(139, 92, 246, 0.05)',
    
    // Text
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    
    // Borders
    border: '#2D2D35',
    borderLight: '#3F3F4A',
    
    // Status
    success: '#10B981',
    error: '#EF4444',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.75rem',
    hero: '4.5rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
  shadows: {
    card: '0 20px 50px rgba(0, 0, 0, 0.5)',
    glow: '0 0 30px rgba(139, 92, 246, 0.15)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export default theme;
