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
import { ServiceDialog } from './ServiceDialog'

const DEFAULT_SORT = [{ id: 'legal_entity_name', asc: true }]
const DEFAULT_FILTER = [{ id: 'active', value: true }]

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

export default function ServiceProviderSettingsPage(props) {
    const {
        providersPending, data, fields,
        actions: { providersList }
    } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        providersList()
    }, [providersList]);

    const onClickColumn = (provider) => {
        const { row: { original }, column: { id } } = provider;
        if (id === 'provider_services') {
            props.history.push(`/admin/providers/${original.cfg_provider_id}/services`);
        }
        else {
            props.history.push(`/admin/providers/${original.cfg_provider_id}`);
        }
    }

    const handleClose = (open) => {
        setOpenDialog(open);
    }

    const handleClickAddProvider = () => {
        props.history.push(`/admin/providers/new`);
    }

    return (
        <Loadable loading={providersPending}>
            <ServiceDialog open={openDialog} handleClose={handleClose} />
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <Button onClick={handleClickAddProvider} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Provider
                            </Button>
                            <h4 className={classes.cardIconTitle}>Providers</h4>
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
