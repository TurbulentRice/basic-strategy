import React from 'react';
import { StyleSheet, Text, View, ViewStyle, useWindowDimensions } from 'react-native';
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

// Calculate responsive card width based on screen size
function getResponsiveCardWidth(screenWidth: number, baseSize: 'small' | 'standard' | 'large'): number {
  // Base sizes for mobile (320-375px width)
  const baseSizes = {
    small: 60,
    standard: 90,
    large: 110,
  };

  // Breakpoints
  const MOBILE_MAX = 480;
  const TABLET_MIN = 481;
  const TABLET_MAX = 1024;

  if (screenWidth <= MOBILE_MAX) {
    // Mobile: use base sizes
    return baseSizes[baseSize];
  } else if (screenWidth <= TABLET_MAX) {
    // Tablet: scale up 1.4x - 1.8x based on screen width
    const scaleRange = screenWidth <= 768 ? 1.4 : 1.6;
    return Math.floor(baseSizes[baseSize] * scaleRange);
  } else {
    // Large screens: max scale of 2x
    return Math.floor(baseSizes[baseSize] * 2);
  }
}

export function Hand({
  hand,
  showTotal = true,
  hideFirstCard = false,
  size = 'standard',
  label,
  style,
}: HandProps) {
  const { width: screenWidth } = useWindowDimensions();
  const handValue = evaluateHand(hand);

  // Calculate responsive sizes
  const cardWidth = getResponsiveCardWidth(screenWidth, size);
  const cardSpacing = size === 'small' ? 4 : size === 'large' ? 12 : 8;
  const responsiveSpacing = Math.floor(cardSpacing * (cardWidth / THEME.card.width[size]));

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[
          styles.label,
          {
            fontSize: Math.floor(THEME.typography.fontSize.xs * (cardWidth / THEME.card.width[size])),
            marginBottom: Math.floor((THEME.spacing.xs / 2) * (cardWidth / THEME.card.width[size]))
          }
        ]}>{label}</Text>
      )}

      <View style={styles.cardsContainer}>
        {hand.cards.map((card, index) => (
          <View
            key={`${card.rank}-${card.suit}-${index}`}
            style={[
              styles.cardWrapper,
              index > 0 && { marginLeft: -responsiveSpacing * 2 },
            ]}
          >
            <Card
              card={card}
              faceDown={index === 0 && hideFirstCard}
              size={size}
              width={cardWidth}
            />
          </View>
        ))}
      </View>

      {showTotal && !hideFirstCard && (
        <View style={[
          styles.totalContainer,
          {
            marginTop: Math.floor(THEME.spacing.xs * (cardWidth / THEME.card.width[size])),
            paddingHorizontal: Math.floor(THEME.spacing.sm * (cardWidth / THEME.card.width[size])),
            paddingVertical: Math.floor((THEME.spacing.xs / 2) * (cardWidth / THEME.card.width[size]))
          }
        ]}>
          <Text style={[
            styles.total,
            { fontSize: Math.floor(THEME.typography.fontSize.base * (cardWidth / THEME.card.width[size])) }
          ]}>
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
