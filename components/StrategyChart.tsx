import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ViewStyle, useWindowDimensions } from 'react-native';
import { ChartCell } from './ChartCell';
import { COLORS, THEME } from '@/constants/theme';
import { getChartData, formatDealerCard, HandType } from '@/utils/chartUtils';

interface StrategyChartProps {
  handType: HandType;
  style?: ViewStyle;
}

// Calculate responsive cell sizes based on screen width
function calculateCellSize(screenWidth: number): {
  cellSize: number;
  labelWidth: number;
  fontSize: number;
  headerFontSize: number;
  needsScroll: boolean;
} {
  // Account for Screen component padding and chart container padding
  const horizontalPadding = THEME.spacing.lg * 2 + THEME.spacing.sm * 2;
  const availableWidth = screenWidth - horizontalPadding;

  // Chart has: 1 corner cell + 10 dealer cards + margins
  // Min cell size for usability
  const MIN_CELL_SIZE = 28;
  const MAX_CELL_SIZE = 48;

  // Calculate ideal cell size to fit 10 columns + label
  const numColumns = 10;
  const labelWidthRatio = 1.4; // Label is ~1.4x the cell width
  const marginsBetweenCells = numColumns; // 1px margins

  // Calculate cell size: availableWidth = labelWidth + (cellSize * 10) + margins + gap
  // availableWidth = (cellSize * labelWidthRatio) + (cellSize * 10) + margins + 3
  const idealCellSize = (availableWidth - marginsBetweenCells - 3) / (numColumns + labelWidthRatio);

  // Clamp to min/max
  const cellSize = Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, Math.floor(idealCellSize)));
  const labelWidth = Math.floor(cellSize * labelWidthRatio);

  // Calculate if we need horizontal scroll
  const totalWidth = labelWidth + 3 + (cellSize * numColumns) + marginsBetweenCells;
  const needsScroll = totalWidth > availableWidth;

  // Scale font sizes with cell size
  const fontSize = Math.floor(cellSize * 0.42); // ~12px at 30px cell
  const headerFontSize = Math.floor(cellSize * 0.36); // ~10px at 30px cell

  return { cellSize, labelWidth, fontSize, headerFontSize, needsScroll };
}

export function StrategyChart({ handType, style }: StrategyChartProps) {
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [highlightedCol, setHighlightedCol] = useState<number | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  const chartData = getChartData(handType);
  const sizes = calculateCellSize(screenWidth);

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
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={sizes.needsScroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          {/* Header row with dealer cards */}
          <View style={styles.headerRow}>
            <View style={[
              styles.cornerCell,
              {
                width: sizes.labelWidth,
                height: sizes.cellSize,
              }
            ]}>
              <Text style={[
                styles.cornerText,
                { fontSize: sizes.headerFontSize }
              ]}>You ↓</Text>
            </View>
            {chartData.dealerCards.map((dealer, index) => {
              const isHighlighted = highlightedCol === index;
              return (
                <View
                  key={dealer}
                  style={[
                    styles.headerCell,
                    {
                      width: sizes.cellSize,
                      height: sizes.cellSize,
                    },
                    isHighlighted && styles.highlightedHeader,
                  ]}
                >
                  <Text style={[
                    styles.headerText,
                    { fontSize: sizes.fontSize },
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
                    {
                      width: sizes.labelWidth,
                      height: sizes.cellSize,
                    },
                    isRowHighlighted && styles.highlightedRowLabel,
                  ]}
                >
                  <Text style={[
                    styles.rowLabelText,
                    { fontSize: sizes.fontSize },
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
                  cellSize={sizes.cellSize}
                  fontSize={sizes.fontSize}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 40, 24, 0.6)',
    borderRadius: THEME.borderRadius.sm,
    marginRight: 3,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteLight,
  },
  cornerText: {
    color: COLORS.gold.primary,
    fontWeight: THEME.typography.fontWeight.bold,
    textShadowColor: COLORS.gold.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  headerCell: {
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
