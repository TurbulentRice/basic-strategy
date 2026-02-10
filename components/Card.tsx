import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Card as CardType, Rank } from '@/types';
import { COLORS, THEME } from '@/constants/theme';

// Import all card SVGs
import AceOfHearts from '@/assets/svg-cards/ace_of_hearts.svg';
import AceOfDiamonds from '@/assets/svg-cards/ace_of_diamonds.svg';
import AceOfClubs from '@/assets/svg-cards/ace_of_clubs.svg';
import AceOfSpades from '@/assets/svg-cards/ace_of_spades.svg';
import TwoOfHearts from '@/assets/svg-cards/2_of_hearts.svg';
import TwoOfDiamonds from '@/assets/svg-cards/2_of_diamonds.svg';
import TwoOfClubs from '@/assets/svg-cards/2_of_clubs.svg';
import TwoOfSpades from '@/assets/svg-cards/2_of_spades.svg';
import ThreeOfHearts from '@/assets/svg-cards/3_of_hearts.svg';
import ThreeOfDiamonds from '@/assets/svg-cards/3_of_diamonds.svg';
import ThreeOfClubs from '@/assets/svg-cards/3_of_clubs.svg';
import ThreeOfSpades from '@/assets/svg-cards/3_of_spades.svg';
import FourOfHearts from '@/assets/svg-cards/4_of_hearts.svg';
import FourOfDiamonds from '@/assets/svg-cards/4_of_diamonds.svg';
import FourOfClubs from '@/assets/svg-cards/4_of_clubs.svg';
import FourOfSpades from '@/assets/svg-cards/4_of_spades.svg';
import FiveOfHearts from '@/assets/svg-cards/5_of_hearts.svg';
import FiveOfDiamonds from '@/assets/svg-cards/5_of_diamonds.svg';
import FiveOfClubs from '@/assets/svg-cards/5_of_clubs.svg';
import FiveOfSpades from '@/assets/svg-cards/5_of_spades.svg';
import SixOfHearts from '@/assets/svg-cards/6_of_hearts.svg';
import SixOfDiamonds from '@/assets/svg-cards/6_of_diamonds.svg';
import SixOfClubs from '@/assets/svg-cards/6_of_clubs.svg';
import SixOfSpades from '@/assets/svg-cards/6_of_spades.svg';
import SevenOfHearts from '@/assets/svg-cards/7_of_hearts.svg';
import SevenOfDiamonds from '@/assets/svg-cards/7_of_diamonds.svg';
import SevenOfClubs from '@/assets/svg-cards/7_of_clubs.svg';
import SevenOfSpades from '@/assets/svg-cards/7_of_spades.svg';
import EightOfHearts from '@/assets/svg-cards/8_of_hearts.svg';
import EightOfDiamonds from '@/assets/svg-cards/8_of_diamonds.svg';
import EightOfClubs from '@/assets/svg-cards/8_of_clubs.svg';
import EightOfSpades from '@/assets/svg-cards/8_of_spades.svg';
import NineOfHearts from '@/assets/svg-cards/9_of_hearts.svg';
import NineOfDiamonds from '@/assets/svg-cards/9_of_diamonds.svg';
import NineOfClubs from '@/assets/svg-cards/9_of_clubs.svg';
import NineOfSpades from '@/assets/svg-cards/9_of_spades.svg';
import TenOfHearts from '@/assets/svg-cards/10_of_hearts.svg';
import TenOfDiamonds from '@/assets/svg-cards/10_of_diamonds.svg';
import TenOfClubs from '@/assets/svg-cards/10_of_clubs.svg';
import TenOfSpades from '@/assets/svg-cards/10_of_spades.svg';
import JackOfHearts from '@/assets/svg-cards/jack_of_hearts.svg';
import JackOfDiamonds from '@/assets/svg-cards/jack_of_diamonds.svg';
import JackOfClubs from '@/assets/svg-cards/jack_of_clubs.svg';
import JackOfSpades from '@/assets/svg-cards/jack_of_spades.svg';
import QueenOfHearts from '@/assets/svg-cards/queen_of_hearts.svg';
import QueenOfDiamonds from '@/assets/svg-cards/queen_of_diamonds.svg';
import QueenOfClubs from '@/assets/svg-cards/queen_of_clubs.svg';
import QueenOfSpades from '@/assets/svg-cards/queen_of_spades.svg';
import KingOfHearts from '@/assets/svg-cards/king_of_hearts.svg';
import KingOfDiamonds from '@/assets/svg-cards/king_of_diamonds.svg';
import KingOfClubs from '@/assets/svg-cards/king_of_clubs.svg';
import KingOfSpades from '@/assets/svg-cards/king_of_spades.svg';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  size?: 'small' | 'standard' | 'large';
  style?: ViewStyle;
}

// Map card rank and suit to SVG component
function getCardComponent(rank: Rank, suit: string) {
  const key = `${rank}_${suit}`;

  const cardMap: Record<string, React.FC<SvgProps>> = {
    'A_hearts': AceOfHearts,
    'A_diamonds': AceOfDiamonds,
    'A_clubs': AceOfClubs,
    'A_spades': AceOfSpades,
    '2_hearts': TwoOfHearts,
    '2_diamonds': TwoOfDiamonds,
    '2_clubs': TwoOfClubs,
    '2_spades': TwoOfSpades,
    '3_hearts': ThreeOfHearts,
    '3_diamonds': ThreeOfDiamonds,
    '3_clubs': ThreeOfClubs,
    '3_spades': ThreeOfSpades,
    '4_hearts': FourOfHearts,
    '4_diamonds': FourOfDiamonds,
    '4_clubs': FourOfClubs,
    '4_spades': FourOfSpades,
    '5_hearts': FiveOfHearts,
    '5_diamonds': FiveOfDiamonds,
    '5_clubs': FiveOfClubs,
    '5_spades': FiveOfSpades,
    '6_hearts': SixOfHearts,
    '6_diamonds': SixOfDiamonds,
    '6_clubs': SixOfClubs,
    '6_spades': SixOfSpades,
    '7_hearts': SevenOfHearts,
    '7_diamonds': SevenOfDiamonds,
    '7_clubs': SevenOfClubs,
    '7_spades': SevenOfSpades,
    '8_hearts': EightOfHearts,
    '8_diamonds': EightOfDiamonds,
    '8_clubs': EightOfClubs,
    '8_spades': EightOfSpades,
    '9_hearts': NineOfHearts,
    '9_diamonds': NineOfDiamonds,
    '9_clubs': NineOfClubs,
    '9_spades': NineOfSpades,
    '10_hearts': TenOfHearts,
    '10_diamonds': TenOfDiamonds,
    '10_clubs': TenOfClubs,
    '10_spades': TenOfSpades,
    'J_hearts': JackOfHearts,
    'J_diamonds': JackOfDiamonds,
    'J_clubs': JackOfClubs,
    'J_spades': JackOfSpades,
    'Q_hearts': QueenOfHearts,
    'Q_diamonds': QueenOfDiamonds,
    'Q_clubs': QueenOfClubs,
    'Q_spades': QueenOfSpades,
    'K_hearts': KingOfHearts,
    'K_diamonds': KingOfDiamonds,
    'K_clubs': KingOfClubs,
    'K_spades': KingOfSpades,
  };

  return cardMap[key];
}

export function Card({ card, faceDown = false, size = 'standard', style }: CardProps) {
  const cardWidth = THEME.card.width[size];
  const cardHeight = cardWidth / THEME.card.aspectRatio;

  if (faceDown) {
    return (
      <View style={[styles.card, { width: cardWidth, height: cardHeight }, styles.faceDown, style]}>
        <View style={styles.backPattern} />
      </View>
    );
  }

  const CardSvg = getCardComponent(card.rank, card.suit);

  return (
    <View style={[styles.cardContainer, { width: cardWidth, height: cardHeight }, style]}>
      {CardSvg && <CardSvg width={cardWidth} height={cardHeight} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    ...THEME.shadows.md,
  },
  card: {
    backgroundColor: COLORS.feltGreen.light,
    borderRadius: THEME.card.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.feltGreen.medium,
    ...THEME.shadows.md,
    overflow: 'hidden',
  },
  faceDown: {
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
});
