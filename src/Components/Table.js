import { Field, Form, withFormik, Formik, ErrorMessage } from 'formik';
import Select from 'react-select'
import * as Yup from 'yup';
import { useAuth } from '../context/auth';
import { LOGIN, LOGIN_ERROR, SAVE_TABLE_STATE } from '../helpers/Actions';
import { Redirect, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { boolean } from 'yup';
import { API_URL } from '../helpers/Constants';
import { instanceOf } from 'prop-types';

const validationSchema = Yup.object().shape({

})



const loginPageStyle = {
    margin: "32px auto 37px",
    // maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
}

let stereotypes;

const getGenerationModesForStereotypeId = (stereotypeId) => {
    let values = stereotypes.filter(stereo => stereo.stereotypeId === stereotypeId);
    let modes = values[0].generationModes;
    return modes;
}

const getInitialValues = (props) => {

    // for every column
    let columns = props.table.databaseColumns;
    console.log(columns);
    let initialValues = {};
    for(let column of columns) {
        // get generation mode, if no generation mode is specified select first one from appropriate stereotype
        let generationModeId = column.generationModeId;
        if(generationModeId === null){
            generationModeId = getGenerationModesForStereotypeId(column.stereotypeId)[0].generationModeId;
        }
        initialValues = {
            ...initialValues,
            [column.name + "GenerationModeId"]: generationModeId
        };
    }
    return (initialValues);
}

const processFormValues = (props, formValues) => {
    let table = props.table;
    let columns = table.databaseColumns;
    console.log(props.table)
    console.log(columns)
    console.log(formValues)

    //process generation modes
    for(let key in formValues){
        let columnName = key.substr(0, key.indexOf('G'));
        let generationModeId = formValues[key];
        
        let correspondingColumn = columns.find(column => column.name === columnName);
        correspondingColumn.generationModeId = generationModeId;
        console.log(correspondingColumn)
    }
}

const setGenerationModesAsInts = (table) => {
    console.log(table);
    let columns = table.databaseColumns;
    console.log(columns)
    for(let column of columns){
        console.log(column)
        if(typeof column.generationModeId === "string" || column.generationModeId instanceof String){
            column.generationModeId = parseInt(column.generationModeId);
        }
    }
}

const TableForm = (props) => {
    const { auth, dispatch } = useAuth();
    const history = useHistory();
    let error = false;
    let table = props.table;
    stereotypes = props.stereotypes;
    console.log(auth);
    console.log(table)
    return (
        <div
            className="main-text">

            <Formik
                initialValues={getInitialValues(props)}
                onSubmit={(values, { setSubmitting }) => {
                    processFormValues(props, values)
                    setGenerationModesAsInts(table);
                    dispatch({type: SAVE_TABLE_STATE, tableName: table.name, table: table});
                    const REST_API_URL = API_URL + "/user/connections/save";
                    fetch(REST_API_URL, {
                        method: 'post',
                        body: JSON.stringify({
                            tables: auth.tables,
                            connectionId: auth.connectionId,
                            database: auth.database
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
                                        {/* <div className="form-group">
                                            <Field type="string" name={column.name + "Num"} placeholder="Username" className="form-control" />
                                            <ErrorMessage name="username" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="password" name="password" placeholder="Password" className="form-control" />
                                            <ErrorMessage name="password" component="div" />
                                        </div> */}

                                        <div className="form-group">
                                            <Field name={column.name + "GenerationModeId"} as="select" className="form-control" >
                                                {
                                                    // console.log(column)
                                                }
                                                {
                                                    getGenerationModesForStereotypeId(column.stereotypeId).map(gm => <option value={parseInt(gm.generationModeId)} key={gm.generationModeId}>{gm.name}</option>)
                                                    // <option value={platform.sqlPlatformId} key={platform.sqlPlatformId}>{platform.name}</option>
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
                                            Save Table
                        </button>
                        </Form>
                    </div>
                </div>
            </Formik >


                {/* <div>
                    Columns in {table.name}:
        {table.databaseColumns.map(column => {
                    return (
                        <div>
                            {column.name} {column.type} {column.isPrimary === true && <>primary key</>}
                            {column.isForeign && <>is foreign key for column {column.foreignColumnName} in table {column.foreignTableName}</>}
                        </div>);
                })}
                </div> */}


        </div>
    );
}

export default TableForm;