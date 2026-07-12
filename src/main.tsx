import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProgressProvider } from './context/ProgressContext.tsx'
import { LevelProvider } from './context/LevelContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LevelProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </LevelProvider>
    </HashRouter>
  </StrictMode>,
)
