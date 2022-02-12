import React from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
import { InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    searchIcon: {
        fontSize: 16,
    }
});

// Define a default UI for filtering
export default function DefaultColumnFilter(props) {
    const {
        column: { filterValue, setFilter },
    } = props;

    const classes = useStyles();

    return (
        <CustomInput
            color="primary"
            formControlProps={{
                fullWidth: true,
            }}

            inputProps={{
                value: filterValue || "",
                onChange: (e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                },
                startAdornment: (
                    <InputAdornment position="start" >
                        <SearchIcon className={classes.searchIcon} />
                    </InputAdornment>)

            }}
        />
    );
}