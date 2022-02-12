import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { DataTable, Loadable } from "common";
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';
import { ContactEditDialog } from './ContactEditDialog'

const DEFAULT_SORT = [{ id: 'associate_first_name', asc: true }]
const DEFAULT_FILTER = [{ id: 'active', value: true }];

const styles = {
    button: {
        float: 'right'
    }
};

export default function ContactDataDefaults(props) {
    const { providerId, providersContactsPending, data, fields, mode,
        actions: { getContactsMapping }
    } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [contact, setContact] = useState(null);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        getContactsMapping(providerId);
    }, [getContactsMapping, providerId]);

    const onClickColumn = (contact) => {
        const { row: { original } } = contact;
        setContact(original);
        handleDialog();
    }

    const handleClose = (open) => {
        setOpenDialog(open);
        setContact(null);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    return (
        <Loadable loading={providersContactsPending}>
            <ContactEditDialog open={openDialog} providerId={providerId} contact={contact} handleClose={handleClose} />
            <GridContainer>
                {mode === 'edit' && (
                    <GridItem alignItems="center" xs={12}>
                        <Box my={2}>
                            <Button onClick={handleDialog} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Provider Contact Type
                            </Button>
                        </Box>
                    </GridItem>
                )}
                <GridItem xs={12}>
                    <Box my={2}>
                        <DataTable
                            columns={fields}
                            data={data}
                            DEFAULT_SORT={DEFAULT_SORT}
                            DEFAULT_FILTER={DEFAULT_FILTER}
                            handleOnClick={onClickColumn}
                        />
                    </Box>
                </GridItem>
            </GridContainer>
        </Loadable>
    );
}
