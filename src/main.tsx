import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

import { UserProvider } from '@/context/user.context.tsx'
import { Bounce, ToastContainer } from 'react-toastify'
import { HistoryProvider } from './context/history.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </UserProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      style={{ fontFamily: 'monospace, sans-serif', fontSize: '14px' }}
    />
  </StrictMode>,
)
