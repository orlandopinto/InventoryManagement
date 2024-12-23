import NavigationBar from './NavigationBar';
import './Layout.css';
import Footer from './Footer';
import ProSideBar from './ProSideBar';

const Layout = (Component: any) => ({ ...props }) => {

    return (
        <div className="container-wrapper">
            <div className="panel-left">
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