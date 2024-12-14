import './App.css'
import { Outlet } from "react-router-dom";
import { UserProvider } from './contexts/useAuth';
import { ToastContainer } from 'react-toastify';
import ToastContainerComponent from './components/common/ToastContainerComponent';

const App = () => {
      return (
            <UserProvider>
                  <Outlet />
                  <ToastContainer />
                  <ToastContainerComponent />
            </UserProvider>
      )
}

export default App
