import { useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import * as Icon from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import "./sidebar.css"
import logo from '../assets/images/logo.png'

function ProSideBar() {
     const [collapsed, setCollapsed] = useState(false);
     const [active, setIsActive] = useState(false);
     return (
          <div style={{ display: "flex", height: "100vh" }}>
               <Sidebar collapsed={collapsed} id='ProSidebar'>
                    <Menu>
                         <MenuItem onClick={() => setCollapsed(!collapsed)} className="pro-sidebar-header" icon={<Icon.List size={20} />} >
                              <img src={logo} alt="logo" style={{ width: 100 }} />
                         </MenuItem>
                         <MenuItem active={window.location.pathname === "/dashboard"} onClick={() => setIsActive(true)} icon={<Icon.Kanban size={20} />} component={<Link to="/dashboard" className="link" />}> Dashboard </MenuItem>
                         <MenuItem active={window.location.pathname === "/about"} icon={<Icon.QuestionCircle size={20} />} component={<Link to="/about" className="link" />}> Acerca de </MenuItem>
                         <SubMenu
                              defaultOpen={window.location.pathname === "/users" || window.location.pathname === "/users/adduser"}
                              icon={<Icon.Gear size={20} />}
                              label="Administración"
                         >
                              <MenuItem active={window.location.pathname === "/users" || window.location.pathname === "/users/adduser"} icon={<Icon.People size={20} />} component={<Link to="/users" className="link" />}> Usuarios </MenuItem>
                         </SubMenu>
                         <SubMenu
                              defaultOpen={window.location.pathname === "/categories" || window.location.pathname === "/categories/AddUpdateCategory"}
                              icon={<Icon.ShopWindow size={20} />}
                              label="Productos"
                         >
                              <MenuItem active={window.location.pathname === "/categories" || window.location.pathname === "/categories/AddUpdateCategory"} icon={<Icon.Bookmark size={20} />} component={<Link to="/categories" className="link" />}> Categorías </MenuItem>
                              <MenuItem active={window.location.pathname === "/subcategories" || window.location.pathname === "/subcategories/AddUpdateSubCategory"} icon={<Icon.Bookmarks size={20} />} component={<Link to="/subcategories" className="link" />}> Sub Categorías </MenuItem>
                         </SubMenu>
                    </Menu>
               </Sidebar>
          </div>
     );
}

export default ProSideBar