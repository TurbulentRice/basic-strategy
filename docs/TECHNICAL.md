# Technical Documentation

## Architecture Overview

Basic Strategy is built with Expo/React Native using TypeScript for type safety. The app follows a modular architecture with clear separation of concerns.

### Core Modules

**Game Logic** (`utils/`)
- `cardUtils.ts` - Card and deck operations
- `handUtils.ts` - Hand evaluation and classification
- `strategyUtils.ts` - Strategy lookups and validation
- `practiceGame.ts` - Practice mode game logic
- `chartUtils.ts` - Chart data conversion

**UI Components** (`components/`)
- Card display: `Card.tsx`, `Hand.tsx`
- Actions: `ActionButton.tsx`, `ActionButtons.tsx`
- Chart: `ChartCell.tsx`, `ChartLegend.tsx`, `ChartTabs.tsx`, `StrategyChart.tsx`
- Layout: `Screen.tsx`, `StatBar.tsx`, `FeedbackMessage.tsx`

**State Management** (`contexts/`)
- `PracticeContext.tsx` - Practice game state (React Context)

**Data & Configuration** (`constants/`)
- `basicStrategy.ts` - Complete strategy matrix
- `gameRules.ts` - Game rule configurations
- `colors.ts` - Color palette
- `theme.ts` - Design system

## Data Structures

### Core Types

```typescript
// Card representation
type Rank = 'A' | '2' | '3' | ... | 'K';
type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

interface Card {
  rank: Rank;
  suit: Suit;
}

// Hand representation
interface Hand {
  cards: Card[];
}

// Hand evaluation result
interface HandValue {
  total: number;
  isSoft: boolean;
  isBusted: boolean;
  isBlackjack: boolean;
}

// Actions
type Action = 'H' | 'S' | 'D' | 'DS' | 'DH' | 'P';

// Strategy matrix
interface StrategyMatrix {
  hardTotals: Record<number, Record<DealerCard, Action>>;
  softTotals: Record<number, Record<DealerCard, Action>>;
  pairs: Record<Rank, Record<DealerCard, Action>>;
}
```

### Strategy Matrix Structure

The strategy is stored as a lookup table:
- **Hard Totals**: Player totals 5-20 vs Dealer 2-A
- **Soft Totals**: A,2 through A,9 vs Dealer 2-A
- **Pairs**: 2,2 through A,A vs Dealer 2-A

Each cell contains an action: H (Hit), S (Stand), D (Double), DS (Double/Stand), DH (Double/Hit), P (Split)

## Key Algorithms

### Hand Evaluation
```typescript
evaluateHand(hand: Hand): HandValue
```
- Counts Aces and other cards
- Optimizes Ace value (11 or 1)
- Detects soft hands, blackjack, busts
- Handles multiple Aces correctly

### Strategy Lookup
```typescript
getRecommendedAction(
  playerHand: Hand,
  dealerUpCard: Card,
  rules?: GameRules
): Action
```
- Classifies hand (pair/soft/hard)
- Looks up action in strategy matrix
- Resolves conditional actions (DS, DH)
- Returns optimal play

### Practice Game Flow
1. `dealRandomHand()` - Generate random scenario
2. User selects action
3. `isActionCorrect()` - Validate choice
4. Update statistics
5. Show feedback and explanation
6. Deal next hand

## State Management

### PracticeContext
```typescript
interface PracticeState {
  currentHand: PracticeHand | null;
  lastAction: Action | null;
  wasCorrect: boolean | null;
  stats: PracticeStats;
}
```

**Actions:**
- `startNewHand()` - Deal new hand
- `submitAction(action)` - Process user's choice
- `resetStats()` - Reset statistics

## Testing

### Test Coverage
- 52 unit tests (all passing)
- Tests cover:
  - Hand evaluation edge cases
  - Strategy lookups for all scenarios
  - Ace handling (soft/hard transitions)
  - Pair detection
  - Action validation

### Running Tests
```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm run type-check    # TypeScript validation
```

## Performance Considerations

**Optimizations:**
- Strategy lookups are O(1) dictionary access
- Efficient hand evaluation algorithm
- Minimal component re-renders
- Proper React keys for lists
- Memoization where beneficial

**Bundle Size:**
- Core app: ~3,100 lines of code
- Gzipped bundle: Small (Expo optimized)
- No heavy dependencies

## File Organization

```
blackjack-basic-strategy/
├── app/                    # Screens (Expo Router)
├── components/             # Reusable UI (14 components)
├── constants/              # Data & config (4 files)
├── contexts/               # State management (1 context)
├── types/                  # TypeScript types (1 file)
├── utils/                  # Business logic (5 utilities)
└── __tests__/              # Test suites (2 files)
```

## Code Style

**Conventions:**
- TypeScript strict mode enabled
- Functional components with hooks
- Props interfaces for all components
- JSDoc comments on utility functions
- Consistent file naming (PascalCase for components)

**Type Safety:**
- No `any` types
- Full type coverage
- Strict null checks
- No unused variables

## Build & Deployment

**Development:**
```bash
npm start              # Start Expo dev server
npm run ios            # iOS simulator
npm run android        # Android emulator
npm run web            # Web browser
```

**Production:**
```bash
eas build --platform ios       # iOS build
eas build --platform android   # Android build
eas submit                     # Submit to stores
```

### EAS Build System

**Setup (one-time):**
```bash
npm install -g eas-cli
eas login
```

**Preview Builds (for testing with friends):**
```bash
# iOS - Creates TestFlight build
eas build --platform ios --profile preview

# Android - Creates APK
eas build --platform android --profile preview
```

**Production Builds (for app stores):**
```bash
# iOS
eas build --platform ios --profile production
eas submit --platform ios

# Android
eas build --platform android --profile production
eas submit --platform android
```

### Build Profiles (`eas.json`)

- **preview**: For beta testing with TestFlight (iOS) or direct APK (Android)
- **development**: For development builds with hot reload
- **production**: For App Store and Google Play submissions

### Distribution Methods

**iOS:**
- TestFlight: Automatic with EAS, up to 10,000 testers
- App Store: Full public release

**Android:**
- Direct APK: Share download link, unlimited testers
- Google Play: Internal Testing, Beta, or Production tracks

## Dependencies

**Core:**
- `expo@^54.0.33` - App framework
- `react@19.1.0` - UI library
- `react-native@0.81.5` - Native platform
- `expo-router@~6.0.23` - Navigation
- `expo-haptics@^15.0.8` - Haptic feedback

**Dev:**
- `typescript@^5.3.3` - Type checking
- `jest@^29.7.0` - Testing
- `@testing-library/react-native` - Component testing

## API Reference

See inline JSDoc comments in utility files for detailed function documentation.

### Key Functions

**Card Operations:**
- `createDeck()` - Generate 52-card deck
- `shuffleDeck(cards)` - Fisher-Yates shuffle
- `dealCard(deck)` - Deal one card
- `getCardValue(card)` - Get numeric value

**Hand Operations:**
- `evaluateHand(hand)` - Get hand value
- `isSoftHand(hand)` - Check if soft
- `isPair(hand)` - Check if pair
- `canDouble(hand)` - Validate double
- `canSplit(hand)` - Validate split

**Strategy Operations:**
- `getRecommendedAction(hand, dealer, rules)` - Get optimal action
- `isActionCorrect(hand, dealer, userAction)` - Validate choice
- `getAvailableActions(hand)` - Get valid actions

## Extending the App

**Adding New Features:**
1. Create component in `components/`
2. Add types to `types/index.ts`
3. Add utilities to appropriate `utils/` file
4. Write tests in `__tests__/`
5. Update documentation

**Adding Rule Variations:**
1. Define new rules in `constants/gameRules.ts`
2. Update strategy matrix if needed
3. Pass rules to `getRecommendedAction()`
4. Add UI for rule selection

---

For more details, see the inline code comments and JSDoc documentation.
