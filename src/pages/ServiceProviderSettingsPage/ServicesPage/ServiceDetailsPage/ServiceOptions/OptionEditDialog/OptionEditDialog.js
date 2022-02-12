import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, makeStyles, Typography, IconButton, Switch, FormControlLabel,
    Box
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { addServiceOptionValidationSchema } from 'store/validation/services';
import Button from "components/CustomButtons/Button.js";
import { Loadable } from 'common';

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
}));

export default function ConnectionEditDialog(props) {
    const { mode, open, handleClose, initialValues, serviceId,
        createserviceOptionPending, updateserviceOptionPending,
        actions: { createServiceOption, updateServiceOption, listServiceOptions }
    } = props;

    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const classes = useStyles();

    useEffect(() => {
        setIsEdit(mode === 'edit');
    }, [mode]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCreateCallback = () => {
        listServiceOptions(serviceId);
        handleClose(false);
    }

    return (
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">{mode === 'create' ? 'Add Service Option' : 'Add Service Option'}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={createserviceOptionPending || updateserviceOptionPending}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                validationSchema={addServiceOptionValidationSchema}
                                onSubmit={(values, { setStatus, setSubmitting }) => {
                                    let payload = {
                                        key: values.key,
                                        required: values.required,
                                        default_only: values.default_only,
                                        default_value: values.default_value,
                                        active: values.active,
                                        cfg_service_id: values.cfg_service_id
                                    }

                                    if (mode === 'create') {
                                        createServiceOption(payload, handleCreateCallback);
                                    }
                                    else {
                                        payload = {
                                            ...payload,
                                            cfg_service_option_id: values.cfg_service_option_id,
                                            created_at: values.created_at
                                        }
                                        updateServiceOption(payload, values.cfg_service_option_id, handleCreateCallback);
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
                                    return (
                                        <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.container}>
                                            <GridContainer>
                                                <GridItem md={10}>
                                                    <GridContainer>
                                                        <GridItem md={6}>
                                                            <CustomInput
                                                                color="primary"
                                                                labelText="Key"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                    required: true,
                                                                    disabled: isEdit,
                                                                }}
                                                                inputProps={{
                                                                    name: "key",
                                                                    value: values.key,
                                                                    required: true,
                                                                    className: classes.textField,
                                                                    onChange: handleChange,
                                                                    onBlur: handleBlur,
                                                                }}
                                                                error={Boolean(touched.key && errors.key)}
                                                                helperText={touched.key && errors.key}
                                                            />
                                                        </GridItem>
                                                        <GridItem md={6}>
                                                            <CustomInput
                                                                color="primary"
                                                                labelText="Default value"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                    required: true,
                                                                    disabled: isEdit,
                                                                }}
                                                                inputProps={{
                                                                    name: "default_value",
                                                                    value: values.default_value,
                                                                    required: true,
                                                                    className: classes.textField,
                                                                    onChange: handleChange,
                                                                    onBlur: handleBlur,
                                                                }}
                                                                error={Boolean(touched.default_value && errors.default_value)}
                                                                helperText={touched.default_value && errors.default_value}
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                </GridItem>
                                                <GridItem md={10}>
                                                    <GridContainer>
                                                        <GridItem md={3}>
                                                            <FormControlLabel
                                                                className={classes.formControl}
                                                                control={
                                                                    <Switch
                                                                        name="default_only"
                                                                        color="primary"
                                                                        disabled={isEdit}
                                                                        checked={values.default_only}
                                                                        onChange={handleChange}
                                                                        classes={{
                                                                            switchBase: classes.switchBase,
                                                                            checked: classes.switchChecked,
                                                                            thumb: classes.switchIcon,
                                                                            track: classes.switchBar,
                                                                        }}
                                                                    />
                                                                }
                                                                classes={{
                                                                    label: classes.label,
                                                                }}
                                                                label={"Default Only"}
                                                            />
                                                        </GridItem>
                                                        <GridItem md={3}>
                                                            <FormControlLabel
                                                                className={classes.formControl}
                                                                control={
                                                                    <Switch
                                                                        name="required"
                                                                        color="primary"
                                                                        disabled={isEdit}
                                                                        checked={values.required}
                                                                        onChange={handleChange}
                                                                        classes={{
                                                                            switchBase: classes.switchBase,
                                                                            checked: classes.switchChecked,
                                                                            thumb: classes.switchIcon,
                                                                            track: classes.switchBar,
                                                                        }}
                                                                    />
                                                                }
                                                                classes={{
                                                                    label: classes.label,
                                                                }}
                                                                label={"Required"}
                                                            />
                                                        </GridItem>
                                                        <GridItem md={3}>
                                                            <FormControlLabel
                                                                className={classes.formControl}
                                                                control={
                                                                    <Switch
                                                                        name="active"
                                                                        color="primary"
                                                                        disabled={isEdit}
                                                                        checked={values.active}
                                                                        onChange={handleChange}
                                                                        classes={{
                                                                            switchBase: classes.switchBase,
                                                                            checked: classes.switchChecked,
                                                                            thumb: classes.switchIcon,
                                                                            track: classes.switchBar,
                                                                        }}
                                                                    />
                                                                }
                                                                classes={{
                                                                    label: classes.label,
                                                                }}
                                                                label={"Active"}
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                </GridItem>
                                                <GridItem md={10}>
                                                    <Box my={2}>
                                                        <GridContainer>
                                                            <GridItem md={6}>
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
                                    )
                                }}
                            </Formik>
                        </GridItem>
                    </GridContainer>
                </Loadable>
            </DialogContent>
        </Dialog>
    )
}