import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";

import ServiceOptionsComponent from './ServiceOptions.js';
import { listServiceOptions } from 'store/actions/services';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import BooleanColumnFilter from 'common/dataTable/filters/BooleanColumnFilter';
import { dangerColor, successColor } from "assets/jss/material-dashboard-pro-react.js";

const selectFields = createSelector(
    () => [
        { Header: "ID", accessor: "cfg_service_option_id", onClick: true },
        { Header: "Key", accessor: "key" },
        { Header: "Default value", accessor: "default_value" },
        {
            Header: "Default Only",
            accessor: "default_only",
            Filter: BooleanColumnFilter,
            filter: 'equals',
            switchLabel: "Active",
            style: {
                'text-align': 'center',
                maxWidth: 130
            },
            Cell: ({ row: { original: { default_only } } }) => {
                return (
                    <>
                        {default_only && <CheckIcon style={{ color: successColor[0] }} />}
                        {!default_only && <CloseIcon style={{ color: dangerColor[0] }} />}
                    </>

                )
            },
        },
        {
            Header: "Required",
            accessor: "required",
            Filter: BooleanColumnFilter,
            filter: 'equals',
            switchLabel: "Active",
            style: {
                'text-align': 'center',
                maxWidth: 130
            },
            Cell: ({ row: { original: { required } } }) => {
                return (
                    <>
                        {required && <CheckIcon style={{ color: successColor[0] }} />}
                        {!required && <CloseIcon style={{ color: dangerColor[0] }} />}
                    </>

                )
            },
        },
        {
            Header: "Active",
            accessor: "active",
            Filter: BooleanColumnFilter,
            filter: 'equals',
            switchLabel: "Active",
            style: {
                'text-align': 'center',
                maxWidth: 130
            },
            Cell: ({ row: { original: { active } } }) => {
                return (
                    <>
                        {active && <CheckIcon style={{ color: successColor[0] }} />}
                        {!active && <CloseIcon style={{ color: dangerColor[0] }} />}
                    </>

                )
            },
        },
    ]
);


export const ServiceOptions = withRouter(connect(
    () => {
        return (state, props) => ({
            connectionsListPending: state.services.serviceOptions.pending,
            data: state.services.serviceOptionsList,
            fields: selectFields(state),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listServiceOptions
        }, dispatch)
    })
)(ServiceOptionsComponent));