import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useEffect, useState } from 'react';
import { LOGOUT, RESET_ERROR } from "../helpers/Actions";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { API_URL } from "../helpers/Constants";



const Connections = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    const [connections, setConnections] = useState(null);


    let RequestConnections = {
        token: auth.token
    };

    const DeleteConnection = (connectionId) => {
        let error = false;
        const REST_API_URL = API_URL + "/user/connections/delete";
        fetch(REST_API_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            },
            body: connectionId
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
                setConnections(connections => connections.filter(connection => connection.connectionId !== connectionId))
                return;
            })
    }

    useEffect(() => {
        dispatch({ type: RESET_ERROR });
        let error = false;
        const REST_API_URL = API_URL + "/user/connections";
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
        <>
            {connections == null ?
                <div
                    className="container 
                   d-flex
                   align-items-center
                   justify-content-center
                   text-myblue
                   display-1
                   main-text">
                    Loading...
                </div>
                :

                <Container fluid className=" flex-grow-1 align-content-center card-columns">
                    <Link to="/user/connections/add">
                        <div className="card text-center rounded-lg shadow-sm bg-myblue text-mylightblack">
                            <div className="card-header">
                                <h5 className="card-title">Add Connection</h5>
                            </div>
                            <div className="card-body bg-mylightblack text-myblue" style={{ fontSize: "8.25em" }}>
                                <p className="card-text">+</p>
                            </div>
                        </div>
                    </Link>

                    {
                        connections.map(connection => {
                            return (
                                <div className="card text-center rounded-lg shadow-sm bg-myblue text-mylightblack" key={connection.connectionId}>
                                    <div className="card-header">
                                        <h5 className="card-title">{connection.host}: {connection.database}</h5>
                                    </div>
                                    <div className="card-body bg-mylightblack text-myblue">
                                        <p className="card-text">Host: {connection.host}</p>
                                        <p className="card-text">Database: {connection.database}</p>
                                        <p className="card-text">User: {connection.username}</p>
                                        <p className="card-text">SQL platform: {connection.sqlPlatform}</p>
                                        <ButtonGroup>

                                            <Button className="bg-danger" onClick={(event) =>
                                                DeleteConnection(connection.connectionId)}
                                            >Delete</Button>
                                            <Button className="bg-myblue text-mylightblack">Connect</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>

                            );
                        })
                    }
                </Container>}
        </>
    );
}

export default Connections;