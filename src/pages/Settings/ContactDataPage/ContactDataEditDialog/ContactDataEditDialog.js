import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, makeStyles, Typography, IconButton,
    Box, FormControlLabel, Switch
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { contactDataTypeValidationSchema } from 'store/validation/settings';
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

export default function ContactDataEditDialog(props) {
    const { mode, open, handleClose, initialValues,
        createContactDataTypePending, updateContactDataTypePending,
        actions: { listContactDataTypes, createContactDataType, updateContactDataType }
    } = props;

    const [isEdit, setIsEdit] = useState(mode === 'edit');
    const classes = useStyles();

    useEffect(() => {
        setIsEdit(mode === 'edit');
    }, [mode]);

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleCallback = () => {
        listContactDataTypes();
        handleClose(false);
    }

    return (
        <Dialog fullWidth maxWidth={'sm'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">{mode === 'create' ? 'Add Contact Detail' : 'Edit Contact Detail'}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={createContactDataTypePending || updateContactDataTypePending}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                validationSchema={contactDataTypeValidationSchema}
                                onSubmit={(values, { setStatus, setSubmitting }) => {
                                    let payload = {
                                        key: values.key,
                                        active: values.active,
                                    }

                                    if (mode === 'create') {
                                        payload = {
                                            ...payload,
                                        }
                                        createContactDataType(payload, handleCallback);
                                    }
                                    else {
                                        console.log('come hre')
                                        payload = {
                                            ...payload,
                                            contact_detail_type_id: values.cfg_contact_detail_type_id,
                                        }
                                        updateContactDataType(payload, handleCallback);
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
                                                <Box my={3}>
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