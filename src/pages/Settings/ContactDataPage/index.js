import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import ContactDataPageComponent from './ContactDataPage.js';
import { listContactDataTypes } from 'store/actions/settings';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import BooleanColumnFilter from 'common/dataTable/filters/BooleanColumnFilter';
import { dangerColor, successColor } from "assets/jss/material-dashboard-pro-react.js";

const selectFields = createSelector(
    () => [
        { Header: "ID", accessor: "cfg_contact_detail_type_id", onClick: true },
        { Header: "Key", accessor: "key", onClick: true },
        {
            Header: "Active",
            accessor: "active",
            Filter: BooleanColumnFilter,
            filter: 'equals',
            switchLabel: "Active",
            style: {
                'text-align': 'center',
            },
            Cell: ({ row: { original: { active } } }) => {
                return (
                    <>
                        {active && <CheckIcon style={{ color: successColor[0] }} />}
                        {!active && <CloseIcon style={{ color: dangerColor[0] }} />}
                    </>

                )
            },
        },
    ]
);

export const ContactDataPage =
    connect(
        (state) => ({
            contactDataTypesPending: state.settings.contactDataTypes.pending,
            data: state.settings.contactDataTypesList,
            fields: selectFields(state),
        }),
        (dispatch) => ({
            actions: bindActionCreators({
                listContactDataTypes: listContactDataTypes,
            }, dispatch)
        })
    )(ContactDataPageComponent);