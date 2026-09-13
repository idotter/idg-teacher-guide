import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import '../landing/landing.css'
import Page from './Page.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
