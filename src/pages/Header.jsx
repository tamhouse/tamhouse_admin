import { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const Header = () => {
    const location = useLocation()
    const [state, setState] = useState({home: "", account: "", product: ""})
    useEffect(() => {
        if(location.pathname === "/account")
            setState({home: "", account: "active", product: ""})
        else if(location.pathname === "/product") 
            setState({home: "", account: "", product: "active"})
        else setState({home: "active", account: "", product: ""})
    }, [location])
    const logOut = () => {
        const cookies = new Cookies();
        cookies.remove("auth")
        window.location.href = "/login"
    }
    return(
    <nav className="navbar navbar-expand-xl">
        <div className="container h-100">
            <Link className="navbar-brand" to="./">
                <h1 className="tm-site-title mb-0">Product Admin</h1>
            </Link>
            <button className="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars tm-nav-icon"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto h-100">
                    <li className="nav-item">
                        <Link className={"nav-link "+state.home} to="/">
                            <i className="fas fa-tachometer-alt"></i>
                            Dashboard
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">

                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="far fa-file-alt"></i>
                            <span>
                                Reports <i className="fas fa-angle-down"></i>
                            </span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Daily Report</a>
                            <a className="dropdown-item" href="#">Weekly Report</a>
                            <a className="dropdown-item" href="#">Yearly Report</a>
                        </div>
                    </li>
                    <li className="nav-item" >
                        <Link className={"nav-link "+state.product} to="/product">
                            <i className="fas fa-shopping-cart"></i>
                            Products
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className={"nav-link "+state.account} to="/account">
                            <i className="far fa-user"></i>
                            Accounts
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-cog"></i>
                            <span>
                                Settings <i className="fas fa-angle-down"></i>
                            </span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" href="#">Billing</a>
                            <a className="dropdown-item" href="#">Customize</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link onClick={logOut} className="nav-link d-block" to="#">
                            Admin, <b>Logout</b>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}
export default Header