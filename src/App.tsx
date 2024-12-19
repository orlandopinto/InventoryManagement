import './App.css'
import { Outlet } from "react-router-dom";
import { UserProvider } from './contexts/useAuth';
import { ToastContainer } from 'react-toastify';
import ToastContainerComponent from './components/common/ToastContainerComponent';
import { QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import './i18n';
const queryClient = new QueryClient();

i18next.init({
      interpolation: { escapeValue: false }, // React already does escaping
});

const App = () => {
      return (
            <UserProvider>
                  <QueryClientProvider client={queryClient}>
                        <I18nextProvider i18n={i18next}>
                              <Outlet />
                              <ToastContainer />
                              <ToastContainerComponent />
                        </I18nextProvider>
                  </QueryClientProvider>
            </UserProvider>
      )
}

export default App
