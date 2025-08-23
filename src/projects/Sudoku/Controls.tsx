import { X } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';

export function Controls() {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="col-span-4"></div>
      <ControlButton>Undo</ControlButton>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <ControlButton key={num}>{num}</ControlButton>
      ))}
      <ControlButton>
        <X />
      </ControlButton>
    </div>
  );
}

function ControlButton({ children }: PropsWithChildren) {
  return (
    <Button className="bg-white text-black" variant={'outline'}>
      {children}
    </Button>
  );
}
