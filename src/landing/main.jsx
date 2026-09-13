import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import './landing.css'
import Landing from './Landing.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
)
