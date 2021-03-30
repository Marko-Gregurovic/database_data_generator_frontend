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
    // maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
}

const TableForm = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    let error = false

    let table = props.table
    let stereotypes = props.stereotypes;

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
                        <h2 className="p-4">{table.name}</h2>
                        <Form className="form-container mt-4">
                            {table.databaseColumns.map(column => {
                                return (
                                    <div className="d-flex justify-content-between" >
                                        <div className="form-group">
                                            {column.name}
                                        </div>
                                        <div className="form-group">
                                            {column.stereotypeName}
                                        </div>
                                        <div className="form-group">
                                            <Field type="string" name="username" placeholder="Username" className="form-control" />
                                            <ErrorMessage name="username" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="password" name="password" placeholder="Password" className="form-control" />
                                            <ErrorMessage name="password" component="div" />
                                        </div>

                                        <div className="form-group">
                                            <Field name="sqlPlatformId" as="select" className="form-control" >

                                                {
                                                    stereotypes.map(stereotype => <option value={stereotype.generationModeId} key={stereotype.generationModeId}>{stereotype.name}</option>)
                                                }
                                            </Field>
                                        </div>
                                        {
                                            auth.isError !== null && auth.message != null &&
                                            <div className="alert alert-primary bg-mygray text-mylightblack" role="alert">
                                                {auth.message}
                                            </div>
                                        }
                                    </div>
                                );
                                })
                            }

                                        <button type="submit" className="pull-right btn btn-lg btn-light text-mylightblack mt-4">
                                            Save Connection
                        </button>
                        </Form>
                    </div>
                </div>
            </Formik >


                <div>
                    Columns in {table.name}:
        {table.databaseColumns.map(column => {
                    return (
                        <div>
                            {column.name} {column.type} {column.isPrimary === true && <>primary key</>}
                            {column.isForeign && <>is foreign key for column {column.foreignColumnName} in table {column.foreignTableName}</>}
                        </div>);
                })}
                </div>


        </div>
    );
}

export default TableForm;