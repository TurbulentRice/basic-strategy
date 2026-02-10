import { TextStyle } from 'react-native';
import { COLORS } from './colors';

// Re-export COLORS for convenience
export { COLORS };

/**
 * Theme system for consistent styling across the app
 */

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'Courier',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  fontWeight: {
    normal: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
} as const;

// Card dimensions
export const CARD = {
  width: {
    small: 50,
    standard: 80,
    large: 105,
  },
  aspectRatio: 5 / 7, // Standard playing card ratio
  borderRadius: BORDER_RADIUS.md,
} as const;

// Common screen padding
export const SCREEN_PADDING = SPACING.md;

// Glassmorphism effects
export const GLASS_EFFECTS = {
  light: {
    backgroundColor: COLORS.glass.white,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteStrong,
  },
  medium: {
    backgroundColor: COLORS.glass.whiteStrong,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  strong: {
    backgroundColor: COLORS.glass.green,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteStrong,
  },
  gold: {
    backgroundColor: COLORS.glass.gold,
    borderWidth: 1.5,
    borderColor: COLORS.gold.glow,
  },
} as const;

// Theme object combining all constants
export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  card: CARD,
  screenPadding: SCREEN_PADDING,
  glassEffects: GLASS_EFFECTS,
} as const;

export type Theme = typeof THEME;
