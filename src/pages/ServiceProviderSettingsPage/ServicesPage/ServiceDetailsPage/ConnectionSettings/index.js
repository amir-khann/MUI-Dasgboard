import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";

import ConnectionSettingsComponent from './ConnectionSettings.js';
import { listConnections } from 'store/actions/services';
import { selectConnections } from 'store/selectors/services';

const selectFields = createSelector(
    () => [
        {
            Header: "ID",
            accessor: "cfg_service_connection_id",
            onClick: true
        },
        {
            Header: "State",
            accessor: "sys_service_connection_state.name",
            onClick: true
        },
        { Header: "Contact URI", accessor: "contact_uri" },
        { Header: "Callback URI", accessor: "callback_uri" },
    ]
);

export const ConnectionSettings = withRouter(connect(
    () => {
        const selectProviderId = (state, props) => props.match.params.providerId;
        const selectserviceId = (state, props) => props.match.params.serviceId;


        return (state, props) => ({
            connectionsListPending: state.services.connections.pending,
            data: selectConnections(state),
            fields: selectFields(state),

            providerId: selectProviderId(state, props),
            serviceId: selectserviceId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listConnections
        }, dispatch)
    })
)(ConnectionSettingsComponent));