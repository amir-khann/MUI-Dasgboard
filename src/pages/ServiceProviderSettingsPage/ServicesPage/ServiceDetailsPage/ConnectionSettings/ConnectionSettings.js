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

import { ConnectionEditDialog } from './ConnectionEditDialog';

const DEFAULT_SORT = [{ id: 'name', asc: true }];
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

export default function ConnectionSettings(props) {
    const {
        connectionsListPending, data, fields, serviceId,
        actions: { listConnections }
    } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [connection, setConnection] = useState(null);
    const [connectionId, setConnectionId] = useState(null);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        listConnections(serviceId);
    }, [listConnections, serviceId]);

    const onClickColumn = (connection) => {
        const { row: { original } } = connection;
        handleDialog();
        setConnection(original);
        setConnectionId(original.cfg_service_connection_id);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = (open) => {
        setOpenDialog(open);
        setConnection(null);
        setConnectionId(null);
    }

    return (
        <Loadable loading={connectionsListPending}>
            <ConnectionEditDialog
                open={openDialog}
                serviceId={serviceId}
                handleClose={handleClose}
                connection={connection}
                connectionId={connectionId}
            />
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <Button onClick={handleDialog} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Connection
                            </Button>
                            <h4 className={classes.cardIconTitle}>Connection Versions</h4>
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
