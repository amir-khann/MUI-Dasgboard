import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { withRouter } from "react-router";

import ContactDetailTypesComponent from './ContactDetailTypes.js';
import { listServiceContacts } from 'store/actions/services';
import { selectServiceContacts } from 'store/selectors/services';
import BooleanColumnFilter from 'common/dataTable/filters/BooleanColumnFilter';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { dangerColor, successColor } from "assets/jss/material-dashboard-pro-react.js";

const selectFields = createSelector(
    () => [
        { Header: "ID", accessor: "cfg_service_contact_detail_type_id", onClick: true },
        { Header: "Key", accessor: "key" },
        { Header: "Contact type", accessor: "cfg_contact_detail_types.key" },
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

export const ContactDetailTypes = withRouter(connect(
    () => {
        const selectProviderId = (state, props) => props.match.params.providerId;
        const selectserviceId = (state, props) => props.match.params.serviceId;


        return (state, props) => ({
            serviceContactDetailListPending: state.services.serviceContactDetail.pending,
            data: selectServiceContacts(state),
            fields: selectFields(state),

            providerId: selectProviderId(state, props),
            serviceId: selectserviceId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            listServiceContacts
        }, dispatch)
    })
)(ContactDetailTypesComponent));