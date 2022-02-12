import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { listServiceTypes,create,list } from 'store/actions/services';
import ServiceEditDialogComponent from './ServiceEditDialog.js';

export const ServiceEditDialog = connect(
    () => {
        const selectProviderId = (state, props) => props.providerId;

        const selectMode = (state, props) => props.contact ? 'edit' : 'create';
        const selectContact = (state, props) => props.contact;

        const selectInitialValues = createSelector(
            selectContact,
            selectMode,
            selectProviderId,
            (contact, mode, providerId) => {
                if (mode === 'edit' && contact) {
                    const payload = {
                        name: contact.name,
                        associate_first_name: contact.associate_first_name,
                        cfg_provider_id: contact.cfg_provider_id,
                        sys_service_type_id: contact.sys_service_type_id,
                    }
                    return payload;
                }

                return {
                    name: "",
                    cfg_provider_id: Number(providerId),
                    sys_service_type_id: ""
                }
            }
        )

        return (state, props) => ({

            serviceTypes: state.services.serviceTypesList,
            serviceTypesPending: state.services.serviceTypes.pending,

            // //create
            createServicePending: state.services.create.pending,
            createServiceError: state.services.create.error,
            createServiceErrorMessage: state.services.create.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            providerId: selectProviderId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listServiceTypes: listServiceTypes,
            serviceCreate: create,
            servicesList: list,
        }, dispatch)
    })
)(ServiceEditDialogComponent);








