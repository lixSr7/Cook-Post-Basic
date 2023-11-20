import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
)
