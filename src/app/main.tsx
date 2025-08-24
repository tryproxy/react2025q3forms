import { scan } from 'react-scan';

scan({
  enabled: true,
  trackUnnecessaryRenders: true,
  log: false,
  showToolbar: true,
  dangerouslyForceRunInProduction: true,
});
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';
import { ThemeProvider } from '@/shared/model/context/ThemeProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
