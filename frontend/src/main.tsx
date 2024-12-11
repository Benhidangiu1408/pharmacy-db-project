import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>,
)
