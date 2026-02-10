import { Action, ActionRecommendation, Card, Hand, GameRules } from '@/types';
import { BASIC_STRATEGY, ACTION_LABELS, ACTION_EXPLANATIONS } from '@/constants/basicStrategy';
import { getDealerCardValue } from './cardUtils';
import {
  getHandCategory,
  getPairRank,
  getSoftTotal,
  getHandTotal,
  canDouble,
  canSplit,
} from './handUtils';

/**
 * Get the recommended action for a given hand and dealer up card
 * This is the core strategy lookup function
 */
export function getRecommendedAction(
  playerHand: Hand,
  dealerUpCard: Card,
  _rules?: GameRules
): Action {
  const dealerValue = getDealerCardValue(dealerUpCard);
  const category = getHandCategory(playerHand);

  let action: Action;

  if (category === 'pair' && canSplit(playerHand)) {
    // Look up pair strategy
    const pairRank = getPairRank(playerHand);
    if (!pairRank) {
      throw new Error('Expected pair rank but got undefined');
    }
    // Cast pairRank to Rank for type safety
    action = BASIC_STRATEGY.pairs[pairRank as keyof typeof BASIC_STRATEGY.pairs][dealerValue];
  } else if (category === 'soft') {
    // Look up soft total strategy
    const softTotal = getSoftTotal(playerHand);
    if (!softTotal) {
      throw new Error('Expected soft total but got undefined');
    }

    // Soft totals in our matrix are 13-20 (A,2 through A,9)
    // Clamp to valid range
    const clampedTotal = Math.max(13, Math.min(20, softTotal));
    action = BASIC_STRATEGY.softTotals[clampedTotal]?.[dealerValue] || 'S';
  } else {
    // Look up hard total strategy
    const hardTotal = getHandTotal(playerHand);

    // Hard totals in our matrix are 5-20
    // Anything below 5 is impossible, anything above 20 is 21+ (stand)
    if (hardTotal < 5) {
      action = 'H'; // Should never happen
    } else if (hardTotal > 20) {
      action = 'S'; // 21 or busted
    } else {
      action = BASIC_STRATEGY.hardTotals[hardTotal][dealerValue];
    }
  }

  // Resolve conditional actions based on game state
  return resolveConditionalAction(action, playerHand);
}

/**
 * Resolve conditional actions (DS, DH) based on game state
 */
function resolveConditionalAction(
  action: Action,
  playerHand: Hand
): Action {
  // If action is double but player can't double, resolve it
  if (action === 'D' || action === 'DS' || action === 'DH') {
    if (!canDouble(playerHand)) {
      // Can't double, resolve the conditional
      if (action === 'DS') return 'S';
      if (action === 'DH') return 'H';
      return 'H'; // Default for 'D' when can't double
    }
  }

  return action;
}

/**
 * Check if a user's action matches the recommended strategy
 */
export function isActionCorrect(
  playerHand: Hand,
  dealerUpCard: Card,
  userAction: Action,
  rules?: GameRules
): boolean {
  const recommended = getRecommendedAction(playerHand, dealerUpCard, rules);

  // Direct match
  if (userAction === recommended) {
    return true;
  }

  // Handle conditional actions
  // If recommended is DS (Double or Stand)
  if (recommended === 'DS' && (userAction === 'D' || userAction === 'S')) {
    return true;
  }

  // If recommended is DH (Double or Hit)
  if (recommended === 'DH' && (userAction === 'D' || userAction === 'H')) {
    return true;
  }

  // If can't double but action is D, check if fallback is correct
  if (userAction === 'D' && !canDouble(playerHand)) {
    return false; // Can't double, so D is incorrect
  }

  return false;
}

/**
 * Get action recommendation with explanation
 */
export function getActionRecommendation(
  playerHand: Hand,
  dealerUpCard: Card,
  rules?: GameRules
): ActionRecommendation {
  const action = getRecommendedAction(playerHand, dealerUpCard, rules);
  const explanation = generateExplanation(playerHand, dealerUpCard, action);

  return {
    action,
    explanation,
    isOptimal: true,
  };
}

/**
 * Generate a human-readable explanation for why an action is recommended
 */
function generateExplanation(
  playerHand: Hand,
  dealerUpCard: Card,
  action: Action
): string {
  const dealerValue = getDealerCardValue(dealerUpCard);
  const category = getHandCategory(playerHand);
  const total = getHandTotal(playerHand);

  // Build explanation based on hand type and action
  if (category === 'pair') {
    const pairRank = getPairRank(playerHand);
    if (action === 'P') {
      if (pairRank === 'A' || pairRank === '8') {
        return `Always split ${pairRank},${pairRank}. This is a fundamental rule.`;
      }
      return `Split ${pairRank},${pairRank} vs dealer ${dealerValue}.`;
    } else if (action === 'S') {
      return `Stand on ${pairRank},${pairRank} vs dealer ${dealerValue}. ${total} is strong enough.`;
    } else if (action === 'D') {
      return `Double ${pairRank},${pairRank} (treat as ${total}) vs dealer ${dealerValue}.`;
    } else {
      return `Hit ${pairRank},${pairRank} (treat as ${total}) vs dealer ${dealerValue}.`;
    }
  }

  if (category === 'soft') {
    const softTotal = getSoftTotal(playerHand);
    if (action === 'D' || action === 'DS' || action === 'DH') {
      return `Double soft ${softTotal} vs dealer ${dealerValue}. Good opportunity.`;
    } else if (action === 'S') {
      return `Stand on soft ${softTotal}. Strong enough vs dealer ${dealerValue}.`;
    } else {
      return `Hit soft ${softTotal}. Can't bust and need to improve vs dealer ${dealerValue}.`;
    }
  }

  // Hard totals
  if (action === 'D') {
    return `Double on ${total} vs dealer ${dealerValue}. You have the edge.`;
  } else if (action === 'S') {
    if (total >= 17) {
      return `Always stand on ${total}. Too risky to hit.`;
    } else if (dealerValue >= 2 && dealerValue <= 6) {
      return `Stand on ${total} vs dealer ${dealerValue}. Hope dealer busts.`;
    } else {
      return `Stand on ${total} vs dealer ${dealerValue}.`;
    }
  } else if (action === 'H') {
    if (total <= 11) {
      return `Hit ${total}. Can't bust and need to improve.`;
    } else {
      return `Hit ${total} vs dealer ${dealerValue}. Need to improve.`;
    }
  }

  return ACTION_EXPLANATIONS[action];
}

/**
 * Get all possible actions for a hand (for UI)
 */
export function getAvailableActions(playerHand: Hand): Action[] {
  const actions: Action[] = ['H', 'S'];

  if (canDouble(playerHand)) {
    actions.push('D');
  }

  if (canSplit(playerHand)) {
    actions.push('P');
  }

  return actions;
}

/**
 * Get the action label for display
 */
export function getActionLabel(action: Action): string {
  return ACTION_LABELS[action];
}

/**
 * Get the action explanation for display
 */
export function getActionExplanation(action: Action): string {
  return ACTION_EXPLANATIONS[action];
}
