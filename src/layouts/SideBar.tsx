import "./styles.scss";
import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from "react-bootstrap-sidebar-menu";
import * as Icon from 'react-bootstrap-icons';

const SideBar = () => {
    const theme = "dark";

    return (
        <Sidebar variant={theme} bg={theme} expand="sm">
            <Sidebar.Collapse getScrollValue={290}>
                <Sidebar.Header>
                    <Sidebar.Brand>Logo</Sidebar.Brand>
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
                        <Link data-rb-event-key="menu_title" className='sidebar-menu-nav-link' to="/users">
                            <span className="sidebar-menu-nav-icon"><Icon.QuestionCircle size={20} /></span>
                            <span className="sidebar-menu-nav-title">Lista de usuarios</span>
                        </Link>
                        <Sidebar.Sub eventKey={0}>
                            <Sidebar.Sub.Toggle>
                                <Sidebar.Nav.Icon />
                                <Sidebar.Nav.Title>Submenu</Sidebar.Nav.Title>
                            </Sidebar.Sub.Toggle>
                            <Sidebar.Sub.Collapse>
                                <Sidebar.Nav>
                                    <Sidebar.Nav.Link eventKey="sum_menu_title">
                                        <Sidebar.Nav.Icon><Icon.Printer size={20} /></Sidebar.Nav.Icon>
                                        <Sidebar.Nav.Title>Sub menu item</Sidebar.Nav.Title>
                                    </Sidebar.Nav.Link>
                                </Sidebar.Nav>
                            </Sidebar.Sub.Collapse>
                        </Sidebar.Sub>
                    </Sidebar.Nav>
                </Sidebar.Body>
            </Sidebar.Collapse>
        </Sidebar>
    )
}

export default SideBar