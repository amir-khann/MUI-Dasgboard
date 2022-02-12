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
import { ServiceEditDialog } from './ServiceEditDialog';

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

export default function ServicesPage(props) {
    const {
        servicesPending, data, fields, providerId,
        actions: { servicesList }
    } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        servicesList(providerId);
    }, [servicesList, providerId]);

    const onClickColumn = (service) => {
        const { row: { original: { cfg_service_id } } } = service;
        props.history.push(`/admin/providers/${providerId}/services/${cfg_service_id}/connection`);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = (open) => {
        setOpenDialog(open);
    }

    return (
        <Loadable loading={servicesPending}>
            <ServiceEditDialog
                open={openDialog}
                providerId={providerId}
                handleClose={handleClose}
            />
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <Button onClick={handleDialog} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Service
                            </Button>
                            <h4 className={classes.cardIconTitle}>Services</h4>
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
