import { connect } from 'react-redux';
import ServiceDetailsPageComponent from './ServiceDetailsPage.js';

export const ServiceDetailsPage = connect(
    () => {
        const selectProviderId = (state, props) => props.match.params.providerId;
        const selectserviceId = (state, props) => props.match.params.serviceId;

        return (state, props) => ({
            providerId: selectProviderId(state, props),
            serviceId: selectserviceId(state, props),
        });
    }
)(ServiceDetailsPageComponent);