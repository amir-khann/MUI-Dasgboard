import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";
import { createProviderContactMapping, updateProviderContactMapping, getContactsMapping } from 'store/actions/providers';
import { listContactDataTypes } from 'store/actions/settings';
import ContactEditDialogComponent from './ContactEditDialog.js';

export const ContactEditDialog = withRouter(connect(
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
                        key: "",
                        active: true,
                        cfg_provider_id: Number(providerId),
                        cfg_contact_detail_type_id: ''
                    }
                    return payload;
                }

                return {
                    key: "",
                    active: true,
                    cfg_provider_id: Number(providerId),
                    cfg_contact_detail_type_id: ''
                }
            }
        )

        return (state, props) => ({

            contactDataTypes: state.settings.contactDataTypesList,

            //create
            createMappingContactPending: state.providers.createMappingContact.pending,
            createMappingContactError: state.providers.createMappingContact.error,
            createMappingContactErrorMessage: state.providers.createMappingContact.errorMessage,

            // edit
            updateMappingContactPending: state.providers.updateMappingContact.pending,
            updateMappingContactError: state.providers.updateMappingContact.error,
            updateMappingContactErrorMessage: state.providers.updateMappingContact.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            providerId: selectProviderId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            getContactsMapping,
            listContactDataTypes,
            createProviderContactMapping,
            updateProviderContactMapping,
        }, dispatch)
    })
)(ContactEditDialogComponent));








