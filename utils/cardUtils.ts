import { Card, Rank, Suit } from '@/types';

// All ranks and suits
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

/**
 * Create a standard 52-card deck
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

/**
 * Shuffle a deck using Fisher-Yates algorithm
 * Returns a new array (does not mutate original)
 */
export function shuffleDeck(cards: Card[]): Card[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deal a card from the deck
 * Returns the card and the remaining deck
 */
export function dealCard(deck: Card[]): [Card, Card[]] {
  if (deck.length === 0) {
    throw new Error('Cannot deal from empty deck');
  }
  const [card, ...remaining] = deck;
  return [card, remaining];
}

/**
 * Deal multiple cards from the deck
 * Returns the cards and the remaining deck
 */
export function dealCards(deck: Card[], count: number): [Card[], Card[]] {
  if (deck.length < count) {
    throw new Error(`Cannot deal ${count} cards from deck with ${deck.length} cards`);
  }
  const dealt = deck.slice(0, count);
  const remaining = deck.slice(count);
  return [dealt, remaining];
}

/**
 * Get the numeric value of a card (for calculation purposes)
 * Ace = 11 (soft value), face cards = 10
 * Note: Ace can also be 1, but that's handled in hand evaluation
 */
export function getCardValue(card: Card): number {
  const { rank } = card;
  if (rank === 'A') return 11;
  if (rank === 'J' || rank === 'Q' || rank === 'K') return 10;
  return parseInt(rank, 10);
}

/**
 * Get the dealer card value (2-11, where Ace = 11)
 * Used for strategy matrix lookups
 */
export function getDealerCardValue(card: Card): 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 {
  const value = getCardValue(card);
  // Clamp to valid range and cast to literal type
  return Math.max(2, Math.min(11, value)) as 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}

/**
 * Check if two cards have the same rank (for pair detection)
 */
export function isSameRank(card1: Card, card2: Card): boolean {
  // Special case: all 10-value cards are considered the same for pair purposes
  const value1 = getCardValue(card1);
  const value2 = getCardValue(card2);
  return value1 === value2;
}

/**
 * Get a random card (useful for testing)
 */
export function getRandomCard(): Card {
  const rank = RANKS[Math.floor(Math.random() * RANKS.length)];
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
  return { rank, suit };
}

/**
 * Create multiple decks (for shoe games)
 */
export function createShoe(numberOfDecks: number): Card[] {
  const shoe: Card[] = [];
  for (let i = 0; i < numberOfDecks; i++) {
    shoe.push(...createDeck());
  }
  return shoe;
}

/**
 * Format a card for display (e.g., "A♠", "10♥")
 */
export function formatCard(card: Card): string {
  const suitSymbols: Record<Suit, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  };
  return `${card.rank}${suitSymbols[card.suit]}`;
}

/**
 * Format multiple cards (e.g., "A♠ 10♥")
 */
export function formatCards(cards: Card[]): string {
  return cards.map(formatCard).join(' ');
}
