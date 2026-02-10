import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Action } from '@/types';
import { COLORS, THEME } from '@/constants/theme';
import { getActionColor, getActionTextColor } from '@/utils/chartUtils';
import { ACTION_LABELS } from '@/constants/basicStrategy';

interface ChartLegendProps {
  style?: ViewStyle;
}

export function ChartLegend({ style }: ChartLegendProps) {
  const actions: Action[] = ['H', 'S', 'D', 'DS', 'DH', 'P'];

  return (
    <LinearGradient
      colors={[COLORS.glass.greenStrong, COLORS.glass.green]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Legend</Text>
        {actions.map(action => (
          <View key={action} style={styles.item}>
            <View
              style={[
                styles.swatch,
                { backgroundColor: getActionColor(action) },
              ]}
            >
              <Text
                style={[
                  styles.swatchText,
                  { color: getActionTextColor(action) },
                ]}
              >
                {action}
              </Text>
            </View>
            <Text style={styles.label}>{ACTION_LABELS[action]}</Text>
          </View>
        ))}
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
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 40, 24, 0.4)',
    borderRadius: THEME.borderRadius.lg - 1,
    padding: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
    gap: THEME.spacing.xs,
  },
  title: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.light,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textShadowColor: COLORS.gold.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    marginRight: THEME.spacing.xs / 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.xs / 2,
  },
  swatch: {
    width: 22,
    height: 22,
    borderRadius: THEME.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
    ...THEME.shadows.sm,
  },
  swatchText: {
    fontSize: THEME.typography.fontSize.xs,
    fontWeight: THEME.typography.fontWeight.bold,
  },
  label: {
    fontSize: 11,
    color: COLORS.ui.lightGray,
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
