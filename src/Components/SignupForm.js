import { Field, Form, withFormik, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/auth';
import { LOGIN, SIGNUP_ERROR } from '../helpers/Actions';
import { Redirect, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL } from '../helpers/Constants';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(64, "Maximum username length is 500")
        .required('Username is required'),
    password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .max(64, "Maximum password length is 64")
        .required('Password is required')
})

const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
}

const SignupForm = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    let error = false;

    useEffect(() => {
        if (auth.isLoggedIn)
            history.push("/database")
    }, [auth.isLoggedIn]);

    if (auth.isLoggedIn) {
        return <Redirect to="/database"></Redirect>
    }

    return (
        <div
            className="main-text">

            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    const REST_API_URL = API_URL + "/register";
                    fetch(REST_API_URL, {
                        method: 'post',
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (!response.ok) 
                        {
                            error = true
                        }
                        
                        return response;
                    }).then(response => response.json())
                    .then(response => {
                        if(error) {
                            dispatch({ type: SIGNUP_ERROR, isError: true, message: response.message });
                            return;
                        }

                        dispatch({ type: LOGIN, token: response.token });
                        return;
                    });
            }}
                validationSchema={validationSchema}
            >
                <div className="container">
                    <div className="login-wrapper bg-mylightblack text-myblue" style={loginPageStyle}>
                        <h2>Sign Up</h2>
                        <Form className="form-container">
                            <div className="form-group">
                                <Field id="username" type="string" name="username" placeholder="Username" className="form-control" />
                                <ErrorMessage name="username" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="string" name="email" placeholder="Email" className="form-control" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="password" name="password" placeholder="Password" className="form-control" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            {
                                auth.isError !== null && auth.message != null &&
                                <div className="alert alert-primary bg-mygray text-mylightblack" role="alert">
                                    {auth.message}
                                </div>
                            }
                            <button type="submit" className="pull-right btn btn-lg btn-myblue text-mylightblack">
                                CREATE ACCOUNT
                        </button>
                        </Form>
                    </div>
                </div>
            </Formik >
        </div>
    );
}

export default SignupForm;