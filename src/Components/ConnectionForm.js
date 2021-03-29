import { Field, Form, withFormik, Formik, ErrorMessage } from 'formik';
import Select from 'react-select'
import * as Yup from 'yup';
import { useAuth } from '../context/auth';
import { LOGIN, LOGIN_ERROR } from '../helpers/Actions';
import { Redirect, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { boolean } from 'yup';
import { API_URL } from '../helpers/Constants';

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required'),
    host: Yup.string()
        .required('Host is required'),
    database: Yup.string()
        .required('Database is required'),
    
})

const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
}

const ConnectionForm = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    let error = false
    const [sqlPlatforms, setSqlPlatforms] = useState([]);



    useEffect(() => {
        fetch(API_URL + "/connection/sqlPlatforms", {
            method: 'get',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        }).then(response => response.json())
            .then(response => {
                setSqlPlatforms(response.platforms);
            });
    }, []);
    if (!auth.isLoggedIn) {
        return <Redirect to="/login"></Redirect>
    }

    return (
        <div
            className="main-text">

            <Formik
                initialValues={{ host: "", database: "", username: "", password: "", sqlPlatformId: "1" }}
                onSubmit={(values, { setSubmitting }) => {
                    const REST_API_URL = API_URL + "/user/connections/add";
                    fetch(REST_API_URL, {
                        method: 'post',
                        body: JSON.stringify({
                            ...values,
                            token: auth.token
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + auth.token
                        }
                    }).then(response => {
                        if (!response.ok) {
                            error = true
                        }

                        return response;
                    })
                        .then(response => response.json())
                        .then(response => {
                            if (response.error)
                                error = true;

                            if (error) {
                                dispatch({ type: LOGIN_ERROR, isError: true, message: response.message });
                                return;
                            }

                            history.push("/user/connections")
                            return;
                        });
                }}
                validationSchema={validationSchema}
            >
                <div className="container">
                    <div className="login-wrapper bg-mylightblack text-light" style={loginPageStyle}>
                        <h2>New Connection</h2>
                        <Form className="form-container">
                            <div className="form-group">
                                <Field type="string" name="host" placeholder="Host" className="form-control" />
                                <ErrorMessage name="host" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="string" name="database" placeholder="Database" className="form-control" />
                                <ErrorMessage name="database" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="string" name="username" placeholder="Username" className="form-control" />
                                <ErrorMessage name="username" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="password" name="password" placeholder="Password" className="form-control" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            {/* <div className="form-group">
                                <Select name="sqlPlatforms" defaultValue={sqlPlatforms[0]} options={sqlPlatforms} className="text-dark" />
                            </div> */}
                            <div className="form-group">
                            <Field name="sqlPlatformId" as="select" className="form-control" >
                            
                                {
                                    sqlPlatforms.map(platform => <option value={platform.sqlPlatformId} key={platform.sqlPlatformId}>{platform.name}</option>)
                                }
                            </Field>
                            </div>
                            {
                                auth.isError !== null && auth.message != null &&
                                <div className="alert alert-primary bg-mygray text-mylightblack" role="alert">
                                    {auth.message}
                                </div>
                            }
                            <button type="submit" className="pull-right btn btn-lg btn-light text-mylightblack">
                                Save Connection
                        </button>
                        </Form>
                    </div>
                </div>
            </Formik >
        </div>
    );
}

export default ConnectionForm;