import { GameRules } from '@/types';

// Default game rules - most common casino setup
// Multi-deck, dealer stands on soft 17, double after split allowed
export const DEFAULT_RULES: GameRules = {
  numberOfDecks: 6,
  dealerHitsSoft17: false,  // S17 - Dealer stands on soft 17
  doubleAfterSplit: true,   // DAS allowed
  surrenderAllowed: false,  // Keep it simple for now
  blackjackPayout: 1.5,     // 3:2 payout
};

// Rule variations for future use
export const SINGLE_DECK_RULES: GameRules = {
  numberOfDecks: 1,
  dealerHitsSoft17: false,
  doubleAfterSplit: true,
  surrenderAllowed: false,
  blackjackPayout: 1.5,
};

export const VEGAS_STRIP_RULES: GameRules = {
  numberOfDecks: 6,
  dealerHitsSoft17: false,
  doubleAfterSplit: true,
  surrenderAllowed: true,
  blackjackPayout: 1.5,
};

// Less favorable rules (some casinos use these)
export const UNFAVORABLE_RULES: GameRules = {
  numberOfDecks: 8,
  dealerHitsSoft17: true,   // H17 - worse for player
  doubleAfterSplit: true,
  surrenderAllowed: false,
  blackjackPayout: 1.2,     // 6:5 - worse for player
};
