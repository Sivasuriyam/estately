import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'

// Shows the real error on screen instead of a blank page.
class ErrorBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return <pre style={{ padding: 24, color: '#b91c1c', whiteSpace: 'pre-wrap' }}>Something went wrong:{'\n'}{String(this.state.error?.stack || this.state.error)}</pre>
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary><BrowserRouter><AppProvider><App /></AppProvider></BrowserRouter></ErrorBoundary>
)
