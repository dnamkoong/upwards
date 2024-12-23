import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AlbumsProvider } from './context/albumsContext.tsx';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlbumsProvider>
      <App />
    </AlbumsProvider>
  </StrictMode>,
)
