import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { getContactsMapping } from 'store/actions/providers';
import { selectContactsMapping } from 'store/selectors/providers';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router";
import BooleanColumnFilter from 'common/dataTable/filters/BooleanColumnFilter';
import { dangerColor, successColor } from "assets/jss/material-dashboard-pro-react.js";
import ContactDataDefaultsComponent from './ContactDataDefaults.js';

const selectFields = createSelector(
    () => [
        { Header: "ID", accessor: "cfg_provider_associate_id", onClick: true, style: { maxWidth: 80 } },
        { Header: "Key", accessor: "key" },
        {
            Header: "Active",
            accessor: "active",
            Filter: BooleanColumnFilter,
            filter: 'equals',
            switchLabel: "Active",
            style: {
                'text-align': 'center',
                maxWidth: 130
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

export const ContactDataDefaults = withRouter(connect(
    () => {
        const selectProviderId = (state, props) => props.match.params.providerId;
        const selectMode = (state, props) => props.match.params.providerId === 'new' ? 'create' : 'edit';

        return (state, props) => ({
            providersContactsPending: state.providers.providerContacts.pending,
            data: selectContactsMapping(state),
            fields: selectFields(state),

            providerId: selectProviderId(state, props),
            mode: selectMode(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            getContactsMapping
        }, dispatch)
    })
)(ContactDataDefaultsComponent));