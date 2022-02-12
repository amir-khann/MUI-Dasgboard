import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
    DialogActions,
    Typography,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Loadable } from 'common';

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
}));

export default function ServiceDialog(props) {
    const {
        open, handleClose,
    } = props;

    const classes = useStyles();

    return (
        <Dialog fullWidth open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6">{'Service Details'}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Loadable loading={false}>
                </Loadable>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleClose(false)}
                    variant="contained"
                    color="default">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}