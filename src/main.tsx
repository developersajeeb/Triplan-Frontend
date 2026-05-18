import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/app.scss'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { Provider as ReduxProvider } from "react-redux";
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'
import ErrorBoundary from './components/utilities/ErrorBoundary.tsx'
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Toaster richColors position="top-right" />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </ReduxProvider>
  </React.StrictMode>
)
