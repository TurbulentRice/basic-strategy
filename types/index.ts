// Card types
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface Card {
  rank: Rank;
  suit: Suit;
}

// Action types for basic strategy
export type Action =
  | 'H'   // Hit
  | 'S'   // Stand
  | 'D'   // Double
  | 'DS'  // Double if allowed, otherwise Stand
  | 'DH'  // Double if allowed, otherwise Hit
  | 'P';  // Split (pairs only)

// Hand representation
export interface Hand {
  cards: Card[];
}

// Hand evaluation result
export interface HandValue {
  total: number;        // Best total (using Ace as 11 if possible)
  isSoft: boolean;      // Contains Ace counted as 11
  isBusted: boolean;    // Over 21
  isBlackjack: boolean; // Natural 21 (Ace + 10-value card with 2 cards)
}

// Strategy matrix types
// Dealer up-card values: 2-11 (Ace = 11)
export type DealerCard = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

// Strategy lookup by dealer card
export type StrategyRow = Record<DealerCard, Action>;

// Complete strategy matrix
export interface StrategyMatrix {
  hardTotals: Record<number, StrategyRow>;  // Hard total (5-20) -> actions
  softTotals: Record<number, StrategyRow>;  // Soft total (13-19) -> actions (A,2 = 13, A,8 = 19)
  pairs: Record<Rank, StrategyRow>;         // Pair rank -> actions
}

// Game rules configuration
export interface GameRules {
  numberOfDecks: 1 | 2 | 4 | 6 | 8;
  dealerHitsSoft17: boolean;
  doubleAfterSplit: boolean;
  surrenderAllowed: boolean;
  blackjackPayout: 1.5 | 1.2;  // 3:2 or 6:5
}

// Practice mode types
export interface PracticeHand {
  playerHand: Hand;
  dealerUpCard: Card;
  correctAction: Action;
}

export interface PracticeStats {
  totalHands: number;
  correctDecisions: number;
  accuracy: number;      // Percentage (0-100)
  currentStreak: number;
  bestStreak: number;
}

// Action recommendation with explanation
export interface ActionRecommendation {
  action: Action;
  explanation: string;
  isOptimal: boolean;
}
