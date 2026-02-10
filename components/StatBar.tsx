import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { PracticeStats } from '@/types';
import { COLORS, THEME } from '@/constants/theme';

interface StatBarProps {
  stats: PracticeStats;
  showStreak?: boolean;
  style?: ViewStyle;
}

export function StatBar({ stats, showStreak = true, style }: StatBarProps) {
  const getStreakEmoji = (streak: number): string => {
    if (streak >= 10) return '🔥🔥';
    if (streak >= 5) return '🔥';
    return '';
  };

  return (
    <View style={[styles.container, style]}>
      {/* Accuracy */}
      <View style={styles.stat}>
        <Text style={styles.statValue}>{stats.accuracy}%</Text>
        <Text style={styles.statLabel}>Accuracy</Text>
      </View>

      {/* Total Hands */}
      <View style={styles.stat}>
        <Text style={styles.statValue}>
          {stats.correctDecisions}/{stats.totalHands}
        </Text>
        <Text style={styles.statLabel}>Correct</Text>
      </View>

      {/* Streak */}
      {showStreak && (
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {getStreakEmoji(stats.currentStreak)} {stats.currentStreak}
          </Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.feltGreen.light,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    ...THEME.shadows.sm,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: THEME.typography.fontSize.xl,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
    marginBottom: THEME.spacing.xs / 2,
  },
  statLabel: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.medium,
    color: COLORS.ui.mediumGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
