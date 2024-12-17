import "./styles.scss";
import "./sidebar.css";
import { Link } from 'react-router-dom';
import Sidebar from "react-bootstrap-sidebar-menu";
import * as Icon from 'react-bootstrap-icons';
import logo from '../assets/images/logo.png'

const SideBar = () => {
    const theme = "light";

    return (
        <Sidebar variant={theme} bg={theme} expand="sm">
            <Sidebar.Collapse getScrollValue={290}>
                <Sidebar.Header>
                    <Sidebar.Brand><img src={logo} alt="logo" style={{ width: 100 }} /></Sidebar.Brand>
                    <Sidebar.Toggle />
                </Sidebar.Header>
                <Sidebar.Body>
                    <Sidebar.Nav>
                        <Link data-rb-event-key="menu_title" className='sidebar-menu-nav-link' to="/dashboard">
                            <span className="sidebar-menu-nav-icon"><Icon.House size={20} /></span>
                            <span className="sidebar-menu-nav-title">Dashboard</span>
                        </Link>
                        <Link data-rb-event-key="menu_title" className='sidebar-menu-nav-link' to="/about">
                            <span className="sidebar-menu-nav-icon"><Icon.QuestionCircle size={20} /></span>
                            <span className="sidebar-menu-nav-title">Acerca de</span>
                        </Link>
                        <Sidebar.Sub eventKey={0}>
                            <Sidebar.Sub.Toggle className="collapsed">
                                <Icon.People size={20} />
                                <Sidebar.Nav.Title>Usuarios</Sidebar.Nav.Title>
                                <Sidebar.Nav.Icon />
                            </Sidebar.Sub.Toggle>
                            <Sidebar.Sub.Collapse>
                                <Sidebar.Nav>
                                    <Sidebar.Nav.Link eventKey="sum_menu_title" href="/users">
                                        <Sidebar.Nav.Icon><Icon.Printer size={20} /></Sidebar.Nav.Icon>
                                        <Sidebar.Nav.Title>User list Sidebar.Nav.Link </Sidebar.Nav.Title>
                                    </Sidebar.Nav.Link>
                                    <Link data-rb-event-key="sum_menu_title" className='sidebar-menu-nav-link active' to="/users" role="button" tabIndex={0} hrefLang="/users">
                                        <span className="sidebar-menu-nav-icon"><Icon.QuestionCircle size={20} /></span>
                                        <span className="sidebar-menu-nav-title">Lista de usuarios</span>
                                    </Link>
                                </Sidebar.Nav>
                            </Sidebar.Sub.Collapse>
                        </Sidebar.Sub>
                    </Sidebar.Nav>
                </Sidebar.Body>
                <Sidebar.Footer>
                    <div style={{ padding: '20px 5px', }}>
                        Sidebar Footer
                    </div>
                </Sidebar.Footer>
            </Sidebar.Collapse>
        </Sidebar >
    )
}

export default SideBar