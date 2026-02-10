import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
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
  return (
    <View
      style={[
        styles.container,
        isCorrect ? styles.correct : styles.incorrect,
        style,
      ]}
    >
      <Text style={styles.result}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 2,
    ...THEME.shadows.md,
  },
  correct: {
    backgroundColor: COLORS.feedback.correctLight,
    borderColor: COLORS.feedback.correct,
  },
  incorrect: {
    backgroundColor: COLORS.feedback.incorrectLight,
    borderColor: COLORS.feedback.incorrect,
  },
  result: {
    fontSize: THEME.typography.fontSize.xl,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginBottom: THEME.spacing.sm,
  },
  action: {
    fontSize: THEME.typography.fontSize.base,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginBottom: THEME.spacing.xs,
  },
  bold: {
    fontWeight: THEME.typography.fontWeight.bold,
  },
  explanation: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginTop: THEME.spacing.sm,
    fontStyle: 'italic',
  },
});
