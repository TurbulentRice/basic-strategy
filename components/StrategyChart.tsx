import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ViewStyle } from 'react-native';
import { ChartCell } from './ChartCell';
import { COLORS, THEME } from '@/constants/theme';
import { getChartData, formatDealerCard, HandType } from '@/utils/chartUtils';

interface StrategyChartProps {
  handType: HandType;
  style?: ViewStyle;
}

export function StrategyChart({ handType, style }: StrategyChartProps) {
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [highlightedCol, setHighlightedCol] = useState<number | null>(null);

  const chartData = getChartData(handType);

  const handleCellPress = (rowIndex: number, colIndex: number) => {
    if (highlightedRow === rowIndex && highlightedCol === colIndex) {
      // Deselect if clicking the same cell
      setHighlightedRow(null);
      setHighlightedCol(null);
    } else {
      setHighlightedRow(rowIndex);
      setHighlightedCol(colIndex);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Dealer label indicator */}
      <View style={styles.dealerLabelContainer}>
        <Text style={styles.dealerLabelText}>Dealer's Up Card →</Text>
      </View>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          {/* Header row with dealer cards */}
          <View style={styles.headerRow}>
            <View style={styles.cornerCell}>
              <Text style={styles.cornerText}>You ↓</Text>
            </View>
            {chartData.dealerCards.map((dealer, index) => {
              const isHighlighted = highlightedCol === index;
              return (
                <View
                  key={dealer}
                  style={[
                    styles.headerCell,
                    isHighlighted && styles.highlightedHeader,
                  ]}
                >
                  <Text style={[
                    styles.headerText,
                    isHighlighted && styles.highlightedHeaderText,
                  ]}>
                    {formatDealerCard(dealer)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Data rows */}
          {chartData.rows.map((row, rowIndex) => {
            const isRowHighlighted = highlightedRow === rowIndex;
            return (
              <View key={row.label} style={styles.dataRow}>
                {/* Row label (player hand) */}
                <View
                  style={[
                    styles.rowLabel,
                    isRowHighlighted && styles.highlightedRowLabel,
                  ]}
                >
                  <Text style={[
                    styles.rowLabelText,
                    isRowHighlighted && styles.highlightedRowLabelText,
                  ]}>{row.label}</Text>
                </View>

              {/* Action cells */}
              {row.cells.map((action, colIndex) => (
                <ChartCell
                  key={colIndex}
                  action={action}
                  isHighlighted={
                    highlightedRow === rowIndex && highlightedCol === colIndex
                  }
                  onPress={() => handleCellPress(rowIndex, colIndex)}
                  style={styles.cell}
                />
              ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.feltGreen.medium,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.sm,
    ...THEME.shadows.md,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
  },
  scrollContent: {
    paddingBottom: THEME.spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  cornerCell: {
    width: 40,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 40, 24, 0.6)',
    borderRadius: THEME.borderRadius.sm,
    marginRight: 3,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
  },
  cornerText: {
    fontSize: 10,
    color: COLORS.gold.primary,
    fontWeight: THEME.typography.fontWeight.bold,
    textShadowColor: COLORS.gold.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  headerCell: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 40, 24, 0.6)',
    borderRadius: THEME.borderRadius.sm,
    marginRight: 1,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
  },
  highlightedHeader: {
    backgroundColor: COLORS.gold.primary,
    borderColor: COLORS.ui.white,
    borderWidth: 2,
    ...THEME.shadows.md,
  },
  headerText: {
    fontSize: 12,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
  },
  highlightedHeaderText: {
    color: COLORS.feltGreen.darkest,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  rowLabel: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 40, 24, 0.6)',
    borderRadius: THEME.borderRadius.sm,
    marginRight: 3,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
  },
  highlightedRowLabel: {
    backgroundColor: COLORS.gold.primary,
    borderColor: COLORS.ui.white,
    borderWidth: 2,
    ...THEME.shadows.md,
  },
  rowLabelText: {
    fontSize: 12,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
  },
  highlightedRowLabelText: {
    color: COLORS.feltGreen.darkest,
  },
  cell: {
    marginRight: 1,
  },
  dealerLabelContainer: {
    margin: 'auto',
    marginBottom: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.xs,
  },
  dealerLabelText: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.gold.light,
    fontWeight: THEME.typography.fontWeight.semibold,
    textShadowColor: COLORS.gold.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  }
});
