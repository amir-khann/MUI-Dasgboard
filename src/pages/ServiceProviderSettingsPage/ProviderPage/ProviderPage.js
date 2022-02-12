import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { primaryColor } from "assets/jss/material-dashboard-pro-react.js";

import { ProviderDetails } from './ProviderDetails';
import { ProviderContactsPage } from './ContactsPage';
import { ContactDataDefaults } from './ContactDataDefaults';


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box py={3} p={1}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles(theme => {
    return {
        appbar: {
            'box-shadow': 'none',
            border: `1px solid ${primaryColor[0]}`,
            background: 'transparent'
        },
        tabs: {
            color: primaryColor[0],
            fontWeight: 300,
        },
        tab: {
            fontWeight: 300,
        },
        indicator: {
            backgroundColor: primaryColor[0],
            height: 3,
            borderRadius: 10,
        },
    }
});

export default function ProviderPage(props) {

    const [value, setValue] = React.useState(0);
    const classes = useStyles();

    React.useEffect(() => {

    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardBody>
                        <AppBar className={classes.appbar} position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="Rules View Tab"
                                className={classes.tabs}
                                classes={{
                                    indicator: classes.indicator
                                }}
                            >
                                <Tab className={classes.tab} label="Provider Details" {...a11yProps(0)} />
                                <Tab className={classes.tab} label="Provider Contacts" {...a11yProps(1)} />
                                <Tab className={classes.tab} label="Connection Defaults" {...a11yProps(2)} />
                                <Tab className={classes.tab} label="Contact Data Defaults" {...a11yProps(3)} />
                                <Tab className={classes.tab} label="Source Provider Settings" {...a11yProps(4)} />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0}>
                            <ProviderDetails
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ProviderContactsPage
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <h1>Coming Soon</h1>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            {/* <h1>Coming Soon</h1> */}
                            <ContactDataDefaults />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <h1>Coming Soon</h1>
                        </TabPanel>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
