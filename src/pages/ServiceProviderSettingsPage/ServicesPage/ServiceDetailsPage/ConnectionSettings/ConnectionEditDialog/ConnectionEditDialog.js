import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, makeStyles, Typography, IconButton,
    Box, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { addConnectionValidationSchema } from 'store/validation/services';
import Button from "components/CustomButtons/Button.js";
import { Loadable } from 'common';
import BodyFeildArray from './BodyFeildArray';
import { METHOD_GET, METHOD_POST, METHOD_PUT } from 'store/constants/api';
import { ConnectionTestDialog } from '../ConnectionTestDialog';
import ConfirmDialog from './ConfirmDialog';
import { CONNECTION_STATE_DRAFT, CONNECTION_STATE_READY, CONNECTION_STATE_LIVE } from 'store/constants/services';
import { CONNECTION_STATE_ROLLBACK } from 'store/constants/services';

const _ = require("lodash");

const useStyles = makeStyles(theme => ({
    ...formStyle,
    textField: {
        paddingTop: 27
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    testButton: {
        position: 'absolute',
        right: 70,
        top: 6
    },
    modalHeader: {
        display: 'inline'
    }
}));

export default function ConnectionEditDialog(props) {
    const { mode, open, handleClose, initialValues, serviceId, authTypes, feildTemplate, connectionId, bodyTypesList,
        createConnectionPending, copyConnectionPending, authTypesPending, getConnectionPending, updateConnectionStatePending, stateTypesList,
        actions: { listBodyTypes, listAuthTypes, createConnection, listConnections,
            getConnection, resetTestServiceConnection, listStateTypes, updateConnectionState,
            copyConnection
        }
    } = props;

    const [openTestDialog, setOpenTestDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const [isDisabledKey, setisDisabledKey] = useState(false);
    const [alert, setAlert] = useState(false);

    const classes = useStyles();

    let arrayPush = null;

    const bindArrayPush = (push) => {
        arrayPush = push;
    };

    useEffect(() => {
        listAuthTypes();
        listBodyTypes();
        listStateTypes();
    }, [listAuthTypes, listBodyTypes, listStateTypes]);

    useEffect(() => {
        if (connectionId) {
            getConnection(connectionId);
        }
    }, [open, getConnection, connectionId]);

    useEffect(() => {
        setIsEdit(mode === 'edit');
    }, [mode]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCreateCallback = () => {
        listConnections(serviceId);
        handleClose(false);
    }

    const handleBodyType = (type) => {
        const { sys_auth_key } = _.find(authTypes, function (o) {
            return o.sys_auth_type_id === type;
        });
        const feilds = _.map(sys_auth_key, function (o) {
            return {
                ...feildTemplate,
                key: o.key_name,
            };
        })

        if (feilds && feilds.length > 0) {
            feilds.forEach(element => {
                handleAddFeild(element);
            });
            setisDisabledKey(true);
        }
        else {
            handleAddFeild();
            setisDisabledKey(false);
        }
    }

    const handleAddFeild = (feild) => {
        let feildToAdd = feild ? feild : feildTemplate;
        arrayPush({
            ...feildToAdd
        });
    }

    const handleTestDialog = () => {
        setOpenTestDialog(true);
    }

    const handleTestClose = (open) => {
        setOpenTestDialog(open);
        resetTestServiceConnection();
    }

    const isConnectionEditable = (mode, values) => {
        if (mode === 'create' || (mode === 'edit' && values.connection_state === CONNECTION_STATE_DRAFT)) {
            return true;
        }
        return false;
    }

    const isConnectionReady = (mode, values) => {
        if ((mode === 'edit' && values.connection_state === CONNECTION_STATE_READY)) {
            return true;
        }
        return false;
    }

    const isConnectionLive = (mode, values) => {
        if ((mode === 'edit' && values.connection_state === CONNECTION_STATE_LIVE)) {
            return true;
        }
        return false;
    }

    const isConnectionRollBack = (mode, values) => {
        if ((mode === 'edit' && values.connection_state === CONNECTION_STATE_ROLLBACK)) {
            return true;
        }
        return false;
    }

    const showAlertLive = () => {
        setAlert(
            <ConfirmDialog
                open={true}
                handleClose={hideAlert}
                handleConfirm={changeConnectionStateToLive}
                headerText={`Make Live Connection ${connectionId}`}
                bodyText={`Do you want to make Connection Live ?`}
            />
        );
    };

    const showAlertRollback = () => {
        setAlert(
            <ConfirmDialog
                open={true}
                handleClose={hideAlert}
                handleConfirm={changeConnectionStateToRollback}
                headerText={`Rollback Connection ${connectionId}`}
                bodyText={`Do you want to make Connection Rollback ?`}
            />
        );
    };

    const showAlertCopyConnection = () => {
        setAlert(
            <ConfirmDialog
                open={true}
                handleClose={hideAlert}
                handleConfirm={handleCopyConnection}
                headerText={`Copy Connection ${connectionId}`}
                bodyText={`Do you want to copy this Connection ?`}
            />
        );
    };

    const handleCopyConnection = () => {
        copyConnection(connectionId, handleCreateCallback);
        hideAlert();
    };

    const hideAlert = () => {
        setAlert(null);
    };

    const handleConnectionStateCallback = () => {
        listConnections(serviceId);
    };

    const changeConnectionStateToRollback = () => {
        let service_connection_state = stateTypesList.find(x => x.name === CONNECTION_STATE_ROLLBACK);
        const { sys_service_connection_state_id } = service_connection_state;

        let payload = {
            sys_service_connection_state_id: sys_service_connection_state_id,
            cfg_service_connection_id: connectionId
        }

        hideAlert();

        updateConnectionState(payload, handleConnectionStateCallback);
    };

    const changeConnectionStateToLive = () => {
        let service_connection_state = stateTypesList.find(x => x.name === CONNECTION_STATE_LIVE);
        const { sys_service_connection_state_id } = service_connection_state;

        let payload = {
            sys_service_connection_state_id: sys_service_connection_state_id,
            cfg_service_connection_id: connectionId
        }

        hideAlert();

        updateConnectionState(payload, handleConnectionStateCallback);
    };

    return (
        <>
            {alert}
            <ConnectionTestDialog
                open={openTestDialog}
                handleClose={handleTestClose}
                connectionId={connectionId}
                serviceId={serviceId}
            />
            <Dialog fullWidth maxWidth={'md'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Typography className={classes.modalHeader} variant="h6">
                        {mode === 'create' ? 'Add Connection' : 'Connection Details'}
                    </Typography>
                    {mode === 'edit' && (
                        <Typography className={classes.modalHeader} variant="subtitle2">
                            {` (${connectionId} - ${initialValues.connection_state})`}
                        </Typography>
                    )}
                    {mode === 'edit' && (
                        <Button
                            color="info"
                            onClick={showAlertCopyConnection}
                            className={classes.testButton}
                        >
                            Copy Connection
                        </Button>
                    )}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Loadable loading={createConnectionPending || authTypesPending || getConnectionPending || updateConnectionStatePending || copyConnectionPending}>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={initialValues}
                                    validationSchema={addConnectionValidationSchema}
                                    onSubmit={(values, { setStatus, setSubmitting }) => {
                                        const { name } = _.find(authTypes, function (o) {
                                            return o.sys_auth_type_id === values.auth_type_id;
                                        });

                                        let payload = {
                                            json_text: { [`${name}`]: values.feilds },
                                            sys_auth_type_id: values.auth_type_id,
                                            contact_uri: values.contact_uri,
                                            method: values.method,
                                            callback_uri: "",
                                            active: true,
                                            cfg_service_id: values.service_id,
                                            sys_service_connection_body_type_id: values.sys_service_connection_body_type_id,
                                        }

                                        if (mode === 'create') {
                                            createConnection(payload, handleCreateCallback);
                                        }
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        setFieldTouched,
                                        setFieldValue,
                                        isSubmitting
                                    }) => {

                                        const customTypeChange = (e) => {
                                            const { name, value } = e.target;
                                            setFieldValue("feilds", []);//Empty all feilds
                                            handleBodyType(value);
                                            setFieldTouched(name, true, false);
                                            setFieldValue(name, value);
                                        }

                                        return (
                                            <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.container}>
                                                <GridContainer>
                                                    <GridItem md={10}>
                                                        <GridContainer>
                                                            <GridItem md={3}>
                                                                <FormControl
                                                                    fullWidth
                                                                    className={classes.selectFormControl}
                                                                >
                                                                    <InputLabel
                                                                        htmlFor="simple-select"
                                                                        required
                                                                        className={classes.selectLabel}
                                                                    >
                                                                        Method
                                                                    </InputLabel>
                                                                    <Select
                                                                        MenuProps={{
                                                                            className: classes.selectMenu,
                                                                        }}
                                                                        classes={{
                                                                            select: classes.select,
                                                                        }}
                                                                        value={values.method}
                                                                        onChange={handleChange}
                                                                        inputProps={{
                                                                            name: "method",
                                                                            id: "sys_us_state-select",
                                                                            disabled: isEdit,
                                                                        }}
                                                                        error={Boolean(touched.method && errors.method)}
                                                                    >
                                                                        {[METHOD_POST, METHOD_GET, METHOD_PUT].map((name) => (
                                                                            <MenuItem
                                                                                classes={{
                                                                                    root: classes.selectMenuItem,
                                                                                    selected: classes.selectMenuItemSelected,
                                                                                }}
                                                                                value={name}
                                                                            >
                                                                                {name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    <FormHelperText error={true}>
                                                                        {touched.method && errors.method}
                                                                    </FormHelperText>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem md={8}>
                                                                <CustomInput
                                                                    color="primary"
                                                                    labelText="Contact URI"
                                                                    formControlProps={{
                                                                        fullWidth: true,
                                                                        required: true,
                                                                        disabled: isEdit,
                                                                    }}
                                                                    inputProps={{
                                                                        name: "contact_uri",
                                                                        value: values.contact_uri,
                                                                        required: true,
                                                                        className: classes.textField,
                                                                        onChange: handleChange,
                                                                        onBlur: handleBlur,
                                                                    }}
                                                                    error={Boolean(touched.contact_uri && errors.contact_uri)}
                                                                    helperText={touched.contact_uri && errors.contact_uri}
                                                                />
                                                            </GridItem>
                                                        </GridContainer>
                                                    </GridItem>
                                                    <GridItem md={10}>
                                                        <GridContainer>
                                                            <GridItem md={3}>
                                                                <FormControl
                                                                    fullWidth
                                                                    className={classes.selectFormControl}
                                                                >
                                                                    <InputLabel
                                                                        htmlFor="simple-select"
                                                                        required
                                                                        className={classes.selectLabel}
                                                                    >
                                                                        Authorization Type
                                                                    </InputLabel>
                                                                    <Select
                                                                        MenuProps={{
                                                                            className: classes.selectMenu,
                                                                        }}
                                                                        classes={{
                                                                            select: classes.select,
                                                                        }}
                                                                        value={values.auth_type_id}
                                                                        onChange={customTypeChange}
                                                                        inputProps={{
                                                                            name: "auth_type_id",
                                                                            id: "sys_us_state-select",
                                                                            disabled: isEdit,
                                                                        }}
                                                                        error={Boolean(touched.auth_type_id && errors.auth_type_id)}
                                                                    >
                                                                        {authTypes.map(({ name, sys_auth_type_id }) => (
                                                                            <MenuItem
                                                                                classes={{
                                                                                    root: classes.selectMenuItem,
                                                                                    selected: classes.selectMenuItemSelected,
                                                                                }}
                                                                                value={sys_auth_type_id}
                                                                            >
                                                                                {name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    <FormHelperText error={true}>
                                                                        {touched.auth_type_id && errors.auth_type_id}
                                                                    </FormHelperText>
                                                                </FormControl>
                                                            </GridItem>
                                                            {values.auth_type_id && !isDisabledKey &&
                                                                (mode === 'create' || (mode === 'edit' && values.connection_state === 'Draft')) && (
                                                                    <GridItem md={2}>
                                                                        <Box mt={2}>
                                                                            <Button onClick={() => handleAddFeild()} className={classes.button} color="rose">
                                                                                <AddIcon className={classes.icons} /> field
                                                                            </Button>
                                                                        </Box>
                                                                    </GridItem>
                                                                )}
                                                        </GridContainer>
                                                    </GridItem>
                                                    <GridItem md={10}>
                                                        <GridContainer>
                                                            <BodyFeildArray
                                                                mode={mode}
                                                                values={values}
                                                                touched={touched}
                                                                errors={errors}
                                                                handleChange={handleChange}
                                                                handleBlur={handleBlur}
                                                                bindArrayPush={bindArrayPush}
                                                                isDisabledKey={isDisabledKey}
                                                                isEdit={isEdit}
                                                                isConnectionEditable={isConnectionEditable}
                                                            />
                                                        </GridContainer>
                                                    </GridItem>
                                                    <GridItem md={10}>
                                                        <GridContainer>
                                                            <GridItem md={3}>
                                                                <FormControl
                                                                    fullWidth
                                                                    className={classes.selectFormControl}
                                                                >
                                                                    <InputLabel
                                                                        htmlFor="simple-select"
                                                                        required
                                                                        className={classes.selectLabel}
                                                                    >
                                                                        Body
                                                                    </InputLabel>
                                                                    <Select
                                                                        MenuProps={{
                                                                            className: classes.selectMenu,
                                                                        }}
                                                                        classes={{
                                                                            select: classes.select,
                                                                        }}
                                                                        value={values.sys_service_connection_body_type_id}
                                                                        onChange={handleChange}
                                                                        inputProps={{
                                                                            name: "sys_service_connection_body_type_id",
                                                                            id: "sys_us_state-select",
                                                                            disabled: isEdit,
                                                                        }}
                                                                        error={Boolean(touched.sys_service_connection_body_type_id && errors.sys_service_connection_body_type_id)}
                                                                    >
                                                                        {bodyTypesList.map(({ name, sys_service_connection_body_type_id }) => (
                                                                            <MenuItem
                                                                                classes={{
                                                                                    root: classes.selectMenuItem,
                                                                                    selected: classes.selectMenuItemSelected,
                                                                                }}
                                                                                value={sys_service_connection_body_type_id}
                                                                            >
                                                                                {name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    <FormHelperText error={true}>
                                                                        {touched.sys_service_connection_body_type_id && errors.sys_service_connection_body_type_id}
                                                                    </FormHelperText>
                                                                </FormControl>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </GridItem>
                                                    <GridItem md={10}>
                                                        <Box my={2}>
                                                            <GridContainer>
                                                                <GridItem md={10}>
                                                                    {isConnectionEditable(mode, values) && (
                                                                        <>
                                                                            <Button
                                                                                type="submit"
                                                                                disabled={isEdit}
                                                                                color="primary"
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                            {mode === 'edit' && (
                                                                                <Button
                                                                                    onClick={handleIsEdit}
                                                                                    color="transparent"
                                                                                >
                                                                                    <BorderColorIcon /> Edit
                                                                                </Button>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {mode === 'edit' && (
                                                                        <Button
                                                                            onClick={handleTestDialog}
                                                                            color="info"
                                                                        >
                                                                            Test Connection
                                                                        </Button>
                                                                    )}
                                                                    {(isConnectionReady(mode, initialValues) || isConnectionRollBack(mode, initialValues)) && (
                                                                        <Button
                                                                            color="rose"
                                                                            onClick={showAlertLive}
                                                                        >
                                                                            Make Live
                                                                        </Button>
                                                                    )}
                                                                    {isConnectionLive(mode, initialValues) && (
                                                                        <Button
                                                                            color="rose"
                                                                            onClick={showAlertRollback}
                                                                        >
                                                                            RollBack
                                                                        </Button>
                                                                    )}
                                                                </GridItem>
                                                            </GridContainer>
                                                        </Box>
                                                    </GridItem>
                                                </GridContainer>
                                            </form>
                                        )
                                    }}
                                </Formik>
                            </GridItem>
                        </GridContainer>
                    </Loadable>
                </DialogContent>
            </Dialog>
        </>
    )
}