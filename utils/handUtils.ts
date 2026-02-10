import { Hand, HandValue, Card } from '@/types';
import { getCardValue, isSameRank } from './cardUtils';

/**
 * Evaluate a hand and return its best value
 * Handles soft hands (Ace as 11) and hard hands (Ace as 1)
 */
export function evaluateHand(hand: Hand): HandValue {
  const { cards } = hand;

  if (cards.length === 0) {
    return {
      total: 0,
      isSoft: false,
      isBusted: false,
      isBlackjack: false,
    };
  }

  // Count aces and calculate base total
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    const value = getCardValue(card);
    if (card.rank === 'A') {
      aces++;
      total += 11; // Initially count aces as 11
    } else {
      total += value;
    }
  }

  // Adjust for aces if busted (convert Ace from 11 to 1)
  while (total > 21 && aces > 0) {
    total -= 10; // Convert one Ace from 11 to 1
    aces--;
  }

  const isBusted = total > 21;
  // Soft hand = has at least one Ace counted as 11 (aces > 0 after adjustment)
  const isSoft = aces > 0 && !isBusted;

  // Blackjack = exactly 2 cards totaling 21 (Ace + 10-value card)
  const isBlackjack = cards.length === 2 && total === 21;

  return {
    total,
    isSoft,
    isBusted,
    isBlackjack,
  };
}

/**
 * Check if a hand is soft (contains an Ace counted as 11)
 */
export function isSoftHand(hand: Hand): boolean {
  return evaluateHand(hand).isSoft;
}

/**
 * Check if a hand is hard (no Ace counted as 11)
 */
export function isHardHand(hand: Hand): boolean {
  return !evaluateHand(hand).isSoft;
}

/**
 * Check if a hand is a pair (two cards of same value)
 * Note: All 10-value cards (10, J, Q, K) are considered pairs
 */
export function isPair(hand: Hand): boolean {
  const { cards } = hand;
  if (cards.length !== 2) return false;
  return isSameRank(cards[0], cards[1]);
}

/**
 * Get the rank for a pair (for strategy lookup)
 * Returns undefined if not a pair
 */
export function getPairRank(hand: Hand): string | undefined {
  if (!isPair(hand)) return undefined;

  const rank = hand.cards[0].rank;

  // Normalize all 10-value cards to '10' for strategy lookup
  if (rank === 'J' || rank === 'Q' || rank === 'K') {
    return '10';
  }

  return rank;
}

/**
 * Check if player can double down
 * Typically only allowed on first two cards
 */
export function canDouble(hand: Hand): boolean {
  return hand.cards.length === 2;
}

/**
 * Check if player can split
 * Only allowed on pairs with exactly 2 cards
 */
export function canSplit(hand: Hand): boolean {
  return isPair(hand);
}

/**
 * Check if hand is a blackjack (natural 21)
 */
export function isBlackjack(hand: Hand): boolean {
  return evaluateHand(hand).isBlackjack;
}

/**
 * Check if hand is busted (over 21)
 */
export function isBusted(hand: Hand): boolean {
  return evaluateHand(hand).isBusted;
}

/**
 * Get the total value of a hand
 */
export function getHandTotal(hand: Hand): number {
  return evaluateHand(hand).total;
}

/**
 * Get the soft total for a soft hand
 * For strategy lookup: A,2 = 13, A,3 = 14, etc.
 * Returns undefined if not a soft hand
 */
export function getSoftTotal(hand: Hand): number | undefined {
  const value = evaluateHand(hand);
  if (!value.isSoft) return undefined;
  return value.total;
}

/**
 * Get the hard total for a hard hand
 * Returns undefined if it's a soft hand
 */
export function getHardTotal(hand: Hand): number | undefined {
  const value = evaluateHand(hand);
  if (value.isSoft) return undefined;
  return value.total;
}

/**
 * Determine hand category for strategy lookup
 * Returns 'pair', 'soft', or 'hard'
 */
export function getHandCategory(hand: Hand): 'pair' | 'soft' | 'hard' {
  // Check pair first (before hitting)
  if (isPair(hand)) {
    return 'pair';
  }

  // Check if soft
  if (isSoftHand(hand)) {
    return 'soft';
  }

  // Otherwise it's hard
  return 'hard';
}

/**
 * Format hand for display with total
 * e.g., "A♠ 10♥ (21)" or "7♣ 8♦ (15)"
 */
export function formatHand(hand: Hand): string {
  const cards = hand.cards.map(c => `${c.rank}${getSuitSymbol(c.suit)}`).join(' ');
  const value = evaluateHand(hand);
  const softIndicator = value.isSoft ? ' soft' : '';
  return `${cards} (${value.total}${softIndicator})`;
}

function getSuitSymbol(suit: string): string {
  const symbols: Record<string, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  };
  return symbols[suit] || '';
}

/**
 * Create a hand from cards
 */
export function createHand(cards: Card[]): Hand {
  return { cards };
}
