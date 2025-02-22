import { NavDropdown, Image } from 'react-bootstrap'
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from 'react-router-dom';
import foto from '../assets/images/foto.jpg'
import { useAuth } from '../contexts/useAuth';

function CustomToggle() {
    const AvatarUserProfile = (<Image src={foto} alt="UserName profile image" className='avatar' />)
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/account/login')
    };

    return (
        <NavDropdown title={AvatarUserProfile} className='profile-dropdown'>
            <div className='profile-info'>
                <div className='profile-info-image'>{AvatarUserProfile}</div>
                <div className='profile-info-full-name'>{user?.fullName}</div>
                {/* <div className='profile-info-email'><strong>{user?.email}</strong></div> */}
            </div>
            <NavDropdown.Divider />
            <Link to="/profile" className='dropdown-item'><Icon.Person size={20} /><span>Perfil</span></Link>
            <Link to="/setting" className='dropdown-item'><Icon.Gear size={20} /><span>Configuración</span></Link>
            <NavDropdown.Divider />
            <a onClick={handleLogout} className='dropdown-item'><Icon.BoxArrowInRight size={20} /><span>Cerrar sesión</span></a>
        </NavDropdown >
    )
}

export default CustomToggle