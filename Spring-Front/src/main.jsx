import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// crear el entorno virual
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* las mayusculas representan componentes */}
    <App />
  </React.StrictMode>,
)
