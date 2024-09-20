import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.scss'

import { StoreProvider } from '@/providers/StoreProvider.tsx';
import { I18nextProvider } from 'react-i18next';
import App from './App.tsx'
import i18n from './config/i18n.ts';
import { IconFontStyles } from './components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <I18nextProvider i18n={i18n}>
        <IconFontStyles/>
        <App />
      </I18nextProvider>
    </StoreProvider>
  </StrictMode>,
)
