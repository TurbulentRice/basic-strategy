import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface PracticeIconProps {
  size?: number;
  color?: string;
}

export function PracticeIcon({ size = 24, color = '#ffd700' }: PracticeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Playing cards - back card */}
      <Rect
        x="8"
        y="4"
        width="11"
        height="15"
        rx="1.5"
        fill={color}
        opacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Playing cards - front card */}
      <Rect
        x="5"
        y="7"
        width="11"
        height="15"
        rx="1.5"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Ace symbol */}
      <Path
        d="M10.5 13 L10.5 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M9 15 L12 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
