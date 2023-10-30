import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AppProvider from './hooks/index.jsx';
import Routes from './routes/routes.jsx';
import GlobalStyles from './styles/globalStyles.jsx';

const clientQuery = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={clientQuery}>

      <AppProvider >
        <RouterProvider router={Routes} />
        <GlobalStyles />
        <ToastContainer
          autoClose={2000}
          theme="dark"
          position="top-right"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppProvider>
    </QueryClientProvider>

  </>)