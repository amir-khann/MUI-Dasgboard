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
import { ContactDataEditDialog } from './ContactDataEditDialog';
import AddIcon from '@material-ui/icons/Add';

const DEFAULT_SORT = [{ id: 'key', asc: true }]
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

export default function ContactDataPage(props) {
    const {
        contactDataTypesPending, data, fields,
        actions: { listContactDataTypes }
    } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [contactDataType, setContactDataType] = useState(null);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        listContactDataTypes()
    }, [listContactDataTypes]);

    const onClickColumn = (contactType) => {
        const { row: { original } } = contactType;
        handleDialog();
        setContactDataType(original);
    }

    const handleClose = (open) => {
        setOpenDialog(open);
        setContactDataType(null);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClickAddDataType = () => {
        handleDialog();
    }

    return (
        <Loadable loading={contactDataTypesPending}>
            <ContactDataEditDialog open={openDialog} contactDataType={contactDataType} handleClose={handleClose} />
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <Button onClick={handleClickAddDataType} className={classes.button} color="primary">
                                <AddIcon className={classes.icons} /> Contact Detail
                            </Button>
                            <h4 className={classes.cardIconTitle}>Contact Details</h4>
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
