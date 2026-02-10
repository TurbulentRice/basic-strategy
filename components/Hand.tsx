import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Hand as HandType } from '@/types';
import { Card } from './Card';
import { evaluateHand } from '@/utils/handUtils';
import { COLORS, THEME } from '@/constants/theme';

interface HandProps {
  hand: HandType;
  showTotal?: boolean;
  hideFirstCard?: boolean; // For dealer's hidden card
  size?: 'small' | 'standard' | 'large';
  label?: string;
  style?: ViewStyle;
}

export function Hand({
  hand,
  showTotal = true,
  hideFirstCard = false,
  size = 'standard',
  label,
  style,
}: HandProps) {
  const handValue = evaluateHand(hand);
  const cardSpacing = size === 'small' ? 4 : size === 'large' ? 12 : 8;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={styles.cardsContainer}>
        {hand.cards.map((card, index) => (
          <View
            key={`${card.rank}-${card.suit}-${index}`}
            style={[
              styles.cardWrapper,
              index > 0 && { marginLeft: -cardSpacing * 2 },
            ]}
          >
            <Card
              card={card}
              faceDown={index === 0 && hideFirstCard}
              size={size}
            />
          </View>
        ))}
      </View>

      {showTotal && !hideFirstCard && (
        <View style={styles.totalContainer}>
          <Text style={styles.total}>
            {handValue.total}
            {handValue.isSoft && ' (soft)'}
            {handValue.isBlackjack && ' - Blackjack!'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.semibold,
    color: COLORS.ui.white,
    marginBottom: THEME.spacing.xs / 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardWrapper: {
    // Individual card wrapper for spacing
  },
  totalContainer: {
    marginTop: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs / 2,
    backgroundColor: COLORS.feltGreen.light,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.feltGreen.lighter,
  },
  total: {
    fontSize: THEME.typography.fontSize.base,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
    textAlign: 'center',
  },
});
