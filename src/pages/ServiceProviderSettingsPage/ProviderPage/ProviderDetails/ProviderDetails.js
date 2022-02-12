import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box, FormControl, InputLabel, Select, MenuItem, FormHelperText,
    Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { providerValidationSchema } from 'store/validation/providers';
import { Loadable, TextMaskCustom } from "common";

import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { primaryColor } from "assets/jss/material-dashboard-pro-react.js";
import { unpackUSFormat } from 'util/phone';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => {
    return {
        ...formStyle,
        textField: {
            paddingTop: 27
        },
        button: {
            border: 1,
            borderColor: primaryColor[0],
            borderStyle: 'solid',
            color: primaryColor[0],
        }
    }
});

export default function ProviderDetails(props) {
    const { mode, initialValues, states, providerId,
        providerStatesGetPending, providerGetPending, providerCreatePending, providerUpdatePending,
        actions: { providerGet, listStates, providerCreate, providerUpdate }
    } = props;

    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    useEffect(() => {
        listStates();
    }, [listStates]);

    useEffect(() => {
        if (mode === 'edit') {
            providerGet(providerId);
        }
    }, [mode, providerGet, providerId]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCreateCallback = () => {
        props.history.push(`/admin/providers`);
    }

    const handleUpdateCallback = () => {
        setIsEdit(true);
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <Loadable loading={providerStatesGetPending || providerGetPending || providerCreatePending || providerUpdatePending}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success">
                    successfuly Updated!
                </Alert>
            </Snackbar>

            <GridContainer>
                <GridItem xs={12}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={providerValidationSchema}
                        onSubmit={(values, { setStatus, setSubmitting }) => {
                            let payload = {
                                legal_entity_name: values.legal_entity_name,
                                legal_entity_nickname: values.legal_entity_nickname,
                                legal_entity_address_1: values.legal_entity_address_1,
                                legal_entity_address_2: values.legal_entity_address_2,
                                legal_entity_zip: values.legal_entity_zip,
                                legal_entity_phone: unpackUSFormat(values.legal_entity_phone),
                                sys_us_state_id: values.sys_us_state_id,

                                is_source_provider: values.is_source_provider,
                                is_service_provider: values.is_service_provider,
                                active: values.active,
                            }

                            if (mode === 'create') {
                                payload = {
                                    ...payload,
                                    is_source_provider: false,
                                    is_service_provider: false,
                                    active: true,
                                }
                                providerCreate(payload, handleCreateCallback);
                            }
                            else {
                                payload = {
                                    ...payload,
                                    cfg_provider_id: values.cfg_provider_id,
                                    created_at: values.created_at
                                }
                                providerUpdate(payload, handleUpdateCallback);
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
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.container}>
                                <GridContainer>
                                    <GridItem md={10}>
                                        <GridContainer>
                                            <GridItem md={4}>
                                                <CustomInput
                                                    color="primary"
                                                    labelText="Legal Entity"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        required: true,
                                                        disabled: isEdit,
                                                    }}
                                                    inputProps={{
                                                        name: "legal_entity_name",
                                                        value: values.legal_entity_name,
                                                        required: true,
                                                        className: classes.textField,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                    }}
                                                    error={Boolean(touched.legal_entity_name && errors.legal_entity_name)}
                                                    helperText={touched.legal_entity_name && errors.legal_entity_name}
                                                />
                                            </GridItem>
                                            <GridItem md={4}>
                                                <CustomInput
                                                    color="primary"
                                                    labelText="Nick Name"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        //required: true,
                                                        disabled: isEdit,
                                                    }}
                                                    inputProps={{
                                                        name: "legal_entity_nickname",
                                                        value: values.legal_entity_nickname,
                                                        required: true,
                                                        className: classes.textField,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                    }}
                                                    error={Boolean(touched.legal_entity_nickname && errors.legal_entity_nickname)}
                                                    helperText={touched.legal_entity_nickname && errors.legal_entity_nickname}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem md={10}>
                                        <GridContainer>
                                            <GridItem md={4}>
                                                <CustomInput
                                                    color="primary"
                                                    labelText="Address Line 1"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        required: true,
                                                        disabled: isEdit,
                                                    }}
                                                    inputProps={{
                                                        name: "legal_entity_address_1",
                                                        value: values.legal_entity_address_1,
                                                        required: true,
                                                        className: classes.textField,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                    }}
                                                    error={Boolean(touched.legal_entity_address_1 && errors.legal_entity_address_1)}
                                                    helperText={touched.legal_entity_address_1 && errors.legal_entity_address_1}
                                                />
                                            </GridItem>
                                            <GridItem md={4}>
                                                <CustomInput
                                                    color="primary"
                                                    labelText="Address Line 2"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        //required: true,
                                                        disabled: isEdit,
                                                        //disabled:true
                                                    }}
                                                    inputProps={{
                                                        name: "legal_entity_address_2",
                                                        value: values.legal_entity_address_2,
                                                        required: true,
                                                        className: classes.textField,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                    }}
                                                    error={Boolean(touched.legal_entity_address_2 && errors.legal_entity_address_2)}
                                                    helperText={touched.legal_entity_address_2 && errors.legal_entity_address_2}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem md={10}>
                                        <GridContainer>
                                            <GridItem md={4}>
                                                <FormControl
                                                    fullWidth
                                                    className={classes.selectFormControl}
                                                >
                                                    <InputLabel
                                                        htmlFor="simple-select"
                                                        required
                                                        className={classes.selectLabel}
                                                    >
                                                        Choose State
                                                    </InputLabel>
                                                    <Select
                                                        MenuProps={{
                                                            className: classes.selectMenu,
                                                        }}
                                                        classes={{
                                                            select: classes.select,
                                                        }}
                                                        value={values.sys_us_state_id}
                                                        onChange={handleChange}
                                                        inputProps={{
                                                            name: "sys_us_state_id",
                                                            id: "sys_us_state-select",
                                                            disabled: isEdit,
                                                        }}
                                                        error={Boolean(touched.sys_us_state_id && errors.sys_us_state_id)}
                                                    >
                                                        {states.map(({ state_abbreviation, sys_us_state_id }) => (
                                                            <MenuItem
                                                                classes={{
                                                                    root: classes.selectMenuItem,
                                                                    selected: classes.selectMenuItemSelected,
                                                                }}
                                                                value={sys_us_state_id}
                                                            >
                                                                {state_abbreviation}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText error={true}>
                                                        {touched.sys_us_state_id && errors.sys_us_state_id}
                                                    </FormHelperText>
                                                </FormControl>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem md={10}>
                                        <GridContainer>
                                            <GridItem md={4}>
                                                <CustomInput
                                                    color="primary"
                                                    labelText="Zip Code"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        required: true,
                                                        disabled: isEdit,
                                                    }}
                                                    inputProps={{
                                                        name: "legal_entity_zip",
                                                        value: values.legal_entity_zip,
                                                        required: true,
                                                        className: classes.textField,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                    }}
                                                    error={Boolean(touched.legal_entity_zip && errors.legal_entity_zip)}
                                                    helperText={touched.legal_entity_zip && errors.legal_entity_zip}
                                                />
                                            </GridItem>
                                            <GridItem md={4}>
                                                <CustomInput
                                                    color="primary"
                                                    labelText="Phone"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        required: true,
                                                        disabled: isEdit,
                                                    }}
                                                    inputProps={{
                                                        name: "legal_entity_phone",
                                                        value: values.legal_entity_phone,
                                                        required: true,
                                                        className: classes.textField,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                        inputComponent: TextMaskCustom,
                                                    }}
                                                    error={Boolean(touched.legal_entity_phone && errors.legal_entity_phone)}
                                                    helperText={touched.legal_entity_phone && errors.legal_entity_phone}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem md={10}>
                                        <Box my={2}>
                                            <GridContainer>
                                                <GridItem md={4}>
                                                    <Button
                                                        type="submit"
                                                        disabled={isEdit}
                                                        //className={classes.button}
                                                        color="primary"
                                                    >
                                                        Save
                                                    </Button>
                                                    {mode === 'edit' && (
                                                        <Button
                                                            //className={classes.button}
                                                            onClick={handleIsEdit}
                                                            color="transparent"
                                                        >
                                                            <BorderColorIcon /> Edit
                                                        </Button>
                                                    )}
                                                </GridItem>
                                            </GridContainer>
                                        </Box>

                                    </GridItem>
                                </GridContainer>
                            </form>
                        )}
                    </Formik>
                </GridItem>
            </GridContainer>
        </Loadable>
    );
}
