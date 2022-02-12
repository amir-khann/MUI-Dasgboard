import AccountTreeIcon from '@material-ui/icons/AccountTree';
import InputIcon from '@material-ui/icons/Input';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import PolymerIcon from '@material-ui/icons/Polymer';
import CloudQueueIcon from '@material-ui/icons/CloudQueue'; 
import { leftNaVcolor } from "assets/jss/material-dashboard-pro-react.js";

export const selectRoleBasedMenu = () => {
    let baseMenu = [
        {
            collapse: false,
            path: "/dashboard",
            name: "Dashboard",
            color: leftNaVcolor[0],
            icon: TrackChangesIcon,
            layout: "/admin",
            state: "pageCollapse",
        },
        {
            collapse: true,
            path: "/buttons",
            name: "Contact Data",
            color: leftNaVcolor[1],
            icon: MultilineChartIcon,
            layout: "/admin",
            state: "pageCollapse1",
            views: [
                {
                    path: "/search",
                    name: "Search",
                    layout: "/admin",
                },
                {
                    path: "/audience-settings",
                    name: "Audience Settings",
                    layout: "/admin",
                },
                {
                    path: "/campaigns",
                    name: "Campaigns",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/pricing-page",
            name: "Workflows",
            color: leftNaVcolor[2],
            icon: AccountTreeIcon,
            layout: "/admin",
            state: "pageCollapse2",
            views: [
                {
                    path: "/visualizer",
                    name: "Visualizer",
                    layout: "/admin",
                },
                {
                    path: "/sequences",
                    name: "Sequences",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/pricing-page",
            name: "Store",
            color: leftNaVcolor[3],
            icon: AppsIcon,
            layout: "/admin",
            state: "pageCollapse3",
            views: [
                {
                    path: "/phone-numbers",
                    name: "Phone Numbers",
                    layout: "/admin",
                },
                {
                    path: "/workflowt-templates",
                    name: "Workflow Templates",
                    layout: "/admin",
                },
                {
                    path: "/media",
                    name: "Media",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/pricing-page",
            name: "Integrations",
            color: leftNaVcolor[4],
            icon: CloudQueueIcon,
            layout: "/admin",
            state: "pageCollapse4",
            views: [
                {
                    path: "/providers",
                    name: "Service Provider Settings",
                    layout: "/admin",
                },
                {
                    path: "/service-settings",
                    name: "Service Settings",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/pricing-page",
            name: "Data Sources",
            color: leftNaVcolor[5],
            icon: InputIcon,
            layout: "/admin",
            state: "pageCollapse5",
            views: [
                {
                    path: "/contact-data-provider-settings",
                    name: "Contact Provider Settings",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/tool-page",
            name: "Tool",
            color: leftNaVcolor[6],
            icon: PolymerIcon,
            layout: "/admin",
            state: "pageCollapse6",
            views: [
                {
                    path: "/query-tool",
                    name: "Query Builder",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/pricing-page",
            name: "Settings",
            color: leftNaVcolor[7],
            icon: SettingsIcon,
            layout: "/admin",
            state: "pageCollapse7",
            views: [
                {
                    path: "/company-details",
                    name: "Company Details",
                    layout: "/admin",
                },
                {
                    path: "/contact-details",
                    name: "Contact Data Details",
                    layout: "/admin",
                },
                {
                    path: "/user-groups",
                    name: "User Groups",
                    layout: "/admin",
                },
                {
                    path: "/user",
                    name: "User",
                    layout: "/admin",
                },
                {
                    path: "/payments",
                    name: "Payments",
                    layout: "/admin",
                },
            ]
        },
        {
            collapse: true,
            path: "/table-page",
            name: "Table",
            color: leftNaVcolor[8],
            icon: PolymerIcon,
            layout: "/admin",
            state: "pageCollapse8",
            views: [
                {
                    path: "/table-data",
                    name: "TableData",
                    layout: "/admin",
                },
            ]
        },
      
    ];
    return baseMenu;
}
