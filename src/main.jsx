import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router/router.jsx'
import themeConfig from './theme/themeConfig.js'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './Redux/store.jsx'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster richColors position="top-right" />
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={router}></RouterProvider>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>

  </StrictMode>,
)
