import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/app.scss'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
