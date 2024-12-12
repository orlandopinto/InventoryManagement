import './App.css'
import { Outlet } from "react-router-dom";
import { UserProvider } from './contexts/useAuth';
import { ToastContainer } from 'react-toastify';

const App = () => {
      return (
            <UserProvider>
                  <Outlet />
                  <ToastContainer />
            </UserProvider>
      )
}

export default App
