import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from './pages/errorboundaryfallback'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
            <App />
        </ErrorBoundary>
    </StrictMode>,
)
