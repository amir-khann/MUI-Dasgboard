import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, makeStyles, Typography, IconButton,
    Box, FormControl, InputLabel, Select, MenuItem, FormHelperText,
    FormControlLabel, Switch
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { addServiceContactMappingValidationSchema } from 'store/validation/services';
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

export default function ContactEditDialog(props) {
    const { mode, open, handleClose, initialValues, contactDataTypes, providerId, serviceId,
        createServiceContactPending, updateServiceContactPending,
        actions: { listServiceContacts, provideContactsList, listContactDataTypes, createServiceContact, updateServiceContact }
    } = props;

    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const classes = useStyles();

    useEffect(() => {
        listContactDataTypes();
    }, [listContactDataTypes]);

    useEffect(() => {
        setIsEdit(mode === 'edit');
    }, [mode]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCreateCallback = () => {
        handleClose(false);
        listServiceContacts(serviceId);
    }

    const handleUpdateCallback = () => {
        provideContactsList(providerId);
        handleClose(false);
    }

    return (
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">{mode === 'create' ? 'Add Contact Mapping' : 'Edit Contact Mapping'}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={createServiceContactPending || updateServiceContactPending}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                validationSchema={addServiceContactMappingValidationSchema}
                                onSubmit={(values) => {
                                    let payload = {
                                        key: values.key,
                                        active: values.active,
                                        is_contact_correlation_key: values.is_contact_correlation_key,
                                        cfg_contact_detail_type_id: values.cfg_contact_detail_type_id,
                                        cfg_service_id: values.cfg_service_id,
                                    }

                                    if (mode === 'create') {
                                        payload = {
                                            ...payload,
                                        }
                                        createServiceContact(payload, handleCreateCallback);
                                    }
                                    else {
                                        payload = {
                                            ...payload,
                                            cfg_service_contact_detail_type_id: values.cfg_service_contact_detail_type_id
                                        }
                                        updateServiceContact(payload, handleUpdateCallback);
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
                                                        <FormControl
                                                            fullWidth
                                                            className={classes.selectFormControl}
                                                        >
                                                            <InputLabel
                                                                htmlFor="simple-select"
                                                                required
                                                                className={classes.selectLabel}
                                                            >
                                                                Contact Type
                                                            </InputLabel>
                                                            <Select
                                                                MenuProps={{
                                                                    className: classes.selectMenu,
                                                                }}
                                                                classes={{
                                                                    select: classes.select,
                                                                }}
                                                                value={values.cfg_contact_detail_type_id}
                                                                onChange={handleChange}
                                                                inputProps={{
                                                                    name: "cfg_contact_detail_type_id",
                                                                    id: "sys_us_state-select",
                                                                    disabled: isEdit,
                                                                }}
                                                                error={Boolean(touched.cfg_contact_detail_type_id && errors.cfg_contact_detail_type_id)}
                                                            >
                                                                {contactDataTypes.map(({ key, cfg_contact_detail_type_id }) => (
                                                                    <MenuItem
                                                                        classes={{
                                                                            root: classes.selectMenuItem,
                                                                            selected: classes.selectMenuItemSelected,
                                                                        }}
                                                                        value={cfg_contact_detail_type_id}
                                                                    >
                                                                        {key}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            <FormHelperText error={true}>
                                                                {touched.cfg_contact_detail_type_id && errors.cfg_contact_detail_type_id}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem md={6}>
                                                        <CustomInput
                                                            color="primary"
                                                            labelText="key"
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
                                                </GridContainer>
                                            </GridItem>
                                            <GridItem md={10}>
                                                <GridContainer>
                                                    <GridItem md={6}>
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