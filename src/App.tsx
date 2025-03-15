import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import { AppErrorBoundaryFallback } from '@/error-handling/fallbacks/App';
import { Pages } from '@/routes/Pages';
import { Header } from '@/sections/Header';
import { useServiceWorker } from '@/sections/ServiceWorker';

import { Toaster } from './components/ui/toast';

function App() {
  useServiceWorker();

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
