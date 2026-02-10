import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Action } from '@/types';
import { ACTION_BUTTON_COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';
import { getActionLabel } from '@/utils/strategyUtils';

interface ActionButtonProps {
  action: Action;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function ActionButton({ action, onPress, disabled = false, style }: ActionButtonProps) {
  const colors = ACTION_BUTTON_COLORS[action as keyof typeof ACTION_BUTTON_COLORS];
  const label = getActionLabel(action);

  const handlePress = async () => {
    if (disabled) return;

    // Haptic feedback on iOS
    if (Platform.OS === 'ios') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // Haptics might not be available in all environments
      }
    }

    onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.background,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          { color: colors.text },
          disabled && styles.disabledText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: THEME.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    ...THEME.shadows.lg,
  },
  text: {
    fontSize: THEME.typography.fontSize.lg,
    fontWeight: THEME.typography.fontWeight.bold,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
