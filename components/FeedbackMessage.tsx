import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Action } from '@/types';
import { COLORS, THEME } from '@/constants/theme';
import { getActionLabel } from '@/utils/strategyUtils';

interface FeedbackMessageProps {
  isCorrect: boolean;
  userAction: Action;
  correctAction: Action;
  explanation?: string;
  style?: ViewStyle;
}

export function FeedbackMessage({
  isCorrect,
  userAction,
  correctAction,
  explanation,
  style,
}: FeedbackMessageProps) {
  const gradientColors: [string, string] = isCorrect
    ? ['rgba(76, 175, 80, 0.3)', 'rgba(76, 175, 80, 0.2)']
    : ['rgba(244, 67, 54, 0.3)', 'rgba(244, 67, 54, 0.2)'];

  const borderColor = isCorrect ? COLORS.feedback.correct : COLORS.feedback.incorrect;
  const glowColor = isCorrect ? COLORS.feedback.correctGlow : COLORS.feedback.incorrectGlow;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={[styles.innerContainer, { borderColor }]}>
        <Text style={[styles.result, { textShadowColor: glowColor }]}>
          {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
        </Text>

        <Text style={styles.action}>
          You chose: <Text style={styles.bold}>{getActionLabel(userAction)}</Text>
        </Text>

        {!isCorrect && (
          <Text style={styles.action}>
            Correct: <Text style={styles.bold}>{getActionLabel(correctAction)}</Text>
          </Text>
        )}

        {explanation && (
          <Text style={styles.explanation}>{explanation}</Text>
        )}
      </View>

      {/* Subtle shine effect */}
      <View style={styles.shine} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: THEME.borderRadius.lg,
    padding: 2,
    ...THEME.shadows.lg,
    overflow: 'hidden',
  },
  innerContainer: {
    backgroundColor: 'rgba(13, 40, 24, 0.5)',
    borderRadius: THEME.borderRadius.lg - 1,
    padding: THEME.spacing.md,
    borderWidth: 2,
  },
  result: {
    fontSize: THEME.typography.fontSize.xl,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginBottom: THEME.spacing.sm,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  action: {
    fontSize: THEME.typography.fontSize.base,
    color: COLORS.ui.lightGray,
    textAlign: 'center',
    marginBottom: THEME.spacing.xs,
  },
  bold: {
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
  },
  explanation: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.lightGray,
    textAlign: 'center',
    marginTop: THEME.spacing.sm,
    fontStyle: 'italic',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderTopLeftRadius: THEME.borderRadius.lg,
    borderTopRightRadius: THEME.borderRadius.lg,
  },
});
