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
import { contactValidationSchema } from 'store/validation/providers';
import Button from "components/CustomButtons/Button.js";
import { Loadable, TextMaskCustom } from 'common';
import { unpackUSFormat } from 'util/phone';

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

export default function ContactEditDialog(props) {
    const { mode, open, handleClose, initialValues, contactTypes, providerId,
        createContactPending, updateContactPending,
        actions: { provideContactsList, listTypes, contactCreate, contactUpdate }
    } = props;

    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const classes = useStyles();

    useEffect(() => {
        listTypes();
    }, [listTypes]);

    useEffect(() => {
        setIsEdit(mode === 'edit');
    }, [mode]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCreateCallback = () => {
        provideContactsList(providerId);
        handleClose(false);
    }

    const handleUpdateCallback = () => {
        provideContactsList(providerId);
        handleClose(false);
    }

    return (
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">{mode === 'create' ? 'Add Contact' : 'Edit Contact'}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={createContactPending || updateContactPending}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                validationSchema={contactValidationSchema}
                                onSubmit={(values, { setStatus, setSubmitting }) => {
                                    let payload = {
                                        associate_first_name: values.associate_first_name,
                                        associate_last_name: values.associate_last_name,
                                        associate_email: values.associate_email,
                                        associate_phone: unpackUSFormat(values.associate_phone),
                                        associate_notes: values.associate_notes,
                                        active: values.active,
                                        cfg_provider_id: values.cfg_provider_id,
                                        sys_provider_associate_type_id: values.sys_provider_associate_type_id,
                                    }

                                    if (mode === 'create') {
                                        payload = {
                                            ...payload,
                                        }
                                        contactCreate(payload, handleCreateCallback);
                                    }
                                    else {
                                        payload = {
                                            ...payload,
                                            cfg_provider_associate_id: values.cfg_provider_associate_id,
                                            created_at: values.created_at
                                        }
                                        contactUpdate(payload, handleUpdateCallback);
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
                                                    <GridItem md={6}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="First Name"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                required: true,
                                                                disabled: isEdit,
                                                            }}
                                                            inputProps={{
                                                                name: "associate_first_name",
                                                                value: values.associate_first_name,
                                                                required: true,
                                                                className: classes.textField,
                                                                onChange: handleChange,
                                                                onBlur: handleBlur,
                                                            }}
                                                            error={Boolean(touched.associate_first_name && errors.associate_first_name)}
                                                            helperText={touched.associate_first_name && errors.associate_first_name}
                                                        />
                                                    </GridItem>
                                                    <GridItem md={6}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="Last Name"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                //required: true,
                                                                disabled: isEdit,
                                                            }}
                                                            inputProps={{
                                                                name: "associate_last_name",
                                                                value: values.associate_last_name,
                                                                required: true,
                                                                className: classes.textField,
                                                                onChange: handleChange,
                                                                onBlur: handleBlur,
                                                            }}
                                                            error={Boolean(touched.associate_last_name && errors.associate_last_name)}
                                                            helperText={touched.associate_last_name && errors.associate_last_name}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            </GridItem>
                                            <GridItem md={10}>
                                                <GridContainer>
                                                    <GridItem md={6}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="Email"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                required: true,
                                                                disabled: isEdit,
                                                            }}
                                                            inputProps={{
                                                                name: "associate_email",
                                                                value: values.associate_email,
                                                                required: true,
                                                                className: classes.textField,
                                                                onChange: handleChange,
                                                                onBlur: handleBlur,
                                                            }}
                                                            error={Boolean(touched.associate_email && errors.associate_email)}
                                                            helperText={touched.associate_email && errors.associate_email}
                                                        />
                                                    </GridItem>
                                                    <GridItem md={6}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="Phone"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                required: true,
                                                                disabled: isEdit,
                                                            }}
                                                            inputProps={{
                                                                name: "associate_phone",
                                                                value: values.associate_phone,
                                                                required: true,
                                                                className: classes.textField,
                                                                onChange: handleChange,
                                                                onBlur: handleBlur,
                                                                inputComponent: TextMaskCustom,
                                                            }}
                                                            error={Boolean(touched.associate_phone && errors.associate_phone)}
                                                            helperText={touched.associate_phone && errors.associate_phone}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            </GridItem>
                                            <GridItem md={10}>
                                                <GridContainer>
                                                    <GridItem md={6}>
                                                        <FormControl
                                                            fullWidth
                                                            className={classes.selectFormControl}
                                                        >
                                                            <InputLabel
                                                                htmlFor="simple-select"
                                                                required
                                                                className={classes.selectLabel}
                                                            >
                                                                Associate Type
                                                            </InputLabel>
                                                            <Select
                                                                MenuProps={{
                                                                    className: classes.selectMenu,
                                                                }}
                                                                classes={{
                                                                    select: classes.select,
                                                                }}
                                                                value={values.sys_provider_associate_type_id}
                                                                onChange={handleChange}
                                                                inputProps={{
                                                                    name: "sys_provider_associate_type_id",
                                                                    id: "sys_us_state-select",
                                                                    disabled: isEdit,
                                                                }}
                                                                error={Boolean(touched.sys_provider_associate_type_id && errors.sys_provider_associate_type_id)}
                                                            >
                                                                {contactTypes.map(({ associate_type, sys_provider_associate_type_id }) => (
                                                                    <MenuItem
                                                                        classes={{
                                                                            root: classes.selectMenuItem,
                                                                            selected: classes.selectMenuItemSelected,
                                                                        }}
                                                                        value={sys_provider_associate_type_id}
                                                                    >
                                                                        {associate_type}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            <FormHelperText error={true}>
                                                                {touched.sys_provider_associate_type_id && errors.sys_provider_associate_type_id}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem md={6}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="Note"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                required: true,
                                                                disabled: isEdit,
                                                            }}
                                                            inputProps={{
                                                                name: "associate_notes",
                                                                value: values.associate_notes,
                                                                required: true,
                                                                className: classes.textField,
                                                                onChange: handleChange,
                                                                onBlur: handleBlur,
                                                            }}
                                                            error={Boolean(touched.associate_notes && errors.associate_notes)}
                                                            helperText={touched.associate_notes && errors.associate_notes}
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
                                )}
                            </Formik>
                        </GridItem>
                    </GridContainer>
                </Loadable>
            </DialogContent>
        </Dialog>
    )
}