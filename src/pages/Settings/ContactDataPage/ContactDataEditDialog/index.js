import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { createContactDataType, updateContactDataType, listContactDataTypes } from 'store/actions/settings';
import ContactDataEditDialogComponent from './ContactDataEditDialog.js';

export const ContactDataEditDialog = connect(
    () => {

        const selectMode = (state, props) => props.contactDataType ? 'edit' : 'create';
        const selectDataContactType = (state, props) => props.contactDataType;

        const selectInitialValues = createSelector(
            selectDataContactType,
            selectMode,
            (dataContactType, mode) => {
                if (mode === 'edit' && dataContactType) {
                    const payload = {
                        cfg_contact_detail_type_id: dataContactType.cfg_contact_detail_type_id,
                        key: dataContactType.key,
                        active: dataContactType.active,
                    }
                    return payload;
                }

                return {
                    key: "",
                    active: false,
                }
            }
        )

        return (state, props) => ({

            // //create
            createContactDataTypePending: state.settings.createContactDataType.pending,
            createContactDataTypeError: state.settings.createContactDataType.error,
            createContactDataTypeMessage: state.settings.createContactDataType.errorMessage,

            // // edit
            updateContactDataTypePending: state.settings.updateContactDataType.pending,
            updateContactDataTypeError: state.settings.updateContactDataType.error,
            updateContactDataTypeErrorMessage: state.settings.updateContactDataType.errorMessage,

            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            createContactDataType,
            updateContactDataType,
            listContactDataTypes,
        }, dispatch)
    })
)(ContactDataEditDialogComponent);








