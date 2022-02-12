import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";
import { getContacts, listAssociattypes, createContact, updateContact } from 'store/actions/providers';
import { selectContactTypes } from 'store/selectors/providers';
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
                        cfg_provider_associate_id: contact.cfg_provider_associate_id,
                        associate_first_name: contact.associate_first_name,
                        associate_last_name: contact.associate_last_name,
                        associate_email: contact.associate_email,
                        associate_phone: contact.associate_phone,
                        associate_notes: contact.associate_notes,
                        active: contact.active,
                        cfg_provider_id: contact.cfg_provider_id,
                        sys_provider_associate_type_id: contact.sys_provider_associate_type_id,
                        created_at: contact.created_at,
                    }
                    return payload;
                }

                return {
                    associate_first_name: "",
                    associate_last_name: "",
                    associate_email: "",
                    associate_phone: "",
                    associate_notes: "",
                    active: true,
                    cfg_provider_id: Number(providerId),
                    sys_provider_associate_type_id: ''
                }
            }
        )

        return (state, props) => ({

            contactTypes: selectContactTypes(state),

            //create
            createContactPending: state.providers.createContact.pending,
            createContactError: state.providers.createContact.error,
            createContactErrorMessage: state.providers.createContact.errorMessage,

            // edit
            updateContactPending: state.providers.updateContact.pending,
            updateContactError: state.providers.updateContact.error,
            updateContactErrorMessage: state.providers.updateContact.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            providerId: selectProviderId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listTypes: listAssociattypes,
            contactCreate: createContact,
            contactUpdate: updateContact,
            provideContactsList: getContacts,
        }, dispatch)
    })
)(ContactEditDialogComponent));








