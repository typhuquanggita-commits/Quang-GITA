import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppStoreProvider } from './store/AppStore';
import { ToastProvider } from './components/ui/primitives';
import './styles.css';

const container = document.getElementById('root');
if (!container) throw new Error('Không tìm thấy phần tử #root trong index.html.');

createRoot(container).render(
  <StrictMode>
    <AppStoreProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppStoreProvider>
  </StrictMode>,
);
