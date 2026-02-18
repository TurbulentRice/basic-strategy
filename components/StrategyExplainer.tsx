import React from 'react';
import { StyleSheet, Text, View, ViewStyle, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Action, Card, DealerCard, Hand as HandType, Rank } from '@/types';
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
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 768;

  // Parse the player hand label to create a mock hand for coaching
  const playerHand = parseHandLabel(playerHandLabel, action);
  const dealerCardObj: Card = {
    rank: dealerCard === 11 ? 'A' : toRank(String(dealerCard)),
    suit: 'spades',
  };

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
          <View style={[styles.header, isMobile && styles.headerMobile]}>
            <Text style={[styles.headerIcon, isMobile && styles.headerIconMobile]}>📚</Text>
            <Text style={[styles.headerText, isMobile && styles.headerTextMobile]}>Strategy Guide</Text>
          </View>

          {/* Situation Display */}
          <View style={[styles.situationContainer, isMobile && styles.situationContainerMobile]}>
            <View style={styles.situationRow}>
              <Text style={[styles.situationLabel, isMobile && styles.situationLabelMobile]}>Your Hand:</Text>
              <Text style={[styles.situationValue, isMobile && styles.situationValueMobile]}>{playerHandLabel}</Text>
            </View>
            <View style={styles.situationRow}>
              <Text style={[styles.situationLabel, isMobile && styles.situationLabelMobile]}>Dealer Shows:</Text>
              <Text style={[styles.situationValue, isMobile && styles.situationValueMobile]}>{formatDealerCard(dealerCard)}</Text>
            </View>
            <View style={styles.situationRow}>
              <Text style={[styles.situationLabel, isMobile && styles.situationLabelMobile]}>Correct Play:</Text>
              <View style={[styles.actionBadge, isMobile && styles.actionBadgeMobile, { backgroundColor: actionColor }]}>
                <Text style={[styles.actionBadgeText, isMobile && styles.actionBadgeTextMobile]}>{actionLabel}</Text>
              </View>
            </View>
          </View>

          {/* Coaching Sections */}
          <View style={[styles.content, isMobile && styles.contentMobile]}>
            {/* Primary Insight */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>💡 Key Strategy:</Text>
              <Text style={[styles.sectionText, isMobile && styles.sectionTextMobile]}>{hint.primaryInsight}</Text>
            </View>

            {/* Dealer Analysis */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>🎯 Dealer Situation:</Text>
              <Text style={[styles.sectionText, isMobile && styles.sectionTextMobile]}>{hint.dealerAnalysis}</Text>
            </View>

            {/* Player Analysis */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>🃏 Your Hand:</Text>
              <Text style={[styles.sectionText, isMobile && styles.sectionTextMobile]}>{hint.playerAnalysis}</Text>
            </View>

            {/* Strategic Concept */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>🧠 Why This Works:</Text>
              <Text style={[styles.sectionText, isMobile && styles.sectionTextMobile]}>{hint.strategicConcept}</Text>
            </View>

            {/* Common Mistake */}
            {hint.commonMistake && (
              <View style={[styles.section, styles.mistakeSection, isMobile && styles.mistakeSectionMobile]}>
                <Text style={[styles.mistakeTitle, isMobile && styles.mistakeTitleMobile]}>⚠️ Common Mistake:</Text>
                <Text style={[styles.mistakeText, isMobile && styles.mistakeTextMobile]}>{hint.commonMistake}</Text>
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

const VALID_RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function toRank(value: string): Rank {
  const normalized = value.trim().toUpperCase();
  if (normalized === '1' || normalized === '11') return 'A';
  if (VALID_RANKS.includes(normalized as Rank)) return normalized as Rank;
  return '10';
}

// Helper function to parse hand label and create a mock Hand object
function parseHandLabel(label: string, _action: Action): HandType {
  // For labels like "A,A" or "8,8"
  if (label.includes(',')) {
    const [rank1, rank2] = label.split(',');
    return createHand([
      { rank: toRank(rank1), suit: 'spades' },
      { rank: toRank(rank2), suit: 'hearts' },
    ]);
  }

  // For hard totals (just numbers)
  const total = parseInt(label, 10);
  if (!Number.isNaN(total)) {
    if (total <= 11) {
      const cards: Card[] = [];
      let remaining = total;
      while (remaining > 0) {
        const value = Math.min(remaining, 10);
        cards.push({ rank: toRank(String(value)), suit: 'spades' });
        remaining -= value;
      }
      return createHand(cards);
    }

    const secondCard = Math.max(2, Math.min(total - 10, 10));
    return createHand([
      { rank: '10', suit: 'spades' },
      { rank: toRank(String(secondCard)), suit: 'hearts' },
    ]);
  }

  // Fallback
  return createHand([
    { rank: '10', suit: 'spades' },
    { rank: '7', suit: 'hearts' },
  ]);
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
  headerMobile: {
    paddingHorizontal: THEME.spacing.sm,
    paddingTop: THEME.spacing.sm,
    paddingBottom: THEME.spacing.xs,
  },
  headerIcon: {
    fontSize: THEME.typography.fontSize.lg,
    marginRight: THEME.spacing.xs,
  },
  headerIconMobile: {
    fontSize: THEME.typography.fontSize.base,
  },
  headerText: {
    fontSize: THEME.typography.fontSize.base,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTextMobile: {
    fontSize: THEME.typography.fontSize.sm,
  },
  situationContainer: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold.glow,
    gap: THEME.spacing.xs,
  },
  situationContainerMobile: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.sm,
    gap: THEME.spacing.xs / 2,
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
  situationLabelMobile: {
    fontSize: THEME.typography.fontSize.xs,
  },
  situationValue: {
    fontSize: THEME.typography.fontSize.base,
    color: COLORS.ui.white,
    fontWeight: THEME.typography.fontWeight.bold,
  },
  situationValueMobile: {
    fontSize: THEME.typography.fontSize.sm,
  },
  actionBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs / 2,
    borderRadius: THEME.borderRadius.md,
    ...THEME.shadows.sm,
  },
  actionBadgeMobile: {
    paddingHorizontal: THEME.spacing.xs,
    paddingVertical: 2,
  },
  actionBadgeText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feltGreen.dark,
  },
  actionBadgeTextMobile: {
    fontSize: THEME.typography.fontSize.xs,
  },
  content: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    gap: THEME.spacing.md,
  },
  contentMobile: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.sm,
    gap: THEME.spacing.sm,
  },
  section: {},
  sectionTitle: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
    marginBottom: THEME.spacing.xs / 2,
  },
  sectionTitleMobile: {
    fontSize: THEME.typography.fontSize.xs,
    marginBottom: 2,
  },
  sectionText: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.lightGray,
    lineHeight: THEME.typography.fontSize.sm * 1.5,
  },
  sectionTextMobile: {
    fontSize: THEME.typography.fontSize.xs,
    lineHeight: THEME.typography.fontSize.xs * 1.5,
  },
  mistakeSection: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    padding: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
  },
  mistakeSectionMobile: {
    padding: THEME.spacing.xs,
  },
  mistakeTitle: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feedback.warning,
    marginBottom: THEME.spacing.xs / 2,
  },
  mistakeTitleMobile: {
    fontSize: THEME.typography.fontSize.xs,
    marginBottom: 2,
  },
  mistakeText: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.lightGray,
    lineHeight: THEME.typography.fontSize.sm * 1.5,
  },
  mistakeTextMobile: {
    fontSize: THEME.typography.fontSize.xs,
    lineHeight: THEME.typography.fontSize.xs * 1.5,
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
