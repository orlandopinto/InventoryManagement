import "./sidebar.css"
import logo from '../assets/images/logo.png'
import * as Icon from "react-bootstrap-icons";
import { useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProSideBar() {
     const { t } = useTranslation();
     const [collapsed, setCollapsed] = useState(false);
     const { id } = useParams<string>()

     return (
          <div style={{ display: "flex", height: "100vh" }}>
               <Sidebar collapsed={collapsed} id='ProSidebar'>
                    <Menu>
                         <MenuItem onClick={() => setCollapsed(!collapsed)} className="pro-sidebar-header" icon={<Icon.List size={20} />} >
                              <img src={logo} alt="logo" style={{ width: 100 }} />
                         </MenuItem>
                         <MenuItem active={window.location.pathname === "/dashboard"} icon={<Icon.Kanban size={20} />} component={<Link to="/dashboard" className="link" />}> Dashboard </MenuItem>
                         <MenuItem active={window.location.pathname === "/about"} icon={<Icon.QuestionCircle size={20} />} component={<Link to="/about" className="link" />}> {t('About')} </MenuItem>
                         <SubMenu
                              defaultOpen={
                                   window.location.pathname === "/users" ||
                                   window.location.pathname === (id === undefined ? '/users/adduser' : `/users/adduser/${id}`)
                              }
                              icon={<Icon.Gear size={20} />}
                              label={t('Administration')}
                         >
                              <MenuItem active={window.location.pathname === "/users" || window.location.pathname === (id === undefined ? '/users/adduser' : `/users/adduser/${id}`)} icon={<Icon.People size={20} />} component={<Link to="/users" className="link" />}> {t('Users')} </MenuItem>
                         </SubMenu>
                         <SubMenu
                              defaultOpen={
                                   window.location.pathname === "/categories" ||
                                   window.location.pathname === (id === undefined ? '/categories/AddUpdateCategory' : `/categories/AddUpdateCategory/${id}`) ||

                                   window.location.pathname === "/subcategories" ||
                                   window.location.pathname === (id === undefined ? '/subcategories/AddUpdateSubCategory' : `/subcategories/AddUpdateSubCategory/${id}`) ||

                                   window.location.pathname === "/attributes" ||

                                   window.location.pathname === "/discounts" ||
                                   window.location.pathname === (id === undefined ? '/discounts/AddUpdateDiscount' : `/discounts/AddUpdateDiscount/${id}`) ||

                                   window.location.pathname === "/status" ||
                                   window.location.pathname === (id === undefined ? '/status/AddUpdateStatus' : `/status/AddUpdateStatus/${id}`) ||

                                   window.location.pathname === "/taxes" ||
                                   window.location.pathname === (id === undefined ? '/taxes/AddUpdateTaxes' : `/taxes/AddUpdateTaxes/${id}`)
                              }
                              icon={<Icon.BoxSeam size={20} />}
                              label={t('Inventory')}
                         >
                              <MenuItem active={window.location.pathname === "/categories" || window.location.pathname === (id === undefined ? '/categories/AddUpdateCategory' : `/categories/AddUpdateCategory/${id}`)} icon={<Icon.Bookmark size={20} />} component={<Link to="/categories" className="link" />}> {t('Categories')} </MenuItem>
                              <MenuItem active={window.location.pathname === "/subcategories" || window.location.pathname === (id === undefined ? '/subcategories/AddUpdateSubCategory' : `/subcategories/AddUpdateSubCategory/${id}`)} icon={<Icon.Bookmarks size={20} />} component={<Link to="/subcategories" className="link" />}> Sub {t('Categories')} </MenuItem>
                              <MenuItem active={window.location.pathname === "/attributes"} icon={<Icon.Hash size={30} />} component={<Link to="/attributes" className="link" />}> {t('Attributes')} </MenuItem>
                              <MenuItem active={window.location.pathname === "/discounts" || window.location.pathname === (id === undefined ? '/discounts/AddUpdateDiscount' : `/discounts/AddUpdateDiscount/${id}`)} icon={<Icon.Percent size={20} />} component={<Link to="/discounts" className="link" />}> {t('Discount')} </MenuItem>
                              <MenuItem active={window.location.pathname === "/status" || window.location.pathname === (id === undefined ? '/status/AddUpdateStatus' : `/status/AddUpdateStatus/${id}`)} icon={<Icon.Flag size={20} />} component={<Link to="/status" className="link" />}> {t('Status')} </MenuItem>
                              <MenuItem active={window.location.pathname === "/taxes" || window.location.pathname === (id === undefined ? '/taxes/AddUpdateTaxes' : `/taxes/AddUpdateTaxes/${id}`)} icon={<Icon.CashCoin size={20} />} component={<Link to="/taxes" className="link" />}> {t('Taxes')} </MenuItem>
                         </SubMenu>
                         <SubMenu
                              defaultOpen={
                                   window.location.pathname === "/tools/emailsender" || window.location.pathname === "/tools/emailsender"
                              }
                              icon={<Icon.Tools size={20} />}
                              label={t('Tools')}
                         >
                              <MenuItem active={window.location.pathname === "/tools/emailsender" || window.location.pathname === "/tools"} icon={<Icon.EnvelopePaper size={20} />} component={<Link to="/tools/emailsender" className="link" />}> {t('EmailManager')} </MenuItem>
                         </SubMenu>
                    </Menu>
               </Sidebar>
          </div>
     );
}

export default ProSideBar