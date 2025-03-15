import type { ComponentType } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '@/components/ui/theme';
import { TooltipProvider } from '@/components/ui/tooltip';

const container = document.getElementById('root');
const root = container && createRoot(container);

export default function render(App: ComponentType) {
  root?.render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>,
  );
}
