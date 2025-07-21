import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Context from './context/Context.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* PLACING APP COMPONENT INSIDE CONTEXT COMPONENT */}
      {/* So all components becomes the children of Context Component */}
      <Context>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context>
  </StrictMode>,
  
)
