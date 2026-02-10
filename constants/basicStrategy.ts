import { StrategyMatrix, StrategyRow, Action } from '@/types';

// Helper to create strategy rows more concisely
const row = (
  v2: Action, v3: Action, v4: Action, v5: Action, v6: Action,
  v7: Action, v8: Action, v9: Action, v10: Action, vA: Action
): StrategyRow => ({
  2: v2, 3: v3, 4: v4, 5: v5, 6: v6,
  7: v7, 8: v8, 9: v9, 10: v10, 11: vA,
});

/**
 * Complete Basic Strategy Matrix
 *
 * Based on mathematically optimal play for:
 * - Multiple decks (4-8)
 * - Dealer stands on soft 17 (S17)
 * - Double after split allowed (DAS)
 *
 * Actions:
 * H  = Hit
 * S  = Stand
 * D  = Double (if allowed, otherwise hit)
 * DS = Double if allowed, otherwise Stand
 * DH = Double if allowed, otherwise Hit
 * P  = Split
 */
export const BASIC_STRATEGY: StrategyMatrix = {
  // ============================================================================
  // HARD TOTALS (no Ace, or Ace counted as 1)
  // ============================================================================
  hardTotals: {
    // 5-8: Always hit
    5:  row('H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'),
    6:  row('H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'),
    7:  row('H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'),
    8:  row('H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'),

    // 9: Double vs 3-6, otherwise hit
    9:  row('H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'),

    // 10: Double vs 2-9, otherwise hit
    10: row('D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'),

    // 11: Double vs 2-10, hit vs Ace
    11: row('D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H'),

    // 12: Stand vs 4-6 (hope dealer busts), otherwise hit
    12: row('H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'),

    // 13-16: Stand vs 2-6, otherwise hit (basic defensive strategy)
    13: row('S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'),
    14: row('S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'),
    15: row('S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'),
    16: row('S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'),

    // 17+: Always stand
    17: row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
    18: row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
    19: row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
    20: row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
  },

  // ============================================================================
  // SOFT TOTALS (Ace counted as 11)
  // ============================================================================
  softTotals: {
    // A,2 (13): Double vs 5-6, otherwise hit
    13: row('H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'),

    // A,3 (14): Double vs 5-6, otherwise hit
    14: row('H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'),

    // A,4 (15): Double vs 4-6, otherwise hit
    15: row('H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'),

    // A,5 (16): Double vs 4-6, otherwise hit
    16: row('H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'),

    // A,6 (17): Double vs 3-6, otherwise hit
    17: row('H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'),

    // A,7 (18): Double vs 2-6, Stand vs 7-8, Hit vs 9-A
    // This is a key hand - soft 18 is not as strong as it seems
    18: row('DS', 'DS', 'DS', 'DS', 'DS', 'S', 'S', 'H', 'H', 'H'),

    // A,8 (19): Always stand (very strong hand)
    19: row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),

    // A,9 (20): Always stand (nearly unbeatable)
    // Note: A,10 would be blackjack, not a decision point
    20: row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
  },

  // ============================================================================
  // PAIRS (with double after split allowed)
  // ============================================================================
  pairs: {
    // 2,2: Split vs 2-7, otherwise hit
    '2': row('P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'),

    // 3,3: Split vs 2-7, otherwise hit
    '3': row('P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'),

    // 4,4: Split vs 5-6, otherwise hit (not a great split)
    '4': row('H', 'H', 'H', 'P', 'P', 'H', 'H', 'H', 'H', 'H'),

    // 5,5: NEVER split! Treat as hard 10 and double vs 2-9
    '5': row('D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'),

    // 6,6: Split vs 2-6, otherwise hit
    '6': row('P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H', 'H'),

    // 7,7: Split vs 2-7, otherwise hit
    '7': row('P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'),

    // 8,8: ALWAYS split! (one of the most important rules)
    '8': row('P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'),

    // 9,9: Split vs 2-9 except 7, Stand vs 7/10/A
    // Don't split vs 7 (18 is good), don't split vs 10/A (dealer too strong)
    '9': row('P', 'P', 'P', 'P', 'P', 'S', 'P', 'P', 'S', 'S'),

    // 10,10 (and all 10-value pairs): NEVER split! 20 is too strong
    '10': row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
    'J':  row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
    'Q':  row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),
    'K':  row('S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'),

    // A,A: ALWAYS split! (one of the most important rules)
    'A': row('P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'),
  },
};

/**
 * Action descriptions for UI display
 */
export const ACTION_LABELS: Record<Action, string> = {
  'H': 'Hit',
  'S': 'Stand',
  'D': 'Double',
  'DS': 'Double or Stand',
  'DH': 'Double or Hit',
  'P': 'Split',
};

/**
 * Action explanations for learning
 */
export const ACTION_EXPLANATIONS: Record<Action, string> = {
  'H': 'Take another card',
  'S': 'Keep your current hand',
  'D': 'Double your bet and take exactly one more card',
  'DS': 'Double if allowed, otherwise Stand',
  'DH': 'Double if allowed, otherwise Hit',
  'P': 'Split your pair into two separate hands',
};
