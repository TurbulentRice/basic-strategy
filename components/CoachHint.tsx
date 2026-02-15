import React from 'react';
import { StyleSheet, Text, View, ViewStyle, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CoachingHint } from '@/utils/coachingUtils';
import { Card, Hand } from '@/types';
import { COLORS, THEME } from '@/constants/theme';
import { getHandTotal } from '@/utils/handUtils';

interface CoachHintProps {
  hint: CoachingHint;
  playerHand: Hand;
  dealerCard: Card;
  style?: ViewStyle;
}

function MiniCard({ card }: { card: Card }) {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  };

  return (
    <View style={styles.miniCard}>
      <Text style={[styles.miniCardRank, { color: isRed ? COLORS.card.red : COLORS.card.black }]}>
        {card.rank}
      </Text>
      <Text style={[styles.miniCardSuit, { color: isRed ? COLORS.card.red : COLORS.card.black }]}>
        {suitSymbols[card.suit]}
      </Text>
    </View>
  );
}

export function CoachHint({ hint, playerHand, dealerCard, style }: CoachHintProps) {
  const playerTotal = getHandTotal(playerHand);

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
            <Text style={styles.headerIcon}>💡</Text>
            <Text style={styles.headerText}>Coach Mode</Text>
          </View>

          {/* Mini Hand Visualization */}
          <View style={styles.miniHandsContainer}>
            {/* Dealer */}
            <View style={styles.miniHandSection}>
              <Text style={styles.miniHandLabel}>Dealer</Text>
              <View style={styles.miniCardsRow}>
                <MiniCard card={dealerCard} />
              </View>
            </View>

            {/* VS Separator */}
            <Text style={styles.vsSeparator}>vs</Text>

            {/* Player */}
            <View style={styles.miniHandSection}>
              <Text style={styles.miniHandLabel}>You ({playerTotal})</Text>
              <View style={styles.miniCardsRow}>
                {playerHand.cards.map((card, index) => (
                  <MiniCard key={`${card.rank}-${card.suit}-${index}`} card={card} />
                ))}
              </View>
            </View>
          </View>

          {/* Content - Scrollable */}
          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Primary Insight */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Strategy:</Text>
              <Text style={styles.sectionText}>{hint.primaryInsight}</Text>
            </View>

            {/* Dealer Analysis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dealer Situation:</Text>
              <Text style={styles.sectionText}>{hint.dealerAnalysis}</Text>
            </View>

            {/* Player Analysis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Hand:</Text>
              <Text style={styles.sectionText}>{hint.playerAnalysis}</Text>
            </View>

            {/* Strategic Concept */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why This Works:</Text>
              <Text style={styles.sectionText}>{hint.strategicConcept}</Text>
            </View>

            {/* Common Mistake (if present) */}
            {hint.commonMistake && (
              <View style={[styles.section, styles.mistakeSection]}>
                <Text style={styles.mistakeTitle}>⚠️ Common Mistake:</Text>
                <Text style={styles.mistakeText}>{hint.commonMistake}</Text>
              </View>
            )}
          </ScrollView>

          {/* Subtle shine effect */}
          <View style={styles.shine} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 350,
    maxHeight: '90%',
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
    paddingHorizontal: THEME.spacing.sm,
    paddingTop: THEME.spacing.sm,
    paddingBottom: THEME.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold.glow,
  },
  headerIcon: {
    fontSize: THEME.typography.fontSize.base,
    marginRight: THEME.spacing.xs,
  },
  headerText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  miniHandsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold.glow,
  },
  miniHandSection: {
    alignItems: 'center',
  },
  miniHandLabel: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.ui.lightGray,
    marginBottom: 2,
    fontWeight: THEME.typography.fontWeight.semibold,
  },
  miniCardsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  miniCard: {
    width: 24,
    height: 34,
    backgroundColor: COLORS.card.background,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: COLORS.card.border,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  miniCardRank: {
    fontSize: 10,
    fontWeight: THEME.typography.fontWeight.bold,
    lineHeight: 12,
  },
  miniCardSuit: {
    fontSize: 8,
    lineHeight: 10,
  },
  vsSeparator: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.gold.primary,
    fontWeight: THEME.typography.fontWeight.bold,
    marginHorizontal: THEME.spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs,
  },
  section: {
    marginBottom: THEME.spacing.sm,
  },
  sectionTitle: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  sectionText: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.ui.lightGray,
    lineHeight: THEME.typography.fontSize.xs * 1.5,
  },
  mistakeSection: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: THEME.spacing.xs,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
  },
  mistakeTitle: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feedback.warning,
    marginBottom: 2,
  },
  mistakeText: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.ui.lightGray,
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
