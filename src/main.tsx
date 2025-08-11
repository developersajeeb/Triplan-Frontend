import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/app.scss'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { Provider as ReduxProvider } from "react-redux";
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
)
