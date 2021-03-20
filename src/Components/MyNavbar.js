import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { LOGOUT, RESET_ERROR } from "../helpers/Actions";

import logo from 'assets/img/logo.png';

function MyNavbar() {
    const { auth, dispatch } = useAuth();
    const history = useHistory();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent navbar-custom">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}

            <Link to="/">
                <img src={logo} width="40" height="40" alt="" />
            </Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    </li>
                </ul>
            </div>
            <div className="btn-group btn-group-lg" role="group">
                {
                    auth.isLoggedIn === false ?
                        <div className="btn-group btn-group-lg">

                            <button
                                className="pull-right btn btn-mylightblack text-light"
                                onClick={() => {
                                    history.push('/login');
                                    dispatch({ type: RESET_ERROR });
                                }}
                            >
                                Login
                            </button>

                            <button
                                className="pull-right btn btn-mylightblack text-light"
                                onClick={() => {
                                    history.push('/signup');
                                    dispatch({ type: RESET_ERROR });
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                        :
                        <div className="btn-group btn-group-lg">
                            <button
                                className="pull-right btn btn-purple text-light"
                                onClick={() => { history.push('/user/connections') }}
                            >
                                Connections
                            </button>
                            <button
                                className="pull-right btn btn-mylightblack text-light"
                                onClick={() => { dispatch({ type: LOGOUT }); history.push('/') }}
                            >
                                Logout
                            </button>
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