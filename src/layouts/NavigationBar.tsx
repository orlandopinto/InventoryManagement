import { Nav, Navbar } from 'react-bootstrap'
import CustomToggle from '../components/CustomToggle'
import ThemeSelection from './ThemeSelection'
import logo from '../assets/images/logo.png'
import LanguageSwitcher from '../components/common/LanguageSwitcher'
import { useTranslation } from 'react-i18next'


const NavigationBar = () => {
    const { t } = useTranslation();
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
                                        <span>{t('goodNight')},</span> <span className='nav-user-name'>Orlando Pinto</span>
                                    </div>
                                    <div className="nav-subtitle">{t('navSubtitle')}</div>
                                </div>
                                :
                                <div>
                                    <img src={logo} alt="logo" style={{ width: 100 }} />
                                </div>
                        }
                    </Nav>
                    <Nav className='m-3'>
                        <LanguageSwitcher />
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