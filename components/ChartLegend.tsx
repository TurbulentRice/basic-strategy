import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
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
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Legend</Text>
      <View style={styles.items}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.feltGreen.light,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    ...THEME.shadows.sm,
  },
  title: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
    marginBottom: THEME.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.xs,
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: THEME.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.feltGreen.dark,
  },
  swatchText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
  },
  label: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.ui.white,
  },
});
