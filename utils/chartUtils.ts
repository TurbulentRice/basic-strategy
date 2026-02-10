import { Action, DealerCard } from '@/types';
import { BASIC_STRATEGY } from '@/constants/basicStrategy';
import { COLORS } from '@/constants/colors';

/**
 * Chart utilities for displaying the basic strategy matrix
 */

export type HandType = 'hard' | 'soft' | 'pair';

export interface ChartRow {
  label: string;
  cells: Action[];
}

export interface ChartData {
  dealerCards: DealerCard[];
  rows: ChartRow[];
}

/**
 * Get color for an action cell
 */
export function getActionColor(action: Action): string {
  const colors: Record<Action, string> = {
    'H': COLORS.actions.hit,
    'S': COLORS.actions.stand,
    'D': COLORS.actions.double,
    'DS': COLORS.actions.doubleSplit,
    'DH': COLORS.actions.doubleHit,
    'P': COLORS.actions.split,
  };
  return colors[action];
}

/**
 * Get text color for an action cell (for contrast)
 */
export function getActionTextColor(_action: Action): string {
  // All our action colors are light, so use dark text
  return COLORS.feltGreen.dark;
}

/**
 * Convert hard totals to chart data
 */
export function getHardTotalsChart(): ChartData {
  const dealerCards: DealerCard[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const rows: ChartRow[] = [];

  // Hard totals from 5 to 20
  for (let total = 20; total >= 5; total--) {
    const strategyRow = BASIC_STRATEGY.hardTotals[total];
    if (strategyRow) {
      const cells = dealerCards.map(dealer => strategyRow[dealer]);
      rows.push({
        label: total.toString(),
        cells,
      });
    }
  }

  return { dealerCards, rows };
}

/**
 * Convert soft totals to chart data
 */
export function getSoftTotalsChart(): ChartData {
  const dealerCards: DealerCard[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const rows: ChartRow[] = [];

  // Soft totals from A,9 down to A,2
  const softTotals = [
    { total: 20, label: 'A,9' },
    { total: 19, label: 'A,8' },
    { total: 18, label: 'A,7' },
    { total: 17, label: 'A,6' },
    { total: 16, label: 'A,5' },
    { total: 15, label: 'A,4' },
    { total: 14, label: 'A,3' },
    { total: 13, label: 'A,2' },
  ];

  for (const { total, label } of softTotals) {
    const strategyRow = BASIC_STRATEGY.softTotals[total];
    if (strategyRow) {
      const cells = dealerCards.map(dealer => strategyRow[dealer]);
      rows.push({ label, cells });
    }
  }

  return { dealerCards, rows };
}

/**
 * Convert pairs to chart data
 */
export function getPairsChart(): ChartData {
  const dealerCards: DealerCard[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const rows: ChartRow[] = [];

  // Pairs from A,A down to 2,2
  const pairRanks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

  for (const rank of pairRanks) {
    const strategyRow = BASIC_STRATEGY.pairs[rank as keyof typeof BASIC_STRATEGY.pairs];
    if (strategyRow) {
      const cells = dealerCards.map(dealer => strategyRow[dealer]);
      rows.push({
        label: `${rank},${rank}`,
        cells,
      });
    }
  }

  return { dealerCards, rows };
}

/**
 * Get chart data for a specific hand type
 */
export function getChartData(handType: HandType): ChartData {
  switch (handType) {
    case 'hard':
      return getHardTotalsChart();
    case 'soft':
      return getSoftTotalsChart();
    case 'pair':
      return getPairsChart();
  }
}

/**
 * Format dealer card for display (A instead of 11)
 */
export function formatDealerCard(card: DealerCard): string {
  return card === 11 ? 'A' : card.toString();
}
