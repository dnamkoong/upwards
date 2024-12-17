import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { AlbumsProvider } from './context/albumsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlbumsProvider>
      <App />
    </AlbumsProvider>
  </StrictMode>,
)
