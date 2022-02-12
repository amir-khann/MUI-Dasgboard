import * as React from "react";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//import InboxIcon from "@mui/icons-material/MoveToInbox";
//import MailIcon from "@mui/icons-material/Mail";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import cx from "classnames";
//import Icon from "@material-ui/core/Icon";
import { NavLink, useLocation } from "react-router-dom";


//const drawerWidth = 240;

const useStyles = makeStyles({
    drawer: {
        // position: "relative",
        // marginLeft: "auto",
        //width: 200,
        //   "& .MuiBackdrop-root": {
        //     display: "none"
        //   },
        "& .MuiDrawer-paper": {
            width: 200,
            left: 110,
            "box-shadow": "5px 0 5px -2px  rgba(82, 63, 105, 0.30)",

            //transition: '1s'
            //left: 0
            //position: "absolute",
            //height: (props: { height: number }) => props.height,
            //transition: "none !important"
        }
    },
    activeLink: {
        'border-left': '3px solid #00acc1'
    }
});

export default function PermanentDrawerLeft(props) {
    const { routes, color, sideClassess, setMiniActive } = props;
    const classes = useStyles();
    let location = useLocation();
    //console.log(routes);

    const activeRoute = (routeName) => {
        // console.log(location.pathname)
        // console.log(routeName);
        return location.pathname === routeName ? "active" : "";
    };
    //console.log(routes);


    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                className={classes.drawer}
                // openSecondary={true}
                // docked={false}
                // styleFunctionSx={{
                //     width: drawerWidth,
                //     flexShrink: 0,
                //     displayPrint: "none",
                //     "& .MuiDrawer-paper": {
                //         width: drawerWidth,
                //         boxSizing: "border-box",
                //     },
                //     // "& .MuiDrawer-paperAnchorLeft": {
                //     //     left: 80,
                //     // },
                // }}
                // style={{ background: "red" }}
                // PaperProps={{ left: 90,background: "red"  }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                {/* <Divider /> */}
                <List>
                    {routes && routes.map((prop, key) => {
                        const itemText =
                            sideClassess.itemText +
                            " " +
                            cx({
                                // [classes.itemTextMini]: props.miniActive && miniActive,
                                //[classes.itemTextMiniRTL]: rtlActive && props.miniActive && miniActive,
                                // [classes.itemTextRTL]: rtlActive,
                            });
                        const collapseItemText =
                            sideClassess.collapseItemText +
                            " " +
                            cx({
                                //[classes.collapseItemTextMini]: props.miniActive && miniActive,
                                // [classes.collapseItemTextMiniRTL]:
                                //     rtlActive && props.miniActive && miniActive,
                                // [classes.collapseItemTextRTL]: rtlActive,
                            });
                        const itemIcon =
                            sideClassess.itemIcon +
                            " "
                        const collapseItemMini =
                            sideClassess.collapseItemMini +
                            " "
                        const innerNavLinkClasses =
                            sideClassess.collapseItemLink +
                            " " +
                            cx({
                                [" " + classes.activeLink]: activeRoute(prop.layout + prop.path),
                            });
                        const navLinkClasses =
                            sideClassess.itemLink +
                            " " +
                            cx({
                                [" " + classes.activeLink]: activeRoute(prop.layout + prop.path),
                            });


                        //console.log(navLinkClasses)


                        return (
                            <ListItem
                                key={key}
                                className={cx(
                                    { [sideClassess.item]: prop.icon !== undefined },
                                    { [sideClassess.collapseItem]: prop.icon === undefined }
                                )}
                            >
                                <NavLink
                                    to={prop.layout + prop.path}
                                    className={cx(
                                        { [navLinkClasses]: prop.icon !== undefined },
                                        { [innerNavLinkClasses]: prop.icon === undefined }
                                    )}
                                    onClick={(e) => {
                                        //setMiniActive(false);
                                    }}
                                >
                                    {/* {prop.icon !== undefined ? (
                                    typeof prop.icon === "string" ? (
                                        <Icon className={itemIcon}>{prop.icon}</Icon>
                                    ) : (
                                        <prop.icon className={itemIcon} />
                                    )
                                ) : (
                                    <span className={collapseItemMini}>
                                        {rtlActive ? prop.rtlMini : prop.mini}
                                    </span>
                                )} */}
                                    <ListItemText
                                        primary={prop.name}
                                        disableTypography={true}
                                        className={cx(
                                            { [itemText]: prop.icon !== undefined },
                                            { [collapseItemText]: prop.icon === undefined }
                                        )}
                                    />
                                </NavLink>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </Box>
    );
}

PermanentDrawerLeft.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    color: PropTypes.oneOf([
        "white",
        "red",
        "orange",
        "green",
        "blue",
        "purple",
        "rose",
    ]),
    sideClassess: PropTypes.object,
    setMiniActive: PropTypes.func
};