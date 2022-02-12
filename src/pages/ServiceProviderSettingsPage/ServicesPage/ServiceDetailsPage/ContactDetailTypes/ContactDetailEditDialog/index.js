import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";
import { listServiceContacts, createServiceContact, updateServiceContact } from 'store/actions/services';
import { listContactDataTypes } from 'store/actions/settings';
import ContactEditDialogComponent from './ContactDetailEditDialog.js';

export const ContactDetailEditDialog = withRouter(connect(
    () => {
        const selectserviceId = (state, props) => props.serviceId;

        const selectMode = (state, props) => props.contactDetailType ? 'edit' : 'create';
        const selectContactDetailType = (state, props) => props.contactDetailType;

        const selectInitialValues = createSelector(
            selectContactDetailType,
            selectMode,
            selectserviceId,
            (contactDetailType, mode, serviceId) => {
                if (mode === 'edit' && contactDetailType) {
                    const payload = {
                        cfg_service_contact_detail_type_id: contactDetailType.cfg_service_contact_detail_type_id,
                        key: contactDetailType.key,
                        active: contactDetailType.active,
                        is_contact_correlation_key: contactDetailType.is_contact_correlation_key,
                        cfg_contact_detail_type_id: contactDetailType.cfg_contact_detail_type_id,
                        cfg_service_id: contactDetailType.cfg_service_id
                    }
                    return payload;
                }

                return {
                    key: '',
                    active: true,
                    is_contact_correlation_key: true,
                    cfg_contact_detail_type_id: '',
                    cfg_service_id: Number(serviceId)
                }
            }
        )

        return (state, props) => ({

            contactDataTypes: state.settings.contactDataTypesList,

            //create
            createServiceContactPending: state.services.createserviceContact.pending,
            createServiceContactError: state.services.createserviceContact.error,
            createServiceContactErrorMessage: state.services.createserviceContact.errorMessage,

            // edit
            updateServiceContactPending: state.services.updateserviceContact.pending,
            updateServiceContactError: state.services.updateserviceContact.error,
            updateServiceContactMessage: state.services.updateserviceContact.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            serviceId: selectserviceId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listContactDataTypes,
            createServiceContact,
            updateServiceContact,
            listServiceContacts
        }, dispatch)
    })
)(ContactEditDialogComponent));








