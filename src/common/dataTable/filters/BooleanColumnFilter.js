import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const newStyles = {
    ...styles,
    formControl: {
        marginLeft: 0,
        marginRight: 0,
    },
};

const useStyles = makeStyles(newStyles);

// Define a Boolean UI for filtering
export default function DefaultColumnFilter(props) {
    const {
        column: { filterValue, setFilter, switchLabel },
    } = props;
    const classes = useStyles();

    return (
        <FormControlLabel
            className={classes.formControl}
            control={
                <Switch
                    color="primary"
                    checked={filterValue}
                    onChange={(event) =>
                        setFilter(event.target.checked)
                    }
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
            label={switchLabel ? switchLabel : "Active"}
        />
    );
}