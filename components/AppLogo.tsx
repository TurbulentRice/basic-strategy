import React from 'react';
import { Image, ImageStyle, StyleSheet, ViewStyle } from 'react-native';

interface AppLogoProps {
  size?: number;
  style?: ViewStyle;
}

export function AppLogo({ size = 32, style }: AppLogoProps) {
  return (
    <Image
      source={require('@/assets/logo.png')}
      style={[styles.logo, { width: size, height: size }, style as ImageStyle]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 8,
  },
});
