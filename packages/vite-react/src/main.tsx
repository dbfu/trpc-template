import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import RootProvider from './providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RootProvider>
    <App />
  </RootProvider>
)
