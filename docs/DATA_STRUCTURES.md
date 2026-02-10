# Data Structures

## Core Types

### Card Representation

```typescript
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

interface Card {
  rank: Rank;
  suit: Suit;
}

// Card values
const CARD_VALUES: Record<Rank, number> = {
  'A': 11,  // Can also be 1
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
};
```

### Hand Representation

```typescript
interface Hand {
  cards: Card[];
  total: number;      // Best total (using Ace as 11 if possible)
  isSoft: boolean;    // Contains Ace counted as 11
  isPair: boolean;    // Two cards of same rank
}

// Hand evaluation result
interface HandValue {
  total: number;
  isSoft: boolean;
  isBusted: boolean;
  isBlackjack: boolean;
}
```

### Basic Strategy Actions

```typescript
type Action =
  | 'H'   // Hit
  | 'S'   // Stand
  | 'D'   // Double
  | 'DS'  // Double if allowed, otherwise Stand
  | 'DH'  // Double if allowed, otherwise Hit
  | 'P';  // Split (pairs only)

interface ActionRecommendation {
  action: Action;
  explanation?: string;
}
```

### Strategy Matrix

The basic strategy is stored as a matrix mapping player hands to dealer up-cards.

```typescript
// Dealer up-card values 2-11 (Ace)
type DealerCard = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface StrategyMatrix {
  hardTotals: HardTotalStrategy;
  softTotals: SoftTotalStrategy;
  pairs: PairStrategy;
}

// Hard totals: 5-20 (5 is minimum hand, <5 always hits)
type HardTotalStrategy = {
  [total: number]: Record<DealerCard, Action>;
};

// Soft totals: A,2 through A,9 (A,10 is blackjack)
type SoftTotalStrategy = {
  [total: number]: Record<DealerCard, Action>;
};

// Pairs: 2,2 through A,A
type PairStrategy = {
  [rank: string]: Record<DealerCard, Action>;
};

// Example structure:
const BASIC_STRATEGY: StrategyMatrix = {
  hardTotals: {
    8: { 2: 'H', 3: 'H', 4: 'H', 5: 'H', 6: 'H', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 11: 'H' },
    9: { 2: 'H', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 11: 'H' },
    // ... more totals
  },
  softTotals: {
    13: { 2: 'H', 3: 'H', 4: 'H', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 11: 'H' }, // A,2
    // ... more totals
  },
  pairs: {
    'A': { 2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'P', 7: 'P', 8: 'P', 9: 'P', 10: 'P', 11: 'P' },
    '8': { 2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'P', 7: 'P', 8: 'P', 9: 'P', 10: 'P', 11: 'P' },
    // ... more pairs
  },
};
```

### Practice Mode State

```typescript
interface PracticeState {
  playerHand: Hand;
  dealerUpCard: Card;
  correctAction: Action;
  userAction?: Action;
  isCorrect?: boolean;
  streak: number;        // Current correct streak
  totalAttempts: number;
  correctCount: number;
}

interface PracticeStats {
  totalHands: number;
  correctDecisions: number;
  accuracy: number;      // Percentage
  bestStreak: number;
  currentStreak: number;
}
```

### Game Rules Configuration

```typescript
interface GameRules {
  numberOfDecks: 1 | 2 | 4 | 6 | 8;
  dealerHitsSoft17: boolean;
  doubleAfterSplit: boolean;
  surrenderAllowed: boolean;
  blackjackPayout: 1.5 | 1.2;  // 3:2 or 6:5
}

const DEFAULT_RULES: GameRules = {
  numberOfDecks: 6,
  dealerHitsSoft17: false,  // Dealer stands on soft 17
  doubleAfterSplit: true,
  surrenderAllowed: false,
  blackjackPayout: 1.5,     // 3:2
};
```

## Utility Functions

### Hand Evaluation

```typescript
function evaluateHand(cards: Card[]): HandValue;
function isSoftHand(cards: Card[]): boolean;
function isPair(cards: Card[]): boolean;
function canDouble(hand: Hand): boolean;  // Only on 2 cards
function canSplit(hand: Hand): boolean;   // Only pairs with 2 cards
```

### Strategy Lookup

```typescript
function getRecommendedAction(
  playerHand: Hand,
  dealerUpCard: Card,
  rules: GameRules
): ActionRecommendation;

function isActionCorrect(
  playerHand: Hand,
  dealerUpCard: Card,
  userAction: Action,
  rules: GameRules
): boolean;
```

### Card Dealing

```typescript
function createDeck(): Card[];
function shuffleDeck(cards: Card[]): Card[];
function dealCard(deck: Card[]): [Card, Card[]];  // Returns card and remaining deck
function dealRandomHand(): { playerHand: Hand; dealerCard: Card };
```

## Color Coding for Chart

```typescript
type ActionColor = {
  H: string;   // Light red/pink
  S: string;   // Light blue
  D: string;   // Light yellow/gold
  DS: string;  // Yellow-blue gradient
  DH: string;  // Yellow-red gradient
  P: string;   // Light green
};

const ACTION_COLORS: ActionColor = {
  H: '#ffcdd2',   // Light red
  S: '#bbdefb',   // Light blue
  D: '#fff9c4',   // Light yellow
  DS: '#dcedc8',  // Light green-yellow
  DH: '#ffe0b2',  // Light orange
  P: '#c8e6c9',   // Light green
};
```

## Notes

- All player hands are represented with their cards, not just totals
- This allows proper pair detection and soft hand identification
- Dealer always shows one card initially (the up-card)
- Strategy lookups handle edge cases (soft hands that become hard after hitting)
- Card deck simulation for practice mode ensures realistic distributions
