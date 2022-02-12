import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { createServiceOption, updateServiceOption, listServiceOptions } from 'store/actions/services';
import OptionEditDialogComponent from './OptionEditDialog.js';

export const OptionEditDialog = connect(
    () => {
        const selectServiceId = (state, props) => Number(props.serviceId);

        const selectMode = (state, props) => props.serviceOption ? 'edit' : 'create';
        const selectServiceOption = (state, props) => props.serviceOption;

        const selectInitialValues = createSelector(
            selectServiceOption,
            selectMode,
            selectServiceId,
            (serviceOption, mode, serviceId) => {
                if (mode === 'edit' && serviceOption) {
                    const payload = {
                        key: serviceOption.key,
                        default_value: serviceOption.default_value,
                        required: serviceOption.required,
                        default_only: serviceOption.default_only,
                        active: serviceOption.active,
                        cfg_service_id: serviceOption.cfg_service_id,
                        cfg_service_option_id: serviceOption.cfg_service_option_id,
                        created_at: serviceOption.created_at
                    }
                    return payload;
                }

                return {
                    key: '',
                    default_value: "",
                    required: false,
                    default_only: false,
                    active: true,
                    cfg_service_id: serviceId,
                }
            }
        )

        return (state, props) => ({
            //create
            createserviceOptionPending: state.services.createserviceOption.pending,
            createserviceOptionError: state.services.createserviceOption.error,
            createserviceOptionErrorMessage: state.services.createserviceOption.errorMessage,

            //update
            updateserviceOptionPending: state.services.updateserviceOption.pending,
            updateserviceOptionError: state.services.updateserviceOption.error,
            updateserviceOptionErrorMessage: state.services.updateserviceOption.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            createServiceOption: createServiceOption,
            updateServiceOption: updateServiceOption,
            listServiceOptions: listServiceOptions
        }, dispatch)
    })
)(OptionEditDialogComponent);








