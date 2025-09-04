import type { SVGAttributes } from 'react';

interface Props {
  fontSize?: number;
}

export function Number({ children, fontSize, ...props }: SVGAttributes<SVGElement> & Props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text
        dominantBaseline="middle"
        fontSize={`${fontSize ?? 50}`}
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {children}
      </text>
    </svg>
  );
}
