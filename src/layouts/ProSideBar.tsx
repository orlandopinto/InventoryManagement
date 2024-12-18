import { useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import * as Icon from "react-bootstrap-icons";
import { Link, useLocation } from 'react-router-dom';
import "./sidebar.css"
import logo from '../assets/images/logo.png'

function ProSideBar() {
     const [collapsed, setCollapsed] = useState(false);
     const [active, setIsActive] = useState(false);
     const location = useLocation();
     return (
          <div style={{ display: "flex", height: "100vh" }}>
               <Sidebar collapsed={collapsed} id='ProSidebar'>
                    <Menu
                         menuItemStyles={{
                              button: ({ level, active, disabled }) => {
                                   // only apply styles on first level elements of the tree
                                   if (level === 0)
                                        return {
                                             //color: disabled ? '#f5d9ff' : '#d359ff',
                                             backgroundColor: active ? '#eecef9' : undefined,
                                        };
                              },
                         }}
                    >
                         <MenuItem onClick={() => setCollapsed(!collapsed)} className="pro-sidebar-header" icon={<Icon.List size={20} />} >
                              <img src={logo} alt="logo" style={{ width: 100 }} />
                         </MenuItem>
                         <MenuItem active={window.location.pathname === "/dashboard"} onClick={() => setIsActive(true)} icon={<Icon.House size={20} />} component={<Link to="/dashboard" className="link" />}> Dashboard </MenuItem>
                         <MenuItem active={window.location.pathname === "/about"} icon={<Icon.QuestionCircle size={20} />} component={<Link to="/about" className="link" />}> Acerca de </MenuItem>
                         <SubMenu
                              defaultOpen={window.location.pathname === "/users" || window.location.pathname === "/users/adduser"}
                              icon={<Icon.CreditCard size={20} />}
                              label="Administración"
                              rootStyles={{
                                   ['& > .ps-submenu-content.ps-open']: {
                                        backgroundColor: 'transparent',
                                        //margin: '.5rem',
                                        borderRadius: '.2rem',
                                        '&:hover': {
                                             //backgroundColor: '#eee',
                                        },
                                   },
                                   ['.ps-submenu-content']: {
                                        backgroundColor: 'transparent',
                                   },
                              }}
                         >
                              <MenuItem active={window.location.pathname === "/users" || window.location.pathname === "/users/adduser"} icon={<Icon.People size={20} />} component={<Link to="/users" className="link" />}> Usuarios </MenuItem>
                         </SubMenu>
                         <SubMenu
                              defaultOpen={window.location.pathname === "/categories" || window.location.pathname === "/categories/AddUpdateCategory"}
                              icon={<Icon.CreditCard size={20} />}
                              label="Productos"
                              rootStyles={{
                                   ['& > .ps-submenu-content.ps-open']: {
                                        backgroundColor: 'transparent',
                                        //margin: '.5rem',
                                        borderRadius: '.2rem',
                                        '&:hover': {
                                             //backgroundColor: '#eee',
                                        },
                                   },
                                   ['.ps-submenu-content']: {
                                        backgroundColor: 'transparent',
                                   },
                              }}
                         >
                              <MenuItem active={window.location.pathname === "/categories" || window.location.pathname === "/categories/AddUpdateCategory"} icon={<Icon.People size={20} />} component={<Link to="/categories" className="link" />}> Categorías </MenuItem>
                         </SubMenu>
                    </Menu>
               </Sidebar>
          </div>
     );
}

export default ProSideBar