import { PracticeHand, Card, GameRules } from '@/types';
import { createShoe, shuffleDeck, dealCards, getRandomCard } from './cardUtils';
import { getRecommendedAction } from './strategyUtils';
import { createHand, isBlackjack, evaluateHand } from './handUtils';

/**
 * Deal a random practice hand
 * Returns a player hand and dealer up card with the correct action
 */
export function dealRandomHand(rules?: GameRules): PracticeHand {
  // Create and shuffle a shoe
  const numberOfDecks = rules?.numberOfDecks || 6;
  const shoe = shuffleDeck(createShoe(numberOfDecks));

  // Deal 2 cards to player, 1 to dealer
  const [playerCards, remaining] = dealCards(shoe, 2);
  const [dealerCards] = dealCards(remaining, 1);
  const dealerCard = dealerCards[0];

  const playerHand = createHand(playerCards);

  // Skip if player has blackjack (no decision to make)
  // In practice, we'll regenerate if this happens
  if (isBlackjack(playerHand)) {
    return dealRandomHand(rules); // Recursively deal again
  }

  const correctAction = getRecommendedAction(playerHand, dealerCard, rules);

  return {
    playerHand,
    dealerUpCard: dealerCard,
    correctAction,
  };
}

/**
 * Generate a balanced mix of practice hands
 * Ensures variety across different hand types
 */
export function generateBalancedHand(
  handType: 'hard' | 'soft' | 'pair' | 'random' = 'random',
  rules?: GameRules
): PracticeHand {
  if (handType === 'random') {
    return dealRandomHand(rules);
  }

  // Generate specific hand types for focused practice
  let playerCards: Card[];
  let dealerCard: Card;

  if (handType === 'pair') {
    // Generate a pair
    playerCards = generatePair();
  } else if (handType === 'soft') {
    // Generate a soft hand (with Ace)
    playerCards = generateSoftHand();
  } else {
    // Generate a hard hand
    playerCards = generateHardHand();
  }

  // Get dealer card
  dealerCard = getRandomCard();

  const playerHand = createHand(playerCards);
  const correctAction = getRecommendedAction(playerHand, dealerCard, rules);

  return {
    playerHand,
    dealerUpCard: dealerCard,
    correctAction,
  };
}

/**
 * Generate a pair (two cards of same value)
 */
function generatePair(): Card[] {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  const suit1 = suits[Math.floor(Math.random() * suits.length)];
  let suit2 = suits[Math.floor(Math.random() * suits.length)];

  // Make sure suits are different
  while (suit2 === suit1) {
    suit2 = suits[Math.floor(Math.random() * suits.length)];
  }

  return [
    { rank, suit: suit1 },
    { rank, suit: suit2 },
  ];
}

/**
 * Generate a soft hand (Ace + another card, not 10)
 */
function generateSoftHand(): Card[] {
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9'] as const; // Not 10 to avoid blackjack
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  const suit1 = suits[Math.floor(Math.random() * suits.length)];
  const suit2 = suits[Math.floor(Math.random() * suits.length)];

  return [
    { rank: 'A', suit: suit1 },
    { rank, suit: suit2 },
  ];
}

/**
 * Generate a hard hand (no Ace, or Ace counted as 1)
 */
function generateHardHand(): Card[] {
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

  const rank1 = ranks[Math.floor(Math.random() * ranks.length)];
  const rank2 = ranks[Math.floor(Math.random() * ranks.length)];
  const suit1 = suits[Math.floor(Math.random() * suits.length)];
  const suit2 = suits[Math.floor(Math.random() * suits.length)];

  const hand = createHand([
    { rank: rank1, suit: suit1 },
    { rank: rank2, suit: suit2 },
  ]);

  // Make sure it's actually hard (total <= 21)
  const value = evaluateHand(hand);
  if (value.isSoft || value.isBusted || value.isBlackjack) {
    return generateHardHand(); // Try again
  }

  return hand.cards;
}

/**
 * Generate a set of practice hands covering all scenarios
 * Useful for comprehensive practice sessions
 */
export function generatePracticeSet(count: number, rules?: GameRules): PracticeHand[] {
  const hands: PracticeHand[] = [];

  // Generate a mix of hand types
  const types: Array<'hard' | 'soft' | 'pair'> = ['hard', 'soft', 'pair'];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    hands.push(generateBalancedHand(type, rules));
  }

  // Shuffle the set
  for (let i = hands.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hands[i], hands[j]] = [hands[j], hands[i]];
  }

  return hands;
}

/**
 * Calculate practice statistics
 */
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Get feedback message based on accuracy
 */
export function getAccuracyFeedback(accuracy: number): string {
  if (accuracy >= 95) return "Perfect! You've mastered basic strategy!";
  if (accuracy >= 90) return "Excellent! You're very close to mastery!";
  if (accuracy >= 80) return 'Great job! Keep practicing!';
  if (accuracy >= 70) return 'Good progress! Review the chart and try again.';
  if (accuracy >= 60) return 'Keep going! Practice makes perfect.';
  return "Don't give up! Study the strategy chart and practice more.";
}

/**
 * Get streak message
 */
export function getStreakMessage(streak: number): string {
  if (streak >= 20) return 'INCREDIBLE STREAK!';
  if (streak >= 10) return 'AMAZING STREAK!';
  if (streak >= 5) return 'ON FIRE!';
  return '';
}
