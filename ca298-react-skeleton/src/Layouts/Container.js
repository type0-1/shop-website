import { Outlet, Link } from "react-router-dom";

export default function Container() {
    return (
        <div className="container-fluid bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Home</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/category">Category</Link>
                <Link className="navbar-brand" to="/orders">Orders</Link>
                <Link className="navbar-brand" to="/customers">Customers</Link>
                <Link className="navbar-brand" to="/allorders">All Orders</Link>
                <Link className="navbar-brand" to="/addproduct">Add product</Link>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/secondpage">Second Page</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="row mt-4">
                <div className="col-md-8 offset-md-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
