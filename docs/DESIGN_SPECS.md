# Design Specifications

## Design Philosophy

**Vegas Elegance Meets Modern Simplicity**

The app should evoke the feeling of a high-end casino table while maintaining clean, modern mobile UX principles. Think elegant simplicity rather than flashy excess.

## Color Palette

### Primary Colors

```typescript
const COLORS = {
  // Casino felt green (background)
  feltGreen: {
    dark: '#0d2818',    // Deep green for main background
    medium: '#1a472a',  // Medium green for headers/bars
    light: '#2d5a3d',   // Light green for borders/accents
  },

  // Gold accents (Vegas luxury)
  gold: {
    primary: '#ffd700',   // Rich gold for primary actions
    light: '#ffe066',     // Light gold for hover states
    dark: '#ccaa00',      // Dark gold for pressed states
  },

  // Card colors
  card: {
    background: '#ffffff',
    red: '#d32f2f',       // Hearts, diamonds
    black: '#000000',     // Spades, clubs
    shadow: 'rgba(0,0,0,0.3)',
  },

  // UI Elements
  ui: {
    white: '#ffffff',
    lightGray: '#f5f5f5',
    mediumGray: '#888888',
    darkGray: '#333333',
    border: '#2d5a3d',
  },

  // Feedback colors
  feedback: {
    correct: '#4caf50',    // Green for correct
    incorrect: '#f44336',  // Red for incorrect
    warning: '#ff9800',    // Orange for warnings
  },

  // Strategy chart action colors
  actions: {
    hit: '#ffcdd2',       // Light red
    stand: '#bbdefb',     // Light blue
    double: '#fff9c4',    // Light yellow
    doubleSplit: '#dcedc8', // Light green-yellow
    doubleHit: '#ffe0b2',   // Light orange
    split: '#c8e6c9',     // Light green
  },
};
```

## Typography

### Font System

```typescript
const TYPOGRAPHY = {
  // Use system fonts for best performance
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'Courier',  // For card ranks
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
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

## Spacing System

```typescript
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};
```

## Component Specifications

### Playing Cards

**Dimensions:**
- Width: 60px (standard), 80px (large)
- Height: 84px (standard), 112px (large)
- Aspect ratio: 5:7 (standard playing card)
- Border radius: 6px

**Design:**
- White background
- Subtle shadow: 0px 2px 8px rgba(0,0,0,0.2)
- Rank displayed in top-left and bottom-right (rotated 180°)
- Suit symbol centered for face-up cards
- Solid green back pattern for face-down cards

**States:**
- Face up (normal)
- Face down (dealer's hidden card)
- Highlighted (during chart interaction)

### Action Buttons

**Primary Actions (Hit, Stand, Double, Split):**
- Height: 56px
- Border radius: 12px
- Font size: 18px, bold
- Shadow: 0px 4px 12px rgba(0,0,0,0.3)
- Haptic feedback on press

**Colors:**
- Hit: Red accent with white text
- Stand: Blue accent with white text
- Double: Gold with dark text
- Split: Green accent with white text

**States:**
- Default
- Pressed (slightly smaller scale, deeper shadow)
- Disabled (50% opacity, no interaction)

### Strategy Chart

**Grid Layout:**
- Rows: Player hands (hard totals, soft totals, pairs)
- Columns: Dealer up-cards (2-10, A)
- Cell size: 32x32px (minimum tap target)
- Border: 1px solid #2d5a3d

**Cell Design:**
- Background color based on action
- Centered text (action letter: H, S, D, etc.)
- Bold font, 14px
- Slight padding: 4px

**Interaction:**
- Highlight row/column on touch
- Zoom/modal view for cell details
- Smooth scrolling

### Tab Bar

**Design:**
- Height: 60px
- Background: #1a472a (medium green)
- Border top: 1px solid #2d5a3d
- Icons + labels

**States:**
- Active: Gold color (#ffd700)
- Inactive: Gray (#888888)

## Screen Layouts

### Learn Screen (Strategy Chart)

```
┌─────────────────────────────┐
│ Header: Basic Strategy      │
├─────────────────────────────┤
│                             │
│  Legend:                    │
│  [H] [S] [D] [DS] [DH] [P] │
│                             │
│  ┌─────────────────────┐   │
│  │  Strategy Chart     │   │
│  │                     │   │
│  │  [Scrollable Grid]  │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│  Section Tabs:              │
│  [Hard] [Soft] [Pairs]     │
│                             │
└─────────────────────────────┘
│ Tab Bar: Learn | Practice   │
└─────────────────────────────┘
```

### Practice Screen

```
┌─────────────────────────────┐
│ Header: Practice Mode       │
├─────────────────────────────┤
│  Stats: 15/20 (75%)         │
│  Streak: 🔥 5               │
├─────────────────────────────┤
│                             │
│     Dealer: [?] [A♠]       │
│                             │
│                             │
│     You: [7♥] [8♦]         │
│          (15)              │
│                             │
│  ┌───────────────────────┐ │
│  │ What should you do?   │ │
│  └───────────────────────┘ │
│                             │
│  ┌─────┐ ┌─────┐          │
│  │ Hit │ │Stand│          │
│  └─────┘ └─────┘          │
│                             │
│  ┌──────┐ ┌──────┐        │
│  │Double│ │Split │        │
│  └──────┘ └──────┘        │
│                             │
└─────────────────────────────┘
│ Tab Bar: Learn | Practice   │
└─────────────────────────────┘
```

### Practice Feedback (After Action)

```
┌─────────────────────────────┐
│ Header: Practice Mode       │
├─────────────────────────────┤
│  Stats: 16/21 (76%)         │
│  Streak: 🔥 6               │
├─────────────────────────────┤
│                             │
│     Dealer: [10] [A♠]      │
│                             │
│     You: [7♥] [8♦]         │
│          (15)              │
│                             │
│  ┌───────────────────────┐ │
│  │    ✅ Correct!        │ │
│  │  You chose: Hit       │ │
│  │  That's right! 15 vs  │ │
│  │  A always hits.       │ │
│  └───────────────────────┘ │
│                             │
│     ┌─────────────┐        │
│     │ Next Hand   │        │
│     └─────────────┘        │
│                             │
└─────────────────────────────┘
│ Tab Bar: Learn | Practice   │
└─────────────────────────────┘
```

## Animations & Transitions

### Card Dealing
- Slide in from right (0.3s ease-out)
- Slight rotation effect for natural feel
- Cards appear sequentially (0.1s delay between cards)

### Button Press
- Scale down to 0.95 (0.1s)
- Spring back to 1.0 (0.2s)
- Haptic feedback on press

### Feedback Display
- Fade in (0.2s)
- Slide up slightly (0.3s ease-out)
- Celebration animation for correct streaks (>5)

### Screen Transitions
- Fade between tabs (0.2s)
- Slide for modal views (0.3s)

## Accessibility

### Requirements
- Minimum touch target: 44x44px (iOS guideline)
- Color contrast ratio: 4.5:1 minimum
- Screen reader labels for all interactive elements
- Clear focus indicators
- Support for dynamic text sizing

### Color Blindness Considerations
- Don't rely solely on color for strategy chart
- Use icons + text labels
- Pattern backgrounds as alternative

## Icons

Using SF Symbols (iOS) / Material Icons (Android):
- Learn: chart.bar or book.fill
- Practice: gamecontroller.fill or play.circle
- Settings: gear
- Info: info.circle
- Correct: checkmark.circle.fill
- Incorrect: xmark.circle.fill

## Loading States

### Initial Load
- Simple spinner with gold color
- Center of screen
- App name below

### Card Dealing
- Smooth animation from deck position
- No explicit loader (animation is the feedback)

## Empty States

### No Practice History
- Friendly message: "Ready to practice?"
- Start button
- Brief explanation

## Error States

### General Error
- Clear message
- Retry button
- Subtle red accent
- No scary technical jargon

## Performance Guidelines

- Keep animations at 60fps
- Lazy load strategy chart sections
- Optimize card images (if using custom graphics)
- Minimize re-renders in practice mode
- Keep bundle size under 5MB

## Platform-Specific Notes

### iOS
- Use native haptics
- Respect safe area insets
- Support dark mode (future)
- Follow iOS navigation patterns

### Android
- Use Material ripple effects
- Respect system navigation
- Follow Material Design guidelines
- Support back button behavior
