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
  cellSize?: number;
  fontSize?: number;
}

export function ChartCell({
  action,
  isHighlighted = false,
  onPress,
  style,
  cellSize = 30,
  fontSize = 12,
}: ChartCellProps) {
  const backgroundColor = getActionColor(action);
  const textColor = getActionTextColor(action);

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          width: cellSize,
          height: cellSize,
          backgroundColor,
        },
        isHighlighted && styles.highlighted,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor, fontSize }]}>
        {action}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
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
    fontWeight: THEME.typography.fontWeight.bold,
  },
});
