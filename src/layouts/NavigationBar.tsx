import { Nav, Navbar } from 'react-bootstrap'
import CustomToggle from '../components/CustomToggle'
import ThemeSelection from './ThemeSelection'

const NavigationBar = () => {
    return (
        <div className="navbar-container">
            <Navbar bg="primary" data-bs-theme="dark">
                <div className='container-fluid'>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
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