import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/account/Login';
import Register from './views/account/Register';
import Home from './views/index/Home';
import About from './views/index/About';
import Layout from './layouts/Layout';
import ProtectedRoutes from './routes/ProtectedRoutes';
import index from './views/users';
import { UserProvider } from './contexts/UserContext';
import Logout from './views/account/Logout';

const App = () => {
      const HomeComponent = Layout(Home);
      const AboutComponent = Layout(About);
      const UsersComponent = Layout(index);
      return (
            <UserProvider>
                  <BrowserRouter>
                        <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/Users" element={<UsersComponent />} />
                              <Route element={<ProtectedRoutes />}>
                                    <Route path="/" element={<HomeComponent />} />
                              </Route>
                              <Route element={<ProtectedRoutes />}>
                                    <Route path="/about" element={<AboutComponent />} />
                              </Route>
                        </Routes>
                  </BrowserRouter>
            </UserProvider>
      )
}

export default App