import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Action, DealerCard } from '@/types';
import { COLORS, THEME } from '@/constants/theme';
import { getActionLabel } from '@/utils/strategyUtils';
import { getActionColor, formatDealerCard } from '@/utils/chartUtils';
import { createHand } from '@/utils/handUtils';
import { generateCoachingHint } from '@/utils/coachingUtils';

interface StrategyExplainerProps {
  playerHandLabel: string;
  dealerCard: DealerCard;
  action: Action;
  style?: ViewStyle;
}

export function StrategyExplainer({
  playerHandLabel,
  dealerCard,
  action,
  style,
}: StrategyExplainerProps) {
  // Parse the player hand label to create a mock hand for coaching
  const playerHand = parseHandLabel(playerHandLabel, action);
  const dealerCardObj = { rank: dealerCard === 11 ? 'A' : String(dealerCard), suit: 'spades' } as any;

  const hint = generateCoachingHint(playerHand, dealerCardObj, action);
  const actionColor = getActionColor(action);
  const actionLabel = getActionLabel(action);

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['rgba(255, 215, 0, 0.12)', 'rgba(255, 215, 0, 0.06)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerIcon}>📚</Text>
            <Text style={styles.headerText}>Strategy Guide</Text>
          </View>

          {/* Situation Display */}
          <View style={styles.situationContainer}>
            <View style={styles.situationRow}>
              <Text style={styles.situationLabel}>Your Hand:</Text>
              <Text style={styles.situationValue}>{playerHandLabel}</Text>
            </View>
            <View style={styles.situationRow}>
              <Text style={styles.situationLabel}>Dealer Shows:</Text>
              <Text style={styles.situationValue}>{formatDealerCard(dealerCard)}</Text>
            </View>
            <View style={styles.situationRow}>
              <Text style={styles.situationLabel}>Correct Play:</Text>
              <View style={[styles.actionBadge, { backgroundColor: actionColor }]}>
                <Text style={styles.actionBadgeText}>{actionLabel}</Text>
              </View>
            </View>
          </View>

          {/* Coaching Sections */}
          <View style={styles.content}>
            {/* Primary Insight */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💡 Key Strategy:</Text>
              <Text style={styles.sectionText}>{hint.primaryInsight}</Text>
            </View>

            {/* Dealer Analysis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Dealer Situation:</Text>
              <Text style={styles.sectionText}>{hint.dealerAnalysis}</Text>
            </View>

            {/* Player Analysis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🃏 Your Hand:</Text>
              <Text style={styles.sectionText}>{hint.playerAnalysis}</Text>
            </View>

            {/* Strategic Concept */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🧠 Why This Works:</Text>
              <Text style={styles.sectionText}>{hint.strategicConcept}</Text>
            </View>

            {/* Common Mistake */}
            {hint.commonMistake && (
              <View style={[styles.section, styles.mistakeSection]}>
                <Text style={styles.mistakeTitle}>⚠️ Common Mistake:</Text>
                <Text style={styles.mistakeText}>{hint.commonMistake}</Text>
              </View>
            )}
          </View>

          {/* Subtle shine effect */}
          <View style={styles.shine} />
        </View>
      </LinearGradient>
    </View>
  );
}

// Helper function to parse hand label and create a mock Hand object
function parseHandLabel(label: string, _action: Action): any {
  // For pairs like "A,A" or "8,8"
  if (label.includes(',')) {
    const [rank1, rank2] = label.split(',');
    return createHand([
      { rank: rank1, suit: 'spades' },
      { rank: rank2, suit: 'hearts' },
    ] as any);
  }

  // For soft totals like "A,9", "A,8", etc. - already covered above

  // For hard totals (just numbers)
  const total = parseInt(label);
  if (!isNaN(total)) {
    // Create a simple hand that reaches this total
    if (total <= 11) {
      // Low totals - use simple cards
      const cards = [];
      let remaining = total;
      while (remaining > 0) {
        const card = Math.min(remaining, 10);
        cards.push({ rank: String(card), suit: 'spades' });
        remaining -= card;
      }
      return createHand(cards as any);
    } else {
      // Higher totals - use a 10 and remaining
      const secondCard = total - 10;
      return createHand([
        { rank: '10', suit: 'spades' },
        { rank: String(secondCard), suit: 'hearts' },
      ] as any);
    }
  }

  // Fallback
  return createHand([{ rank: '10', suit: 'spades' }, { rank: '7', suit: 'hearts' }] as any);
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gradient: {
    borderRadius: THEME.borderRadius.lg,
    padding: 1.5,
    ...THEME.shadows.md,
  },
  innerContainer: {
    backgroundColor: 'rgba(13, 40, 24, 0.95)',
    borderRadius: THEME.borderRadius.lg - 1,
    borderWidth: 1.5,
    borderColor: COLORS.gold.glow,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    paddingBottom: THEME.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold.glow,
  },
  headerIcon: {
    fontSize: THEME.typography.fontSize.lg,
    marginRight: THEME.spacing.xs,
  },
  headerText: {
    fontSize: THEME.typography.fontSize.base,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  situationContainer: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold.glow,
    gap: THEME.spacing.xs,
  },
  situationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  situationLabel: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.mediumGray,
    fontWeight: THEME.typography.fontWeight.semibold,
  },
  situationValue: {
    fontSize: THEME.typography.fontSize.base,
    color: COLORS.ui.white,
    fontWeight: THEME.typography.fontWeight.bold,
  },
  actionBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs / 2,
    borderRadius: THEME.borderRadius.md,
    ...THEME.shadows.sm,
  },
  actionBadgeText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feltGreen.dark,
  },
  content: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    gap: THEME.spacing.md,
  },
  section: {},
  sectionTitle: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
    marginBottom: THEME.spacing.xs / 2,
  },
  sectionText: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.lightGray,
    lineHeight: THEME.typography.fontSize.sm * 1.5,
  },
  mistakeSection: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    padding: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
  },
  mistakeTitle: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feedback.warning,
    marginBottom: THEME.spacing.xs / 2,
  },
  mistakeText: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.lightGray,
    lineHeight: THEME.typography.fontSize.sm * 1.5,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderTopLeftRadius: THEME.borderRadius.lg,
    borderTopRightRadius: THEME.borderRadius.lg,
    pointerEvents: 'none',
  },
});
