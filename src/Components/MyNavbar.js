import { Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { LOGOUT } from "../helpers/Actions";

import logo from '../pictures/logo-1-71x71.png';

function MyNavbar() {
    const { auth, dispatch } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent navbar-custom">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}

            <Link to="/">
                <img src={logo} width="40" height="40" alt="" />
            </Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                        <Link to="/" className="nav-link text-myblue">Home</Link>
                    </li>
                </ul>
            </div>
            <div className="btn-group">
                {
                    auth.isLoggedIn === false ?
                        <div>
                            <Link to="/login">
                                <button className="pull-right btn btn-lg btn-mylightblack text-myblue">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="pull-right btn btn-lg btn-mylightblack text-myblue">Sign Up</button>
                            </Link>
                        </div>
                        :
                        <div>
                            <Link to="/">
                                <button
                                    className="pull-right btn btn-lg btn-mylightblack text-myblue"
                                    onClick={() => dispatch({type: LOGOUT})}
                                >
                                    Logout
                                </button>
                            </Link>
                        </div>
                }
                {/* <Link to="/login">
                    <button className="pull-right btn btn-lg btn-mylightblack text-myblue">Login</button>
                </Link> */}

            </div>
        </nav>
    );
}

export default MyNavbar;