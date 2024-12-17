import './App.css'
import { Outlet } from "react-router-dom";
import { UserProvider } from './contexts/useAuth';
import { ToastContainer } from 'react-toastify';
import ToastContainerComponent from './components/common/ToastContainerComponent';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
      return (
            <UserProvider>
                  <QueryClientProvider client={queryClient}>
                        <Outlet />
                        <ToastContainer />
                        <ToastContainerComponent />
                  </QueryClientProvider>
            </UserProvider>
      )
}

export default App
