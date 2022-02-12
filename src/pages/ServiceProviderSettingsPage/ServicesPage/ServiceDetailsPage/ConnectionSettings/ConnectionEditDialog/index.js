import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import {
    listBodyTypes, listAuthTypes, createConnection, listConnections,
    getConnection, resetTestServiceConnection, listStateTypes, updateConnectionState,
    copyConnection
} from 'store/actions/services';
import { createConnectionSelector } from 'store/selectors/services';
import ConnectionEditDialogComponent from './ConnectionEditDialog.js';

let feild = {
    key: "",
    type: "string",
    value: "",
}

export const ConnectionEditDialog = connect(
    () => {
        const selectServiceId = (state, props) => props.serviceId;
        const selectConnectionId = (state, props) => props.connectionId;

        const selectMode = (state, props) => props.connection ? 'edit' : 'create';
        const selectConnection = createConnectionSelector(selectConnectionId);

        const selectInitialValues = createSelector(
            selectConnection,
            selectMode,
            selectServiceId,
            (connection, mode, serviceId) => {
                //console.log(connection)
                if (mode === 'edit' && connection) {
                    const payload = {
                        method: connection.method,
                        contact_uri: connection.contact_uri,
                        auth_type_id: connection.sys_auth_type_id,
                        json_text: "",
                        connection_state: connection.sys_service_connection_state.name,
                        callback_uri: connection.callback_uri,
                        active: connection.active,
                        service_id: connection.cfg_service_id,
                        feilds: connection.json_text[Object.keys(connection.json_text)[0]],
                        sys_service_connection_body_type_id: connection.sys_service_connection_body_type_id
                    }
                    return payload;
                }
                return {
                    method: "",
                    contact_uri: "",
                    auth_type_id: "",
                    sys_service_connection_body_type_id: "",
                    json_text: "",
                    callback_uri: "",
                    active: "",
                    service_id: Number(serviceId),
                    feilds: [],
                }
            }
        )

        return (state, props) => ({

            authTypes: state.services.authTypesList,
            authTypesPending: state.services.authTypes.pending,

            bodyTypesList: state.services.bodyTypesList,
            stateTypesList: state.services.stateTypesList,

            // //create
            createConnectionPending: state.services.createConnection.pending,
            createConnectionError: state.services.createConnection.error,
            createConnectionErrorMessage: state.services.createConnection.errorMessage,
            feildTemplate: feild,

            //copy connection
            copyConnectionPending: state.services.copyConnection.pending,
            copyConnectionError: state.services.copyConnection.error,
            copyConnectionErrorMessage: state.services.copyConnection.errorMessage,

            //get 
            getConnectionPending: state.services.getConnection.pending,
            getConnectionError: state.services.getConnection.error,
            getConnectionErrorMessage: state.services.getConnection.errorMessage,

            //updateConnectionState 
            updateConnectionStatePending: state.services.updateConnectionState.pending,
            updateConnectionStatenError: state.services.updateConnectionState.error,
            updateConnectionStateMessage: state.services.updateConnectionState.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            serviceId: selectServiceId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listAuthTypes: listAuthTypes,
            listBodyTypes: listBodyTypes,
            listStateTypes: listStateTypes,
            createConnection: createConnection,
            copyConnection: copyConnection,
            listConnections: listConnections,
            getConnection: getConnection,
            resetTestServiceConnection: resetTestServiceConnection,
            updateConnectionState: updateConnectionState,
        }, dispatch)
    })
)(ConnectionEditDialogComponent);








