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

import { OptionEditDialog } from './OptionEditDialog';

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

export default function ServiceOptions(props) {
    const {
        connectionsListPending, data, fields, serviceId,
        actions: { listServiceOptions }
    } = props;

    const [serviceOption, setServiceOption] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        listServiceOptions(serviceId);
    }, [listServiceOptions, serviceId]);

    const onClickColumn = (serviceOption) => {
        const { row: { original } } = serviceOption;
        setServiceOption(original);
        handleDialog();
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = (open) => {
        setOpenDialog(open);
        setServiceOption(null);
    }

    return (
        <Loadable loading={connectionsListPending}>
            <OptionEditDialog
                open={openDialog}
                serviceId={serviceId}
                handleClose={handleClose}
                serviceOption={serviceOption}
            />
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <Button onClick={handleDialog} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Service Option
                            </Button>
                            <h4 className={classes.cardIconTitle}>Service Options</h4>
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
