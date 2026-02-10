import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Action } from '@/types';
import { ActionButton } from './ActionButton';
import { THEME } from '@/constants/theme';

interface ActionButtonsProps {
  availableActions: Action[];
  onActionPress: (action: Action) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function ActionButtons({
  availableActions,
  onActionPress,
  disabled = false,
  style,
}: ActionButtonsProps) {
  // Organize actions in a responsive grid
  // First row: Hit, Stand
  // Second row: Double, Split (if available)
  const primaryActions: Action[] = [];
  const secondaryActions: Action[] = [];

  availableActions.forEach(action => {
    if (action === 'H' || action === 'S') {
      primaryActions.push(action);
    } else {
      secondaryActions.push(action);
    }
  });

  return (
    <View style={[styles.container, style]}>
      {/* Primary actions (Hit, Stand) */}
      <View style={styles.row}>
        {primaryActions.map(action => (
          <View key={action} style={styles.buttonWrapper}>
            <ActionButton
              action={action}
              onPress={() => onActionPress(action)}
              disabled={disabled}
            />
          </View>
        ))}
      </View>

      {/* Secondary actions (Double, Split) */}
      {secondaryActions.length > 0 && (
        <View style={styles.row}>
          {secondaryActions.map(action => (
            <View key={action} style={styles.buttonWrapper}>
              <ActionButton
                action={action}
                onPress={() => onActionPress(action)}
                disabled={disabled}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: THEME.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
  },
  buttonWrapper: {
    flex: 1,
  },
});
