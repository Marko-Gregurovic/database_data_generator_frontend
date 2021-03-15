import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useEffect, useState } from 'react';
import { LOGOUT } from "../helpers/Actions";


const Connections = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    const [connections, setConnections] = useState([]);


    let RequestConnections = {
        token: auth.token
    };

    useEffect(() => {
        let error;
        const REST_API_URL = "https://localhost:44324/user/connections";
        fetch(REST_API_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    error = true
                }
                return response;
            }).then(response => response.json())
            .then(response => {
                if (error) {
                    dispatch({ type: LOGOUT, isError: true, message: response.message });
                    alert("Invalid token. Logging you out.")
                    return;
                }

                setConnections(response);
                return;
            })
    }, []);

    return (
        <div className="main-text">
            <div className="container card-columns">
                <Link to="/user/connections/add">
                    <div className="card text-center rounded-lg shadow-sm bg-myblue text-mylightblack">
                        <div className="card-header">
                            <h5 className="card-title">Add Connection</h5>
                        </div>
                        <div className="card-body bg-mylightblack text-myblue" style={{fontSize: "6em"}}>
                            <p className="card-text">+</p>
                        </div>
                    </div>
                </Link>

                {
                    connections.map(connection => {
                        return (
                            <Link to="/">
                                <div className="card text-center rounded-lg shadow-sm bg-myblue text-mylightblack">
                                    <div className="card-header">
                                        <h5 className="card-title">{connection.database}</h5>
                                    </div>
                                    <div className="card-body bg-mylightblack text-myblue">
                                        <p className="card-text">Host: {connection.host}</p>
                                        <p className="card-text">Database: {connection.database}</p>
                                        <p className="card-text">User: {connection.username}</p>
                                        <p className="card-text">SQL platform: {connection.sqlPlatform}</p>
                                    </div>
                                </div>
                            </Link>

                        );
                    })
                }
            </div>
        </div>
    );
}

export default Connections;