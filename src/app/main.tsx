if (import.meta.env.DEV) {
  const { scan } = await import('react-scan');
  scan({
    enabled: true,
    trackUnnecessaryRenders: true,
    log: false,
    showToolbar: true,
  });
}

import { ThemeProvider } from '@/shared/model/context/ThemeProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
