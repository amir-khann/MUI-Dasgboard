import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { DataTable, Loadable } from "common";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import AddIcon from '@material-ui/icons/Add';
import { ContactDetailEditDialog } from './ContactDetailEditDialog';

const DEFAULT_SORT = [{ id: 'key', asc: true }];
const DEFAULT_FILTER = [{ id: 'active', value: true }];

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
    button: {
        float: 'right'
    }
};

export default function ContactDetailTypes(props) {
    const { serviceContactDetailListPending, data, fields, serviceId,
        actions: { listServiceContacts }
    } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [contactDetailType, setContactDetailType] = useState(null);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        listServiceContacts(serviceId);
    }, [listServiceContacts, serviceId]);

    const onClickColumn = (connection) => {
        const { row: { original } } = connection;
        handleDialog();
        setContactDetailType(original);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = (open) => {
        setOpenDialog(open);
        setContactDetailType(null);
    }

    return (
        <Loadable loading={serviceContactDetailListPending}>
            <ContactDetailEditDialog
                open={openDialog}
                serviceId={serviceId}
                handleClose={handleClose}
                contactDetailType={contactDetailType}
            />
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <Button onClick={handleDialog} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Mapping
                            </Button>
                            <h4 className={classes.cardIconTitle}>Contact detail</h4>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={fields}
                                data={data}
                                DEFAULT_SORT={DEFAULT_SORT}
                                DEFAULT_FILTER={DEFAULT_FILTER}
                                handleOnClick={onClickColumn}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </Loadable>
    );
}