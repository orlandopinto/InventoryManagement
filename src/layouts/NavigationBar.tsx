import { Nav, Navbar } from 'react-bootstrap'
import CustomToggle from '../components/CustomToggle'
import ThemeSelection from './ThemeSelection'
import logo from '../assets/images/logo.png'

const NavigationBar = () => {
    return (
        <div className="navbar-container">
            <Navbar id="topNavbar">
                <div className='container-fluid'>
                    <Nav className="me-auto">
                        {
                            window.location.pathname === "/dashboard"
                                ?
                                <div className='nav-container'>
                                    <div className="nav-title">
                                        <span>Buenas noches,</span> <span className='nav-user-name'>Orlando Pinto</span>
                                    </div>
                                    <div className="nav-subtitle">Resumen de tu desempeño esta semana</div>
                                </div>
                                :
                                <div>
                                    <img src={logo} alt="logo" style={{ width: 100 }} />
                                </div>
                        }
                    </Nav>
                    <Nav className='m-3'>
                        <ThemeSelection />
                    </Nav>
                    <Nav>
                        <CustomToggle />
                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}

export default NavigationBar