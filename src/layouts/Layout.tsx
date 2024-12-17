import React from 'react';
import NavigationBar from './NavigationBar';
import SideBar from './SideBar';
import './Layout.css';
import Footer from './Footer';
import ProSideBar from './ProSideBar';

const Layout = (Component) => ({ ...props }) => {

    return (
        <div className="container-wrapper">
            <div className="panel-left">
                {/* <SideBar /> */}
                <ProSideBar />
            </div>
            <div className="panel-right">
                <NavigationBar />
                <main>
                    <Component {...props} />
                    <Footer />
                </main>
            </div>
        </div>
    )

};

export default Layout;