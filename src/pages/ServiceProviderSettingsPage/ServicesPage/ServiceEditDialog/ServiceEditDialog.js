import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, makeStyles, Typography, IconButton,
    Box, FormControl, InputLabel, Select, MenuItem, FormHelperText,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { addServiceValidationSchema } from 'store/validation/services';
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

export default function ServiceEditDialog(props) {
    const { mode, open, handleClose, initialValues, providerId, serviceTypes,
        createServicePending, serviceTypesPending,
        actions: { listServiceTypes, serviceCreate, servicesList }
    } = props;

    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const classes = useStyles();

    useEffect(() => {
        listServiceTypes();
    }, [listServiceTypes]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCreateCallback = () => {
        servicesList(providerId);
        handleClose(false);
    }

    return (
        <Dialog fullWidth maxWidth={'sm'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">{mode === 'create' ? 'Add Service' : 'Edit Service'}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={createServicePending || serviceTypesPending}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                validationSchema={addServiceValidationSchema}
                                onSubmit={(values, { setStatus, setSubmitting }) => {
                                    let payload = {
                                        name: values.name,
                                        cfg_provider_id: values.cfg_provider_id,
                                        sys_service_type_id: values.sys_service_type_id,
                                    }

                                    if (mode === 'create') {
                                        serviceCreate(payload, handleCreateCallback);
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
                                                    <GridItem md={10}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="Name"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                required: true,
                                                                disabled: isEdit,
                                                            }}
                                                            inputProps={{
                                                                name: "name",
                                                                value: values.name,
                                                                required: true,
                                                                className: classes.textField,
                                                                onChange: handleChange,
                                                                onBlur: handleBlur,
                                                            }}
                                                            error={Boolean(touched.name && errors.name)}
                                                            helperText={touched.name && errors.name}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            </GridItem>
                                            <GridItem md={10}>
                                                <GridContainer>
                                                    <GridItem md={10}>
                                                        <FormControl
                                                            fullWidth
                                                            className={classes.selectFormControl}
                                                        >
                                                            <InputLabel
                                                                htmlFor="simple-select"
                                                                required
                                                                className={classes.selectLabel}
                                                            >
                                                                Service Type
                                                            </InputLabel>
                                                            <Select
                                                                MenuProps={{
                                                                    className: classes.selectMenu,
                                                                }}
                                                                classes={{
                                                                    select: classes.select,
                                                                }}
                                                                value={values.sys_service_type_id}
                                                                onChange={handleChange}
                                                                inputProps={{
                                                                    name: "sys_service_type_id",
                                                                    id: "sys_us_state-select",
                                                                    disabled: isEdit,
                                                                }}
                                                                error={Boolean(touched.sys_service_type_id && errors.sys_service_type_id)}
                                                            >
                                                                {serviceTypes.map(({ sys_service_type_id, name }) => (
                                                                    <MenuItem
                                                                        classes={{
                                                                            root: classes.selectMenuItem,
                                                                            selected: classes.selectMenuItemSelected,
                                                                        }}
                                                                        value={sys_service_type_id}
                                                                    >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            <FormHelperText error={true}>
                                                                {touched.sys_service_type_id && errors.sys_service_type_id}
                                                            </FormHelperText>
                                                        </FormControl>
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
                                )}
                            </Formik>
                        </GridItem>
                    </GridContainer>
                </Loadable>
            </DialogContent>
        </Dialog>
    )
}