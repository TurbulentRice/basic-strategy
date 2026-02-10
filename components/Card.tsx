import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Card as CardType, Suit } from '@/types';
import { COLORS, THEME } from '@/constants/theme';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  size?: 'small' | 'standard' | 'large';
  style?: ViewStyle;
}

const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const SUIT_COLORS: Record<Suit, string> = {
  hearts: COLORS.card.red,
  diamonds: COLORS.card.red,
  clubs: COLORS.card.black,
  spades: COLORS.card.black,
};

export function Card({ card, faceDown = false, size = 'standard', style }: CardProps) {
  const cardWidth = THEME.card.width[size];
  const cardHeight = cardWidth / THEME.card.aspectRatio;
  const fontSize = size === 'small' ? 16 : size === 'large' ? 28 : 20;
  const smallFontSize = size === 'small' ? 10 : size === 'large' ? 16 : 12;

  if (faceDown) {
    return (
      <View style={[styles.card, { width: cardWidth, height: cardHeight }, styles.faceDown, style]}>
        <View style={styles.backPattern} />
      </View>
    );
  }

  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const suitColor = SUIT_COLORS[card.suit];

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }, style]}>
      {/* Top-left rank and suit */}
      <View style={styles.corner}>
        <Text style={[styles.rank, { fontSize, color: suitColor }]}>
          {card.rank}
        </Text>
        <Text style={[styles.suit, { fontSize: smallFontSize, color: suitColor }]}>
          {suitSymbol}
        </Text>
      </View>

      {/* Center suit symbol */}
      <Text style={[styles.centerSuit, { fontSize: fontSize * 1.8, color: suitColor }]}>
        {suitSymbol}
      </Text>

      {/* Bottom-right rank and suit (rotated) */}
      <View style={[styles.corner, styles.cornerBottomRight]}>
        <Text style={[styles.rank, { fontSize, color: suitColor }]}>
          {card.rank}
        </Text>
        <Text style={[styles.suit, { fontSize: smallFontSize, color: suitColor }]}>
          {suitSymbol}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card.background,
    borderRadius: THEME.card.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.card.border,
    ...THEME.shadows.md,
    justifyContent: 'space-between',
    padding: 6,
  },
  faceDown: {
    backgroundColor: COLORS.feltGreen.light,
    borderColor: COLORS.feltGreen.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backPattern: {
    width: '80%',
    height: '80%',
    backgroundColor: COLORS.feltGreen.dark,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.gold.primary,
  },
  corner: {
    alignItems: 'center',
    minWidth: 20,
  },
  cornerBottomRight: {
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-end',
  },
  rank: {
    fontWeight: '700',
    lineHeight: 20,
  },
  suit: {
    lineHeight: 14,
  },
  centerSuit: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    transform: [{ translateY: -20 }],
  },
});
