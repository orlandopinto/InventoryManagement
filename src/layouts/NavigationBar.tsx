import { Nav, Navbar } from 'react-bootstrap'
import CustomToggle from '../components/CustomToggle'
import ThemeSelection from './ThemeSelection'

const NavigationBar = () => {
    return (
        <div className="navbar-container">
            <Navbar id="topNavbar">
                <div className='container-fluid'>
                    <Nav className="me-auto">
                        <div className='nav-container'>
                            <div className="nav-title">
                                <span>Buenas noches,</span> <span className='nav-user-name'>Orlando Pinto</span>
                            </div>
                            <div className="nav-subtitle">Resumen de tu desempeño esta semana</div>
                        </div>
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