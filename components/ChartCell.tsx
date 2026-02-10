import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Action } from '@/types';
import { COLORS, THEME } from '@/constants/theme';
import { getActionColor, getActionTextColor } from '@/utils/chartUtils';

interface ChartCellProps {
  action: Action;
  isHighlighted?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function ChartCell({
  action,
  isHighlighted = false,
  onPress,
  style,
}: ChartCellProps) {
  const backgroundColor = getActionColor(action);
  const textColor = getActionTextColor(action);

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        { backgroundColor },
        isHighlighted && styles.highlighted,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {action}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.feltGreen.dark,
    borderRadius: THEME.borderRadius.sm,
  },
  highlighted: {
    borderWidth: 2,
    borderColor: COLORS.ui.white,
    ...THEME.shadows.lg,
    shadowColor: COLORS.ui.white,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.05 }],
  },
  text: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
  },
});
