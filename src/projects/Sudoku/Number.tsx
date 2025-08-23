import type { PropsWithChildren } from 'react';

export function Number({ children }: PropsWithChildren) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <text
        dominantBaseline="middle"
        fill="black"
        fontSize="50"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {children}
      </text>
    </svg>
  );
}
