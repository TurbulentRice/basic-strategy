import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { HandType } from '@/utils/chartUtils';
import { COLORS, THEME } from '@/constants/theme';

interface ChartTabsProps {
  selected: HandType;
  onSelect: (handType: HandType) => void;
  style?: ViewStyle;
}

const TABS: { value: HandType; label: string }[] = [
  { value: 'hard', label: 'Hard Totals' },
  { value: 'soft', label: 'Soft Totals' },
  { value: 'pair', label: 'Pairs' },
];

export function ChartTabs({ selected, onSelect, style }: ChartTabsProps) {
  return (
    <View style={[styles.container, style]}>
      {TABS.map(tab => {
        const isSelected = selected === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              isSelected && styles.tabSelected,
            ]}
            onPress={() => onSelect(tab.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                isSelected && styles.tabTextSelected,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.feltGreen.dark,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.xs / 2,
    ...THEME.shadows.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  tabSelected: {
    backgroundColor: COLORS.gold.primary,
  },
  tabText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.semibold,
    color: COLORS.ui.mediumGray,
  },
  tabTextSelected: {
    color: COLORS.feltGreen.dark,
    fontWeight: THEME.typography.fontWeight.bold,
  },
});
