import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface LearnIconProps {
  size?: number;
  color?: string;
}

export function LearnIcon({ size = 24, color = '#ffd700' }: LearnIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Strategy chart/grid icon */}
      <Rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />

      {/* Grid lines - horizontal */}
      <Path d="M3 9 L21 9" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <Path d="M3 14 L21 14" stroke={color} strokeWidth="1.5" opacity="0.7" />

      {/* Grid lines - vertical */}
      <Path d="M9 4 L9 20" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <Path d="M15 4 L15 20" stroke={color} strokeWidth="1.5" opacity="0.7" />

      {/* Highlighted cell */}
      <Rect x="9.5" y="9.5" width="5" height="4" fill={color} opacity="0.3" rx="0.5" />
    </Svg>
  );
}
