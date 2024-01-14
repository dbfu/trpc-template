import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import RootProvider from './providers/index.tsx'

import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RootProvider>
    <App />
  </RootProvider>
)
