import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { COLORS, THEME } from '@/constants/theme';

export default function LearnScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>📊 Strategy Chart</Text>
        <Text style={styles.subtitle}>Coming in Phase 4</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            The interactive basic strategy chart will be available here.
          </Text>
          <Text style={styles.infoText}>
            For now, practice your skills in the Practice tab!
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.xl,
  },
  title: {
    fontSize: THEME.typography.fontSize['3xl'],
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.ui.white,
    marginBottom: THEME.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: THEME.typography.fontSize.lg,
    color: COLORS.gold.primary,
    marginBottom: THEME.spacing.xl,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: COLORS.feltGreen.light,
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    ...THEME.shadows.md,
  },
  infoText: {
    fontSize: THEME.typography.fontSize.base,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginBottom: THEME.spacing.sm,
    lineHeight: THEME.typography.fontSize.base * THEME.typography.lineHeight.relaxed,
  },
});
