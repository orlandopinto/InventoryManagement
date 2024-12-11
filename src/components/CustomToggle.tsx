import React from 'react'
import { NavDropdown, Image } from 'react-bootstrap'
import * as Icon from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function CustomToggle() {
    const UserMenu = (<Image src={'https://lh3.googleusercontent.com/ogw/AF2bZyiVsVPwAkN0cXrM-ravKNqB3IypRMrUmHxPtdsJ8RDtaXY=s32-c-mo'} alt="UserName profile image" roundedCircle style={{ width: '33px' }} />)
    const { logout } = useAuth();

    return (
        <NavDropdown title={UserMenu} className='profile-dropdown'>
            <Link to="/profile" className='dropdown-item'><Icon.Person size={20} /><span>Perfil</span></Link>
            <Link to="/setting" className='dropdown-item'><Icon.Gear size={20} /><span>Configuración</span></Link>
            <NavDropdown.Divider />
            <a onClick={logout} className='dropdown-item'><Icon.BoxArrowInRight size={20} /><span>Cerrar sesión</span></a>
        </NavDropdown >
    )
}

export default CustomToggle