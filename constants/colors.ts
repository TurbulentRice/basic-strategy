/**
 * Color palette for the Basic Strategy app
 * Vegas-inspired with clean, modern aesthetics
 */

export const COLORS = {
  // Casino felt green (background)
  feltGreen: {
    dark: '#0d2818',
    medium: '#1a472a',
    light: '#2d5a3d',
    lighter: '#3d6b4d',
  },

  // Gold accents (Vegas luxury)
  gold: {
    primary: '#ffd700',
    light: '#ffe066',
    dark: '#ccaa00',
  },

  // Card colors
  card: {
    background: '#ffffff',
    red: '#d32f2f',
    black: '#000000',
    border: '#e0e0e0',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },

  // UI Elements
  ui: {
    white: '#ffffff',
    lightGray: '#f5f5f5',
    mediumGray: '#888888',
    darkGray: '#333333',
    border: '#2d5a3d',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Feedback colors
  feedback: {
    correct: '#4caf50',
    correctLight: '#81c784',
    incorrect: '#f44336',
    incorrectLight: '#e57373',
    warning: '#ff9800',
  },

  // Strategy chart action colors (for Learn mode)
  actions: {
    hit: '#ffcdd2',        // Light red
    stand: '#bbdefb',      // Light blue
    double: '#fff9c4',     // Light yellow
    doubleSplit: '#dcedc8', // Light green-yellow
    doubleHit: '#ffe0b2',  // Light orange
    split: '#c8e6c9',      // Light green
  },
} as const;

// Action button colors (for Practice mode)
export const ACTION_BUTTON_COLORS = {
  H: {
    background: '#e53935',
    pressed: '#c62828',
    text: '#ffffff',
  },
  S: {
    background: '#1e88e5',
    pressed: '#1565c0',
    text: '#ffffff',
  },
  D: {
    background: '#ffd700',
    pressed: '#ccaa00',
    text: '#333333',
  },
  P: {
    background: '#43a047',
    pressed: '#2e7d32',
    text: '#ffffff',
  },
} as const;
