import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useEffect, useState } from 'react';
import { LOGOUT, RESET_ERROR, SET_DATABASE, CLEAR_DATABASE } from "../helpers/Actions";
import { Container } from "react-bootstrap";
import { API_URL } from "../helpers/Constants";
import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import oracleImage from "assets/img/bg_oracle.jpg";
import postgreImage from "assets/img/bg_postgre.jpg";
import mysqlImage from "assets/img/bg_mysql.jpg";
import sqlserverImage from "assets/img/bg_sqlserver.jpg";
import TextField from '@material-ui/core/TextField';

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { CircularProgress } from "@material-ui/core";

const mapImages = [
  postgreImage,
  // sqlserverImage,
  mysqlImage,
  oracleImage
]

const darkenBackground = {
  backgroundColor: "#000000",
  opacity: 0.8
};

const useStyles = makeStyles(styles);

const Connections = (props) => {
  const { auth, dispatch } = useAuth();
  const history = useHistory();
  const [connections, setConnections] = useState(null);
  const classes = useStyles();
  // Map for password
  const [passwords, setPasswords] = useState(new Map());

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
        //Remove the now deleted connection from cache
        setConnections(connections => connections.filter(connection => connection.connectionId !== connectionId))
        return;
      })
  }


  const Connect = (connectionId, password) => {
    // dispatch({type: CLEAR_DATABASE})
    let error = false;
    const REST_API_URL = API_URL + "/user/connections/connect";
    if(password == null){
      alert("Could not connect to database")
          return;
    }
    fetch(REST_API_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      },
      body: JSON.stringify({connectionId: connectionId, password: password})
    })
      .then(response => {
        if (!response.ok) {
          error = true
        }
        return response;
      }).then(response => response.json())
      .then(response => {
        if (error) {
          alert(response.message || "Could not connect to database")
          return;
        }

        dispatch({
          type: SET_DATABASE,
          tables: response.tables,
          host: response.host,
          database: response.database,
          username: response.username,
          connectionId: connectionId,
          databasePassword: password
        })
        history.push("/user/database")
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
        text-light
        display-1
        main-text">
          <CircularProgress />
        </div>
        :

        <Container className="align-content-center">
          <Link to="/user/connections/add">
            {/* <div className="card text-center rounded-lg shadow-sm bg-light text-mylightblack">
              <div className="card-header">
                  <h5 className="card-title">Add Connection</h5>
              </div>
              <div className="card-body text-light" style={{ fontSize: "8.25em"}}>
                  +
              <div className={classes.background} style={{ backgroundImage: "url(" + bgImage + ")", opacity: 0.8}}>
                  <p className="card-text"></p>
              </div>
              </div>
          </div> */}
            <Card className={classes.root} style={{ marginBottom: 4 }}>
              <CardActionArea>
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    Add Connection
                    </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>

          {
            connections.map((connection, index) => {
              return (
                <Card
                  key={index}
                  className={`${classes.root} text-light no-round`}
                  style={{
                    backgroundImage: "url(" + mapImages[connection.sqlPlatformId - 1] + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "right"
                  }}>
                  <div style={{}}>
                    <CardActionArea>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="h2">
                          {connection.host}: {connection.database}
                        </Typography>
                        <Typography variant="body1" component="p">
                          Host: {connection.host}
                          <br />
                          Database: {connection.database}<br />
                          Username: {connection.username}<br />
                          Port: {connection.port}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <TextField
                          label="Password"
                          variant="filled"
                          name={connection.connectionId + "Password"}
                          value={passwords.get(connection.connectionId)}
                          onChange={event => 
                            setPasswords(prev => new Map([...prev, [connection.connectionId, event.target.value]])
                          )}
                        ></TextField>
                      <Button size="medium" variant="contained" onClick={(event) => {
                        Connect(connection.connectionId, passwords.get(connection.connectionId));
                      }
                      } >
                        Connect
                              </Button>
                      <Button size="small" variant="contained" onClick={(event) =>
                        DeleteConnection(connection.connectionId)}>
                        Delete
                              </Button>
                    </CardActions>
                  </div>
                </Card>
              );
            })
          }
        </Container>}
    </>
  );
}

export default Connections;