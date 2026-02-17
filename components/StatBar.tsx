import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PracticeStats } from '@/types';
import { COLORS, THEME } from '@/constants/theme';

interface StatBarProps {
  stats: PracticeStats;
  showStreak?: boolean;
  coachMode?: boolean;
  onCoachToggle?: () => void;
  style?: ViewStyle;
}

export function StatBar({ stats, showStreak = true, coachMode = false, onCoachToggle, style }: StatBarProps) {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const getStreakEmoji = (streak: number): string => {
    if (streak >= 10) return '🔥🔥';
    if (streak >= 5) return '🔥';
    return '';
  };

  return (
    <LinearGradient
      colors={[COLORS.glass.greenStrong, COLORS.glass.green]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {/* Glass border effect */}
      <View style={[styles.innerContainer, isTablet && styles.innerContainerTablet]}>
        {/* Accuracy */}
        <View style={styles.stat}>
          <Text style={[styles.statValue, isTablet && styles.statValueTablet]}>{stats.accuracy}%</Text>
          <Text style={[styles.statLabel, isTablet && styles.statLabelTablet]}>Accuracy</Text>
        </View>

        {/* Divider */}
        <View style={[styles.divider, isTablet && styles.dividerTablet]} />

        {/* Total Hands */}
        <View style={styles.stat}>
          <Text style={[styles.statValue, isTablet && styles.statValueTablet]}>
            {stats.correctDecisions}/{stats.totalHands}
          </Text>
          <Text style={[styles.statLabel, isTablet && styles.statLabelTablet]}>Correct</Text>
        </View>

        {/* Divider */}
        {showStreak && <View style={[styles.divider, isTablet && styles.dividerTablet]} />}

        {/* Streak */}
        {showStreak && (
          <View style={styles.stat}>
            <Text style={[styles.statValue, isTablet && styles.statValueTablet]}>
              {getStreakEmoji(stats.currentStreak)} {stats.currentStreak}
            </Text>
            <Text style={[styles.statLabel, isTablet && styles.statLabelTablet]}>Streak</Text>
          </View>
        )}

        {/* Divider before Coach toggle */}
        {onCoachToggle && <View style={[styles.divider, isTablet && styles.dividerTablet]} />}

        {/* Coach Mode Toggle */}
        {onCoachToggle && (
          <TouchableOpacity
            style={styles.stat}
            onPress={onCoachToggle}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={[
              styles.statValue,
              isTablet && styles.statValueTablet,
              coachMode ? styles.coachActiveValue : styles.coachInactiveValue
            ]}>
              💡
            </Text>
            <Text style={[styles.statLabel, isTablet && styles.statLabelTablet, coachMode && styles.coachActiveLabel]}>
              Coach
            </Text>
          </TouchableOpacity>
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
    padding: 1.5,
    ...THEME.shadows.md,
    overflow: 'hidden',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 40, 24, 0.4)',
    borderRadius: THEME.borderRadius.lg - 1,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
  },
  innerContainerTablet: {
    padding: THEME.spacing.lg,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: THEME.typography.fontSize.xl,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
    marginBottom: THEME.spacing.xs / 2,
    textShadowColor: COLORS.gold.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  statValueTablet: {
    fontSize: THEME.typography.fontSize['2xl'],
    marginBottom: THEME.spacing.xs,
  },
  statLabel: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.medium,
    color: COLORS.ui.lightGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statLabelTablet: {
    fontSize: THEME.typography.fontSize.sm,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.glass.whiteLight,
    marginHorizontal: THEME.spacing.xs,
  },
  dividerTablet: {
    height: 40,
    marginHorizontal: THEME.spacing.sm,
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
  coachInactiveValue: {
    opacity: 0.4,
  },
  coachActiveValue: {
    textShadowColor: COLORS.gold.glow,
    textShadowRadius: 12,
  },
  coachActiveLabel: {
    color: COLORS.gold.light,
  },
});
