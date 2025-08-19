// components/atoms/Spinner.tsx
'use client';
import React from 'react';

interface SpinnerProps {
  size?: number; // px
  color?: string; // Tailwind色クラス or HEX
  borderWidth?: number; // px
}

export default function Spinner({
  size = 48,
  color = 'indigo-600',
  borderWidth = 4,
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-dashed`}
        style={{
          width: size,
          height: size,
          borderWidth,
          borderTopColor: color,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        }}
      ></div>
    </div>
  );
}
