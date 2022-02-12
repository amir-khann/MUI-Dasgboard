import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";
import { listStates, create, update, get } from 'store/actions/providers';
import { selectStateList, createProviderSelector } from 'store/selectors/providers';
import ProviderDetailsComponent from './ProviderDetails.js';

export const ProviderDetails = withRouter(connect(
    () => {
        const selectProviderId = (state, props) => props.match.params.providerId;
        const selectMode = (state, props) => props.match.params.providerId === 'new' ? 'create' : 'edit';

        const selectProvider = createProviderSelector(selectProviderId);

        const selectInitialValues = createSelector(
            selectMode,
            selectProvider,
            (mode, provider) => {
                if (mode === 'edit' && provider) {
                    const payload = {
                        cfg_provider_id: provider.cfg_provider_id,
                        legal_entity_name: provider.legal_entity_name,
                        legal_entity_nickname: provider.legal_entity_nickname,
                        legal_entity_address_1: provider.legal_entity_address_1,
                        legal_entity_address_2: provider.legal_entity_address_2,
                        legal_entity_zip: provider.legal_entity_zip,
                        legal_entity_phone: provider.legal_entity_phone,
                        sys_us_state_id: provider.sys_us_state_id ? provider.sys_us_state_id : '',


                        is_source_provider: provider.is_source_provider,
                        is_service_provider: provider.is_service_provider,
                        active: provider.active,

                        created_at: provider.created_at
                    }
                    return payload;
                }

                return {
                    legal_entity_name: '',
                    legal_entity_nickname: '',
                    legal_entity_address_1: '',
                    legal_entity_address_2: '',
                    legal_entity_zip: '',
                    legal_entity_phone: '',
                    sys_us_state_id: '',

                    is_source_provider: true,
                    is_service_provider: false,
                    active: false,
                }
            }
        )

        return (state, props) => ({

            states: selectStateList(state),

            //create
            providerCreatePending: state.providers.create.pending,
            providerCreateError: state.providers.create.error,
            providerCreateErrorMessage: state.providers.create.errorMessage,

            // edit
            providerUpdatePending: state.providers.update.pending,
            providerUpdateError: state.providers.update.error,
            providerUpdateErrorMessage: state.providers.update.errorMessage,

            // get
            providerGetPending: state.providers.get.pending,
            providerGetError: state.providers.get.error,
            providerGetErrorMessage: state.providers.get.errorMessage,

            providerStatesGetPending: state.providers.states.pending,
            providerStatesGetError: state.providers.states.error,
            providerStatesGetMessage: state.providers.states.errorMessage,



            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            providerId: selectProviderId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listStates: listStates,
            providerCreate: create,
            providerUpdate: update,
            providerGet: get,
        }, dispatch)
    })
)(ProviderDetailsComponent));








