import { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const Header = () => {
    const location = useLocation()
    const [ openNav, setOpenNav ] = useState(false);
    const [state, setState] = useState({home: "", account: "", product: "", category: ""})
    useEffect(() => {
        if(location.pathname === "/account")
            setState({home: "", account: "active", product: "", category: ""})
        else if(location.pathname === "/product") 
            setState({home: "", account: "", product: "active", category: ""})
        else if(location.pathname === "/category") 
            setState({home: "", account: "", product: "", category: "active"})
        else setState({home: "active", account: "", product: "", category: ""})
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
                <h1 className="tm-site-title mb-0">Admin</h1>
            </Link>
            <button onClick={() => { setOpenNav(!openNav)}} className="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars tm-nav-icon"></i>
            </button>

            <div className={"collapse navbar-collapse " +(openNav && "show")} id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto h-100">
                    <li className="nav-item">
                        <Link className={"nav-link "+state.home} to="/">
                            <i className="fas fa-tachometer-alt"></i>
                            Trang chủ
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item" >
                        <Link className={"nav-link "+state.product} to="/product">
                            <i className="fas fa-shopping-cart"></i>
                            Sản phẩm
                        </Link>
                    </li>
                    <li className="nav-item" >
                        <Link className={"nav-link "+state.category} to="/category">
                            <i className="fas fa-shopping-cart"></i>
                            Danh mục
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link "+state.account} to="/account">
                            <i className="far fa-user"></i>
                            Tài khoản
                        </Link>
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