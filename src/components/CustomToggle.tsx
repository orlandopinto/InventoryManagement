import { NavDropdown, Image } from 'react-bootstrap'
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from 'react-router-dom';
import foto from '../assets/images/foto.jpg'
import { useAuth } from '../contexts/useAuth';

function CustomToggle() {
    const UserMenu = (<Image src={foto} alt="UserName profile image" className='avatar' />)
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    };

    return (
        <NavDropdown title={UserMenu} className='profile-dropdown'>
            <div className='profile-info'>
                <div>{UserMenu}</div>
                <div>{user?.fullName}</div>
                <div><strong>{user?.email}</strong></div>
            </div>
            <Link to="/profile" className='dropdown-item'><Icon.Person size={20} /><span>Perfil</span></Link>
            <Link to="/setting" className='dropdown-item'><Icon.Gear size={20} /><span>Configuración</span></Link>
            <NavDropdown.Divider />
            <a onClick={handleLogout} className='dropdown-item'><Icon.BoxArrowInRight size={20} /><span>Cerrar sesión</span></a>
        </NavDropdown >
    )
}

export default CustomToggle