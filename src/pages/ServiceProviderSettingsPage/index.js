import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import ServiceProviderSettingsComponent from './ServiceProviderSettingsPage.js';
import { list } from 'store/actions/providers';
import { selectProvidersList } from 'store/selectors/providers';
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
            accessor: "sys_provider_icon",
            onClick: true,
            disableFilters: true,
            Cell: ({ row: { original: { sys_provider_icon } } }) => {
                return (
                    <>
                        {sys_provider_icon && <img style={{ width: 30, height: 30 }} src={`${SERVER_URL}/api/v1/images/${sys_provider_icon}`} />}
                    </>
                )
            },
        },
        { Header: "ID", accessor: "cfg_provider_id", onClick: true, style: { maxWidth: 80 } },
        { Header: "Entity Name", accessor: "legal_entity_name", onClick: true },
        {
            Header: "Services",
            accessor: "provider_services",
            onClick: true,
            Cell: ({ row: { original: { provider_services } } }) => {
                return (
                    <span style={{ paddingLeft: 25 }}>{(provider_services && provider_services.length) ? provider_services.length : 0}</span>
                )
            },
        },
        { Header: "Nickname", accessor: "legal_entity_nickname" },
        { Header: "Phone", accessor: "legal_entity_phone", disableSortBy: true, style: { maxWidth: 110 } },
        { Header: "City", accessor: "city" },
        { Header: "State", accessor: "sys_us_state.state_name", style: { maxWidth: 70 } },
        {
            Header: "Source Provider",
            accessor: "is_source_provider",
            Filter: BooleanColumnFilter,
            filter: 'equals',
            switchLabel: "Yes",
            style: {
                'text-align': 'center',
                maxWidth: 150
            },
            Cell: ({ row: { original: { is_source_provider } } }) => {
                return (
                    <>
                        {is_source_provider && <CheckIcon style={{ color: successColor[0] }} />}
                        {!is_source_provider && <CloseIcon style={{ color: dangerColor[0] }} />}
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

export const ServiceProviderSettingsPage =
    connect(
        (state) => ({
            providersPending: state.providers.list.pending,
            data: selectProvidersList(state),
            fields: selectFields(state),
        }),
        (dispatch) => ({
            actions: bindActionCreators({
                providersList: list,
            }, dispatch)
        })
    )(ServiceProviderSettingsComponent);