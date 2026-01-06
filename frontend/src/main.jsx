
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { TopicProvider } from './contexts/TopicContext.jsx'
import { AuthProvider } from './contexts/UserContext.jsx'
createRoot(document.getElementById('root')).render(
  <TopicProvider>
    <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  </TopicProvider>,
)
