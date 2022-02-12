import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import {
    testServiceConnection, listResultsType, listConnections,
    updateConnectionResult, resetTestServiceConnection
} from 'store/actions/services';
import { createConnectionSelector } from 'store/selectors/services';
import ConnectionTestDialogComponent from './ConnectionTestDialog.js';

export const ConnectionTestDialog = connect(
    () => {
        const selectConnectionId = (state, props) => props.connectionId;
        const selectConnection = createConnectionSelector(selectConnectionId);

        const selectInitialValues = createSelector(
            selectConnection,
            (connection) => {
                let serviceOptions = [];

                if (connection && connection.service_option) {
                    let serviceOptions = connection.service_option.map((option) => {
                        return {
                            option_key: option.key,
                            option_value: {
                                value: option.default_value,
                                required: option.required,
                                dynamic_values: option.default_value.match(/{{[\w\d]+}}/g)
                                    .map(function (value) {
                                        let key = value.substring(2, value.length - 2);
                                        return {
                                            [`${key}`]: '',
                                            label: key
                                        }
                                    })
                            }
                        }
                    })

                    return {
                        serviceOptions,
                        sys_service_connection_test_result_type_id: ''
                    }
                }

                return {
                    serviceOptions,
                    sys_service_connection_test_result_type_id: ''
                }
            }
        )

        return (state, props) => ({

            updateConnectionResultPending: state.services.updateConnectionResult.pending,

            connectionResultTypesList: state.services.connectionResultTypesList,

            //test 
            testConnectionData: state.services.testConnectionData,
            testConnectionPending: state.services.testConnection.pending,
            testConnectionError: state.services.testConnection.error,
            testConnectionErrorMessage: state.services.testConnection.errorMessage,

            initialValues: selectInitialValues(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            testServiceConnection,
            listResultsType,
            updateConnectionResult,
            resetTestServiceConnection,
            listConnections
        }, dispatch)
    })
)(ConnectionTestDialogComponent);