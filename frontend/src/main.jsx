
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { TopicProvider } from './contexts/TopicContext.jsx'

createRoot(document.getElementById('root')).render(
  <TopicProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TopicProvider>,
)
