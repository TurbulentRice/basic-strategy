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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          {/* Header row with dealer cards */}
          <View style={styles.headerRow}>
            <View style={styles.cornerCell}>
              <Text style={styles.cornerText}>You ↓</Text>
            </View>
            {chartData.dealerCards.map((dealer, index) => (
              <View
                key={dealer}
                style={[
                  styles.headerCell,
                  highlightedCol === index && styles.highlightedHeader,
                ]}
              >
                <Text style={styles.headerText}>
                  {formatDealerCard(dealer)}
                </Text>
              </View>
            ))}
          </View>

          {/* Data rows */}
          {chartData.rows.map((row, rowIndex) => (
            <View key={row.label} style={styles.dataRow}>
              {/* Row label (player hand) */}
              <View
                style={[
                  styles.rowLabel,
                  highlightedRow === rowIndex && styles.highlightedRowLabel,
                ]}
              >
                <Text style={styles.rowLabelText}>{row.label}</Text>
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
          ))}
        </View>
      </ScrollView>

      {/* Dealer label */}
      <View style={styles.dealerLabel}>
        <Text style={styles.dealerLabelText}>Dealer Up Card →</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.feltGreen.medium,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.sm,
    ...THEME.shadows.md,
  },
  scrollContent: {
    paddingBottom: THEME.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.xs,
  },
  cornerCell: {
    width: 50,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.feltGreen.dark,
    borderRadius: THEME.borderRadius.sm,
    marginRight: THEME.spacing.xs,
  },
  cornerText: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.gold.primary,
    fontWeight: THEME.typography.fontWeight.bold,
  },
  headerCell: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.feltGreen.dark,
    borderRadius: THEME.borderRadius.sm,
    marginRight: THEME.spacing.xs / 2,
  },
  highlightedHeader: {
    backgroundColor: COLORS.gold.dark,
  },
  headerText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.xs / 2,
  },
  rowLabel: {
    width: 50,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.feltGreen.dark,
    borderRadius: THEME.borderRadius.sm,
    marginRight: THEME.spacing.xs,
  },
  highlightedRowLabel: {
    backgroundColor: COLORS.gold.dark,
  },
  rowLabelText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.gold.primary,
  },
  cell: {
    marginRight: THEME.spacing.xs / 2,
  },
  dealerLabel: {
    position: 'absolute',
    top: THEME.spacing.sm,
    right: THEME.spacing.sm,
    backgroundColor: COLORS.feltGreen.dark,
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs / 2,
    borderRadius: THEME.borderRadius.sm,
  },
  dealerLabelText: {
    fontSize: THEME.typography.fontSize.xs,
    color: COLORS.gold.primary,
    fontWeight: THEME.typography.fontWeight.bold,
  },
});
