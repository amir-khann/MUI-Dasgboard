import React from 'react';
import {
    makeStyles, IconButton, Box
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { FieldArray, getIn } from "formik";
import CustomInput from "components/CustomInput/CustomInput.js";
import formStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const useStyles = makeStyles(theme => ({
    ...formStyle,
    textField: {
        paddingTop: 27
    },
}));

export default function BodyFeildArray(props) {
    const { mode, values, handleBlur, handleChange, bindArrayPush,
        touched, errors, isDisabledKey, isEdit, isConnectionEditable
    } = props;

    const classes = useStyles();

    const hasError = (index, name) => {
        return Boolean(getIn(touched, `feilds.${index}.${name}`) &&
            getIn(errors, `feilds.${index}.${name}`));
    }

    const getHelperText = (index, name) => {
        return getIn(touched, `feilds.${index}.${name}`) &&
            getIn(errors, `feilds.${index}.${name}`);
    }

    return (
        <FieldArray
            name="feilds"
            render={({ remove, push }) => (
                <>
                    {bindArrayPush(push)}
                    {values.feilds.map((feild, index) => {
                        return (
                            <>
                                <GridItem md={12}>
                                    <GridContainer>
                                        <GridItem md={3}>
                                            <CustomInput
                                                color="primary"
                                                labelText="Key"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    required: true,
                                                    disabled: isDisabledKey || isEdit,
                                                }}
                                                inputProps={{
                                                    name: `feilds.${index}.key`,
                                                    value: feild.key,
                                                    required: true,
                                                    className: classes.textField,
                                                    onChange: handleChange,
                                                    onBlur: handleBlur,
                                                }}
                                                error={hasError(index, 'key')}
                                                helperText={getHelperText(index, 'key')}
                                            />
                                        </GridItem>
                                        <GridItem md={8}>
                                            <CustomInput
                                                color="primary"
                                                labelText="Value"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    required: true,
                                                    disabled: isDisabledKey || isEdit,
                                                }}
                                                inputProps={{
                                                    name: `feilds.${index}.value`,
                                                    value: feild.value,
                                                    required: true,
                                                    className: classes.textField,
                                                    onChange: handleChange,
                                                    onBlur: handleBlur,
                                                }}
                                                error={hasError(index, 'key')}
                                                helperText={getHelperText(index, 'key')}
                                            />
                                        </GridItem>
                                        <GridItem md={1}>
                                            {values.feilds.length > 1 && !isDisabledKey
                                                && isConnectionEditable(mode, values) &&
                                                (
                                                    <Box mt={3}>
                                                        <IconButton
                                                            title="Delete"
                                                            onClick={() => remove(index)}
                                                            //disabled={isConnectionEditable(mode, values)}
                                                        >
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </>
                        )
                    })}

                </>
            )}
        />
    )
}