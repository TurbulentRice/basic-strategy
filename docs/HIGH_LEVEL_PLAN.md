# Basic Strategy - High-Level Plan

## Overview
A mobile app for learning and practicing blackjack basic strategy for casino play. Clean, Vegas-style design with focus on core functionality and educational value.

## Technology Stack
- **Framework**: Expo/React Native
- **Language**: TypeScript
- **State Management**: React Context (keep it simple initially)
- **UI Components**: React Native core + custom components
- **Navigation**: Expo Router
- **Testing**: Jest + React Native Testing Library

## Implementation Phases

### Phase 1: Foundation & Core Setup ✓
- [x] Initialize Expo project with TypeScript
- [x] Set up project structure
- [x] Configure linting and formatting
- [x] Create basic navigation structure
- [x] Set up documentation

### Phase 2: Basic Strategy Data & Logic
- [ ] Define basic strategy matrix data structure
- [ ] Implement basic strategy logic/rules
  - Hard hands (no aces)
  - Soft hands (with aces)
  - Pairs
- [ ] Create utility functions for:
  - Card dealing logic
  - Hand evaluation (hard/soft totals)
  - Correct action determination
- [ ] Write unit tests for core logic

### Phase 3: UI Foundation & Components
- [ ] Design and implement card component
- [ ] Create dealer/player hand display components
- [ ] Build action buttons (Hit, Stand, Double, Split)
- [ ] Implement basic strategy chart view
  - Interactive grid/table format
  - Color-coded recommendations
- [ ] Design app theme (Vegas-inspired, clean aesthetic)
- [ ] Create reusable UI primitives

### Phase 4: Strategy Chart View (Learn Mode)
- [ ] Build full basic strategy chart interface
- [ ] Implement chart legend/key
- [ ] Add dealer up-card highlighting
- [ ] Add player hand highlighting
- [ ] Enable chart exploration/browsing
- [ ] Add basic annotations/explanations

### Phase 5: Practice Mode
- [ ] Implement practice game flow
- [ ] Random hand generation
- [ ] User action input
- [ ] Real-time feedback (correct/incorrect)
- [ ] Show correct answer after user choice
- [ ] Deal next hand flow
- [ ] Add simple statistics (accuracy rate)

### Phase 6: Polish & Enhancement
- [ ] Animations and transitions
- [ ] Sound effects (optional, can disable)
- [ ] Haptic feedback
- [ ] Settings screen
  - Number of decks
  - Dealer hits/stands on soft 17
  - Sound/haptic toggles
- [ ] Performance optimization
- [ ] iOS-specific polish

### Phase 7: Testing & Refinement
- [ ] Manual testing on iOS devices
- [ ] Bug fixes and edge cases
- [ ] UI/UX refinements
- [ ] Accessibility improvements
- [ ] App icon and splash screen

## Core Data Structure

```typescript
// Basic strategy recommendation types
type Action = 'H' | 'S' | 'D' | 'P' | 'DS' | 'DH';
// H = Hit, S = Stand, D = Double, P = Split
// DS = Double if allowed, otherwise Stand
// DH = Double if allowed, otherwise Hit

// Basic strategy matrix
interface StrategyMatrix {
  hardTotals: Record<string, Action[]>;  // e.g., "9": [H, H, D, D, ...]
  softTotals: Record<string, Action[]>;  // e.g., "A,6": [H, D, D, ...]
  pairs: Record<string, Action[]>;       // e.g., "A,A": [P, P, P, ...]
}
```

## Navigation Structure

```
App
├── (tabs)
│   ├── Learn (Strategy Chart)
│   └── Practice (Game Mode)
└── Settings (modal)
```

## Design Principles

1. **Simplicity First**: Focus on core learning experience
2. **Clear Feedback**: Immediate, obvious feedback on practice decisions
3. **Visual Hierarchy**: Important information stands out
4. **Vegas Aesthetic**: Green felt background, card styling, but keep it clean
5. **Accessibility**: Good contrast, readable text, clear touch targets

## Success Criteria

- User can view complete basic strategy chart
- User can practice hands and receive accurate feedback
- App runs smoothly on iOS devices
- Visual design is clean and appealing
- Core functionality works reliably

## Out of Scope (For Now)

- Advanced counting strategies
- Multi-player modes
- Online leaderboards
- Detailed statistics/analytics
- Complex animations
- Rule variations beyond basic settings

## Next Steps

1. Initialize Expo project
2. Set up TypeScript configuration
3. Create basic navigation structure
4. Begin Phase 2: Implement basic strategy data
