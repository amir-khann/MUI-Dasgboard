import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import ServicesPageComponent from './ServicesPage.js';
import { list } from 'store/actions/services';
import { selectServices } from 'store/selectors/services';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { SERVER_URL } from 'store/constants/api';
import BooleanColumnFilter from 'common/dataTable/filters/BooleanColumnFilter';
import { dangerColor, successColor } from "assets/jss/material-dashboard-pro-react.js";

const selectFields = createSelector(
    () => [
        {
            Header: "",
            style: { maxWidth: 70 },
            disableSortBy: true,
            accessor: "sys_service_icon",
            onClick: true,
            disableFilters: true,
            Cell: ({ row: { original: { sys_service_icon } } }) => {
                return (
                    <>
                        {sys_service_icon && <img style={{ width: 30, height: 30 }} src={`${SERVER_URL}/api/v1/images/${sys_service_icon}`} />}
                    </>
                )
            },
        },
        { Header: "ID", accessor: "cfg_service_id", onClick: true },
        { Header: "Name", accessor: "name", onClick: true },
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


export const ServicesPage = connect(
    () => {
        const selectProviderId = (state, props) => props.match.params.providerId;
        return (state, props) => ({
            servicesPending: state.services.list.pending,
            data: selectServices(state),
            fields: selectFields(state),

            providerId: selectProviderId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            servicesList: list,
        }, dispatch)
    })
)(ServicesPageComponent);