import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    IconButton,
    Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Button from "components/CustomButtons/Button.js";

export default function ConfirmDialog(props) {
    const { open, handleClose, handleConfirm, headerText, bodyText } = props;
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{headerText}</DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <Typography>{bodyText}</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="warning" onClick={handleClose} variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="success" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};