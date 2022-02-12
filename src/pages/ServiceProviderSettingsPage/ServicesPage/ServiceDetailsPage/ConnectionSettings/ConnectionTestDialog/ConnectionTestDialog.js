import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, makeStyles, Typography, IconButton,
    Box, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Formik, FieldArray } from "formik";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
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

export default function ConnectionTestDialog(props) {
    const { mode, open, handleClose, initialValues, connectionId, serviceId,
        testConnectionPending, testConnectionData, updateConnectionResultPending,
        connectionResultTypesList,
        actions: { listConnections, testServiceConnection, listResultsType, updateConnectionResult, resetTestServiceConnection }
    } = props;

    const [isEdit] = useState(mode === 'edit');
    const classes = useStyles();

    useEffect(() => {
        listResultsType();
    }, [listResultsType]);

    const renderMessage = () => {
        const { testConnectionError, testConnectionErrorMessage } = props;
        if (testConnectionError) {
            return (
                <SnackbarContent
                    message={`${testConnectionErrorMessage.message}: ${testConnectionErrorMessage['sub-message']}`}
                    color="danger"
                />
            )
        }
        return null;
    }

    const handleTestCallback = () => {
        handleClose(false);
        resetTestServiceConnection();
        listConnections(serviceId);
    }

    return (
        <Dialog fullWidth maxWidth={'sm'} open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">Complete Service Option Values</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={testConnectionPending || updateConnectionResultPending}>
                    <GridContainer>
                        <GridItem xs={12}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                onSubmit={(values, { setStatus, setSubmitting }) => {
                                    if (testConnectionData) {
                                        let payload = {
                                            sys_service_connection_test_result_type_id: values.sys_service_connection_test_result_type_id,
                                            service_connection_test_result_id: testConnectionData.service_connection_test_result_id
                                        }
                                        updateConnectionResult(payload, handleTestCallback)
                                    }
                                    else {
                                        let payload = {
                                            service_options_key_values: values.serviceOptions.map((option) => {
                                                return {
                                                    option_key: option.option_key,
                                                    option_value: {
                                                        value: option.option_value.value,
                                                        dynamic_values: option.option_value.dynamic_values
                                                    }
                                                }
                                            }),
                                            cfg_service_connection_id: connectionId
                                        }
                                        testServiceConnection(payload);
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
                                                <GridItem md={12}>
                                                    <GridContainer>
                                                        <GridItem md={12}>
                                                            {renderMessage()}
                                                        </GridItem>
                                                    </GridContainer>
                                                </GridItem>
                                                {testConnectionData && testConnectionData.provider_response && (
                                                    <>
                                                        <GridItem md={12}>
                                                            <GridContainer>
                                                                <GridItem md={12}>
                                                                    <span>
                                                                        {JSON.stringify(testConnectionData.provider_response)}
                                                                    </span>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </GridItem>
                                                        <GridItem md={12}>
                                                            <GridContainer>
                                                                <GridItem md={12}>
                                                                    <FormControl
                                                                        fullWidth
                                                                        className={classes.selectFormControl}
                                                                    >
                                                                        <InputLabel
                                                                            htmlFor="simple-select"
                                                                            required
                                                                            className={classes.selectLabel}
                                                                        >
                                                                            Result
                                                                        </InputLabel>
                                                                        <Select
                                                                            MenuProps={{
                                                                                className: classes.selectMenu,
                                                                            }}
                                                                            classes={{
                                                                                select: classes.select,
                                                                            }}
                                                                            value={values.sys_service_connection_test_result_type_id}
                                                                            onChange={handleChange}
                                                                            inputProps={{
                                                                                name: "sys_service_connection_test_result_type_id",
                                                                                id: "sys_us_state-select",
                                                                                disabled: isEdit,
                                                                            }}
                                                                            error={Boolean(touched.sys_service_connection_test_result_type_id && errors.sys_service_connection_test_result_type_id)}
                                                                        >
                                                                            {connectionResultTypesList.filter(x => x.name !== 'pending')
                                                                                .map(({ name, sys_service_connection_test_result_type_id }) => (
                                                                                    <MenuItem
                                                                                        classes={{
                                                                                            root: classes.selectMenuItem,
                                                                                            selected: classes.selectMenuItemSelected,
                                                                                        }}
                                                                                        value={sys_service_connection_test_result_type_id}
                                                                                    >
                                                                                        {name}
                                                                                    </MenuItem>
                                                                                ))}
                                                                        </Select>
                                                                        <FormHelperText error={true}>
                                                                            {touched.sys_service_connection_test_result_type_id && errors.sys_service_connection_test_result_type_id}
                                                                        </FormHelperText>
                                                                    </FormControl>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </GridItem>
                                                    </>
                                                )}
                                                {testConnectionData === null && (
                                                    <GridItem md={12}>
                                                        <GridContainer>
                                                            <FieldArray
                                                                name="serviceOptions"
                                                                render={({ remove, push }) => (
                                                                    <>
                                                                        {values.serviceOptions.map(({ option_value, option_value: { dynamic_values } }, i) => {
                                                                            return (
                                                                                <>
                                                                                    {dynamic_values.map((dynamic_value, j) => {
                                                                                        return (
                                                                                            <GridItem md={12}>
                                                                                                <GridContainer>
                                                                                                    <GridItem md={12}>
                                                                                                        <CustomInput
                                                                                                            color="primary"
                                                                                                            labelText={dynamic_value.label}
                                                                                                            formControlProps={{
                                                                                                                fullWidth: true,
                                                                                                                required: option_value.required,
                                                                                                            }}
                                                                                                            inputProps={{
                                                                                                                name: `serviceOptions.${i}.option_value.dynamic_values.${j}.${dynamic_value.label}`,
                                                                                                                value: dynamic_value[`${dynamic_value.label}`],
                                                                                                                required: true,
                                                                                                                className: classes.textField,
                                                                                                                onChange: handleChange,
                                                                                                                onBlur: handleBlur,
                                                                                                            }}
                                                                                                        //error={hasError(index, 'key')}
                                                                                                        //helperText={getHelperText(index, 'key')}
                                                                                                        />
                                                                                                    </GridItem>
                                                                                                </GridContainer>
                                                                                            </GridItem>
                                                                                        )
                                                                                    })}
                                                                                </>
                                                                            )
                                                                        })}

                                                                    </>
                                                                )}
                                                            />
                                                        </GridContainer>
                                                    </GridItem>
                                                )}
                                                <GridItem md={10}>
                                                    <Box my={2}>
                                                        <GridContainer>
                                                            <GridItem md={6}>
                                                                <Button
                                                                    type="submit"
                                                                    disabled={isEdit}
                                                                    color="primary"
                                                                >
                                                                    {testConnectionData ? 'Save Result' : 'Test Connection'}
                                                                </Button>
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