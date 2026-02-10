/**
 * Enhanced color palette with depth and glassmorphism support
 * Vegas-inspired with modern glass aesthetics
 */

export const COLORS = {
  // Casino felt green (enhanced with gradients)
  feltGreen: {
    darkest: '#081510',
    dark: '#0d2818',
    medium: '#1a472a',
    light: '#2d5a3d',
    lighter: '#3d6b4d',
    accent: '#4a7f5c',
  },

  // Gold accents (enhanced with metallic feel)
  gold: {
    darkest: '#997700',
    dark: '#ccaa00',
    primary: '#ffd700',
    light: '#ffe066',
    lighter: '#ffeb99',
    glow: 'rgba(255, 215, 0, 0.4)',
  },

  // Card colors
  card: {
    background: '#ffffff',
    red: '#d32f2f',
    redGlow: 'rgba(211, 47, 47, 0.3)',
    black: '#000000',
    border: '#e0e0e0',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },

  // UI Elements (enhanced)
  ui: {
    white: '#ffffff',
    lightGray: '#f5f5f5',
    mediumGray: '#888888',
    darkGray: '#333333',
    border: '#2d5a3d',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',
  },

  // Feedback colors (enhanced)
  feedback: {
    correct: '#4caf50',
    correctLight: '#81c784',
    correctGlow: 'rgba(76, 175, 80, 0.3)',
    incorrect: '#f44336',
    incorrectLight: '#e57373',
    incorrectGlow: 'rgba(244, 67, 54, 0.3)',
    warning: '#ff9800',
  },

  // Strategy chart action colors (enhanced with better contrast)
  actions: {
    hit: '#ffcdd2',
    stand: '#bbdefb',
    double: '#fff9c4',
    doubleSplit: '#dcedc8',
    doubleHit: '#ffe0b2',
    split: '#c8e6c9',
  },

  // Glassmorphism colors
  glass: {
    white: 'rgba(255, 255, 255, 0.1)',
    whiteStrong: 'rgba(255, 255, 255, 0.15)',
    whiteLight: 'rgba(255, 255, 255, 0.05)',
    dark: 'rgba(0, 0, 0, 0.1)',
    darkStrong: 'rgba(0, 0, 0, 0.2)',
    green: 'rgba(45, 90, 61, 0.5)',
    greenStrong: 'rgba(45, 90, 61, 0.7)',
    gold: 'rgba(255, 215, 0, 0.15)',
  },

  // Gradients
  gradients: {
    feltDark: ['#0d2818', '#1a472a'],
    feltLight: ['#1a472a', '#2d5a3d'],
    gold: ['#ffd700', '#ffeb99'],
    goldReverse: ['#ffeb99', '#ffd700'],
    glass: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)'],
  },
} as const;

// Action button colors (enhanced with glass effects)
export const ACTION_BUTTON_COLORS = {
  H: {
    background: '#e53935',
    backgroundGlass: 'rgba(229, 57, 53, 0.9)',
    pressed: '#c62828',
    text: '#ffffff',
    glow: 'rgba(229, 57, 53, 0.4)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  S: {
    background: '#1e88e5',
    backgroundGlass: 'rgba(30, 136, 229, 0.9)',
    pressed: '#1565c0',
    text: '#ffffff',
    glow: 'rgba(30, 136, 229, 0.4)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  D: {
    background: '#ffd700',
    backgroundGlass: 'rgba(255, 215, 0, 0.9)',
    pressed: '#ccaa00',
    text: '#333333',
    glow: 'rgba(255, 215, 0, 0.5)',
    border: 'rgba(255, 255, 255, 0.3)',
  },
  P: {
    background: '#43a047',
    backgroundGlass: 'rgba(67, 160, 71, 0.9)',
    pressed: '#2e7d32',
    text: '#ffffff',
    glow: 'rgba(67, 160, 71, 0.4)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
} as const;
