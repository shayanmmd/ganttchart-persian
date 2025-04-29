import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { ThemeProvider } from 'react-bootstrap'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider dir="rtl">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
