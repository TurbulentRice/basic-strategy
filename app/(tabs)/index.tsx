import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Screen } from '@/components/Screen';
import { ChartTabs } from '@/components/ChartTabs';
import { StrategyChart } from '@/components/StrategyChart';
import { ChartLegend } from '@/components/ChartLegend';
import { StrategyExplainer } from '@/components/StrategyExplainer';
import { HandType } from '@/utils/chartUtils';
import { COLORS, THEME } from '@/constants/theme';
import { Action, DealerCard } from '@/types';

export default function LearnScreen() {
  const [selectedTab, setSelectedTab] = useState<HandType>('hard');
  const [selectedCell, setSelectedCell] = useState<{
    rowLabel: string;
    dealerCard: DealerCard;
    action: Action;
  } | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  // Determine if we should use tablet layout (side-by-side)
  const isTablet = screenWidth >= 768;

  const handleCellSelect = (selection: { rowLabel: string; dealerCard: DealerCard; action: Action } | null) => {
    setSelectedCell(selection);
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Basic Strategy Chart</Text>
          <Text style={styles.subtitle}>
            Tap any cell to see detailed strategy explanation
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

        {/* Chart and Explainer - Responsive Layout */}
        <View style={[styles.mainContent, isTablet && styles.mainContentTablet]}>
          {/* Chart */}
          <View style={[styles.chartContainer, isTablet && styles.chartContainerTablet]}>
            <StrategyChart
              handType={selectedTab}
              style={styles.chart}
              onCellSelect={handleCellSelect}
            />
          </View>

          {/* Strategy Explainer - Tablet: side by side */}
          {selectedCell && isTablet && (
            <View style={styles.explainerContainerTablet}>
              <StrategyExplainer
                playerHandLabel={selectedCell.rowLabel}
                dealerCard={selectedCell.dealerCard}
                action={selectedCell.action}
              />
            </View>
          )}
        </View>

        {/* Strategy Explainer - Mobile: below chart */}
        {selectedCell && !isTablet && (
          <StrategyExplainer
            playerHandLabel={selectedCell.rowLabel}
            dealerCard={selectedCell.dealerCard}
            action={selectedCell.action}
            style={styles.explainerMobile}
          />
        )}

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
  mainContent: {
    marginBottom: THEME.spacing.lg,
  },
  mainContentTablet: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
    alignItems: 'flex-start',
  },
  chartContainer: {
    width: '100%',
  },
  chartContainerTablet: {
    flex: 1,
    minWidth: 400,
  },
  chart: {},
  explainerContainerTablet: {
    flex: 1,
    maxWidth: 500,
  },
  explainerMobile: {
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
