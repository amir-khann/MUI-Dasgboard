import {
    METHOD_GET,
    METHOD_POST,
    METHOD_PUT,
    SERVER_URL,
} from '../constants/api';
import {
    headersAuthReceiveJson, headersAuthSendReceiveJson
} from '../headers';
import { apiHandleResponse } from '../../util/api';

const getServices = (providerId) => {
    return fetch(`${SERVER_URL}/api/v1/service/provider/${providerId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getServiceTypes = (providerId) => {
    return fetch(`${SERVER_URL}/api/v1/service/types`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getConnections = (serviceId) => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/${serviceId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createService = (service) => {
    return fetch(`${SERVER_URL}/api/v1/service`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(service)
    }).then(apiHandleResponse);
};

const getAuthTypes = () => {
    return fetch(`${SERVER_URL}/api/v1/auth/types`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const createServiceConnection = (connection) => {
    return fetch(`${SERVER_URL}/api/v1/service/connection`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(connection)
    }).then(apiHandleResponse);
};

const copyServiceConnection = (connectionId) => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/copy/${connectionId}`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify()
    }).then(apiHandleResponse);
};

const testServiceConnection = (connection) => {
    return fetch(`${SERVER_URL}/api/v1/test/service/connection`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(connection)
    }).then(apiHandleResponse);
};

const getServiceOptions = (serviceId) => {
    return fetch(`${SERVER_URL}/api/v1/service/${serviceId}/options`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const crearteServiceOption = (serviceOption) => {
    return fetch(`${SERVER_URL}/api/v1/service/options`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(serviceOption)
    }).then(apiHandleResponse);
};

const updateServiceOption = (serviceOption, optionId) => {
    return fetch(`${SERVER_URL}/api/v1/service/options/${optionId}`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(serviceOption)
    }).then(apiHandleResponse);
};

const getConnectionDetails = (connectionId) => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/details/${connectionId}`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const getConnectionResults = () => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/test/result/types`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const updateConnectionResult = (ConnectionResult) => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/test/result`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(ConnectionResult)
    }).then(apiHandleResponse);
};

const getBodyTypes = () => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/body/types`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const geStateTypes = () => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/state/types`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const updateConnectionState = (payload) => {
    return fetch(`${SERVER_URL}/api/v1/service/connection/state`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(payload)
    }).then(apiHandleResponse);
};

const getServiceContactDetail = (serviceId) => {
    return fetch(`${SERVER_URL}/api/v1/service/contact/detail/type/${serviceId}`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const createServiceContact = (contact) => {
    return fetch(`${SERVER_URL}/api/v1/service/contact/detail/type`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify([contact])
    }).then(apiHandleResponse);
};

const updateServiceContact = (contact) => {
    return fetch(`${SERVER_URL}/api/v1/service/contact/detail/type/${contact.cfg_service_contact_detail_type_id}`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify([contact])
    }).then(apiHandleResponse);
};

export {
    getServices,
    getConnections,
    getServiceTypes,
    createService,
    getAuthTypes,
    createServiceConnection,
    testServiceConnection,
    getServiceOptions,
    crearteServiceOption,
    updateServiceOption,
    getConnectionDetails,
    getConnectionResults,
    updateConnectionResult,
    getBodyTypes,
    geStateTypes,
    updateConnectionState,
    copyServiceConnection,
    getServiceContactDetail,
    createServiceContact,
    updateServiceContact,
};