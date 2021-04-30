import { Field, Form, withFormik, Formik, ErrorMessage, useFormikContext } from 'formik';
import Select from 'react-select'
import * as Yup from 'yup';
import { useAuth } from '../context/auth';
import { LOGIN, LOGIN_ERROR, SAVE_TABLE_STATE } from '../helpers/Actions';
import { Redirect, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { boolean } from 'yup';
import { API_URL } from '../helpers/Constants';
import { instanceOf } from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import { ContactSupportRounded, Height } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import black from '@material-ui/core/colors/';


const validationSchema = Yup.object().shape({

})

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#000000",
      },
    },
  });

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));


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

    // add number of columns to generate
    initialValues = {
        ...initialValues,
        numberOfColumnsToGenerate: props.table.numberOfColumnsToGenerate
    };


    return (initialValues);
}

const processFormValues = (props, formValues) => {
    let table = props.table;
    let columns = table.databaseColumns;

    //process data
    for(let key in formValues){
        let test;

        // process generation modes
        test = key.match(".*GenerationModeId");
        if(test){
            let columnName = key.substr(0, key.indexOf('GenerationModeId'));
            let generationModeId = formValues[key];
            
            let correspondingColumn = columns.find(column => column.name === columnName);
            correspondingColumn.generationModeId = generationModeId;
            continue;
        }

        // process min number
        test = key.match(".*MinNumber");
        if(test){
            let columnName = key.substr(0, key.indexOf('MinNumber'));
            let minNumber = formValues[key];

            let correspondingColumn = columns.find(column => column.name === columnName);
            correspondingColumn.minNumber = minNumber;
            continue;
        }

        // process max number
        test = key.match(".*MaxNumber");
        if(test){
            let columnName = key.substr(0, key.indexOf('MaxNumber'));
            let maxNumber = formValues[key];

            let correspondingColumn = columns.find(column => column.name === columnName);
            correspondingColumn.maxNumber = maxNumber;
            continue;
        }

        // process number of columns to generate
        test = key.match("numberOfColumnsToGenerate");
        if(test){
            table.numberOfColumnsToGenerate = parseInt(formValues.numberOfColumnsToGenerate);
            continue;
        }

    }

}

const setGenerationModesAsInts = (table) => {
    let columns = table.databaseColumns;
    for(let column of columns){
        if(typeof column.generationModeId === "string" || column.generationModeId instanceof String){
            column.generationModeId = parseInt(column.generationModeId);
        }
    }
}

const TableForm = (props) => {
    // const processFormValues = (props, formValues) => {
    //     let table = props.table;
    //     let columns = table.databaseColumns;
    
    //     //process data
    //     for(let key in formValues){
    //         let test;
    
    //         // process generation modes
    //         test = key.match(".*GenerationModeId")
    //         if(test){
    //             let columnName = key.substr(0, key.indexOf('G'));
    //             let generationModeId = formValues[key];
                
    //             let correspondingColumn = columns.find(column => column.name === columnName);
    //             correspondingColumn.generationModeId = generationModeId;
    //             continue;
    //         }
    
    //         // process number of columns to generate
    //         table.numberOfColumnsToGenerate = formValues.numberOfColumnsToGenerate;
    //     }
    
    // }

    const classes = useStyles();
    const { auth, dispatch } = useAuth();

    
    // Reference to get form values
    // const formRef = useRef();
    
    // const {values} = formRef ?? {};

    // useEffect(() => {
    //     console.log(values);
    // }, [values]);

    const history = useHistory();
    let error = false;
    let table = props.table;

    // useEffect(() => {
    //     return () => {
    //         processFormValues(props, formRef.current.values);
    //         dispatch({type: SAVE_TABLE_STATE, tableName: table.name, table: table});

    //     }
    // }, []);
    
    stereotypes = props.stereotypes;
    return (
        <div
            className="main-text">
            <ThemeProvider theme={theme}>
            <Formik
                initialValues={getInitialValues(props)}
                // innerRef={formRef}
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
                                alert(response.message)
                                return;
                            }
                            alert(response.message)
                            return;
                        });
                }}
                validationSchema={validationSchema}
            >
                {formikProps => (

                
                <form className="form-container mt-4" onSubmit={formikProps.handleSubmit}>
                    {/* <Field type="number" name="numberOfColumnsToGenerate" className="form-control" />
                    <ErrorMessage name="username" component="div" /> */}
                    <TextField
                        name="numberOfColumnsToGenerate"
                        label="Number of columns to generate"
                        value={formikProps.values.numberOfColumnsToGenerate}
                        onChange={formikProps.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        
                        {table.databaseColumns.map(column => {
                            console.log(column)
                            return (
                                <>
                                <div style={{width:"100%", height: "2px"}} className="bg-primary mb-2 mt-2"></div>
                                <Grid container item xs={12} spacing={3}>
                                    <React.Fragment>
                                        <Grid item xs={2}>
                                            {/* <Paper className={classes.paper}>
                                                {column.name}
                                            </Paper> */}
                                            <TextField
                                                label="Column name"
                                                value={column.name}
                                                variant="filled"
                                                fullWidth
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                        <TextField
                                                label="Stereotype"
                                                value={column.stereotypeName}
                                                variant="filled"
                                                fullWidth
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                id="standard-select-currency"
                                                name={column.name + "GenerationModeId"}
                                                select
                                                label="Generation mode"
                                                onChange={formikProps.handleChange}
                                                variant="outlined"
                                                value={formikProps.values[column.name  + "GenerationModeId"]}
                                                fullWidth
                                                >
                                                {getGenerationModesForStereotypeId(column.stereotypeId).map((gm) => (
                                                    <MenuItem key={gm.generationModeId} value={parseInt(gm.generationModeId)}>
                                                        {gm.name}
                                                    </MenuItem>
                                                ))}
                                                </TextField>
                                        </Grid>
                                        {    column.stereotypeName === "int" && 
                                            <>
                                            <Grid item xs={2}>
                                                <TextField
                                                name={column.name + "MinNumber"}
                                                label="Min Value"
                                                defaultValue={column.minNumber}
                                                variant="outlined"
                                                fullWidth
                                                onChange={formikProps.handleChange}
                                                InputLabelProps={{ shrink: true }}  
                                                 ></TextField>
                                            </Grid>

                                            <Grid item xs={2}>
                                                <TextField
                                                name={column.name + "MaxNumber"}
                                                label="Max Value"
                                                defaultValue={column.maxNumber}
                                                variant="outlined"
                                                fullWidth
                                                onChange={formikProps.handleChange}
                                                InputLabelProps={{ shrink: true }} 
                                                ></TextField>
                                             </Grid>
                                             </>
                                        }
                                    </React.Fragment>
                                </Grid>
                                </>
                            );})
                        }
                    </Grid>
                </div>
                <Button variant="outlined" size="large" className="mt-2" type="sumbit">Save Table</Button>
                </form>
                )}
            </Formik >
            </ThemeProvider>
        </div>
    );
}

export default TableForm;