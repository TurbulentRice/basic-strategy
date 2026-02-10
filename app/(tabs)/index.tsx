import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ChartTabs } from '@/components/ChartTabs';
import { StrategyChart } from '@/components/StrategyChart';
import { ChartLegend } from '@/components/ChartLegend';
import { HandType } from '@/utils/chartUtils';
import { COLORS, THEME } from '@/constants/theme';

export default function LearnScreen() {
  const [selectedTab, setSelectedTab] = useState<HandType>('hard');

  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Basic Strategy Chart</Text>
          <Text style={styles.subtitle}>
            Tap any cell to highlight the row and column
          </Text>
        </View>

        {/* Legend */}
        <ChartLegend style={styles.legend} />

        {/* Tabs */}
        <ChartTabs
          selected={selectedTab}
          onSelect={setSelectedTab}
          style={styles.tabs}
        />

        {/* Chart */}
        <StrategyChart
          handType={selectedTab}
          style={styles.chart}
        />

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.infoText}>
            💡 Tip: Switch between tabs to see different hand types. Practice these
            decisions in the Practice tab!
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: THEME.spacing.lg,
  },
  title: {
    fontSize: THEME.typography.fontSize['2xl'],
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
    marginBottom: THEME.spacing.xs,
  },
  subtitle: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.mediumGray,
    fontStyle: 'italic',
  },
  legend: {
    marginBottom: THEME.spacing.md,
  },
  tabs: {
    marginBottom: THEME.spacing.md,
  },
  chart: {
    marginBottom: THEME.spacing.lg,
  },
  info: {
    backgroundColor: COLORS.feltGreen.light,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold.primary,
  },
  infoText: {
    fontSize: THEME.typography.fontSize.sm,
    color: COLORS.ui.white,
    lineHeight: THEME.typography.fontSize.sm * THEME.typography.lineHeight.relaxed,
  },
});
