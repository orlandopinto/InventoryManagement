import { Facebook, Instagram, Twitter } from "react-bootstrap-icons"


function Footer() {
    return (
        <div className="footer-container border-top mx-2 mt-4">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            <svg className="bi" width="30" height="24"><use href="#bootstrap"></use></svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Company, Inc</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className="text-body-secondary" href="#"><Twitter size={20} /></a></li>
                        <li className="ms-3"><a className="text-body-secondary" href="#"><Instagram size={20} /></a></li>
                        <li className="ms-3"><a className="text-body-secondary" href="#"><Facebook size={20} /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer