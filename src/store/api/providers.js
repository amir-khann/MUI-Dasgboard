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

const getProviders = () => {
    return fetch(`${SERVER_URL}/api/v1/provider`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getStates = () => {
    return fetch(`${SERVER_URL}/api/v1/states`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createProvider = (provider) => {
    return fetch(`${SERVER_URL}/api/v1/provider`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(provider)
    }).then(apiHandleResponse);
};

const updateProvider = (provider) => {
    return fetch(`${SERVER_URL}/api/v1/provider`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(provider)
    }).then(apiHandleResponse);
};

const getProviderDetails = (providerId) => {
    return fetch(`${SERVER_URL}/api/v1/provider/${providerId}/details`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getProviderContacts = (providerId) => {
    return fetch(`${SERVER_URL}/api/v1/provider/${providerId}/associates`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getContactTypes = () => {
    return fetch(`${SERVER_URL}/api/v1/provider/associate/type`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createContact = (provider) => {
    return fetch(`${SERVER_URL}/api/v1/provider/associate`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(provider)
    }).then(apiHandleResponse);
};

const updateContact = (provider) => {
    return fetch(`${SERVER_URL}/api/v1/provider/associate`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(provider)
    }).then(apiHandleResponse);
};

const getContactsMapping = (providerId) => {
    return fetch(`${SERVER_URL}/api/v1/provider/label/${providerId}`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const createContactMapping = (contact) => {
    return fetch(`${SERVER_URL}/api/v1/provider/contact`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify([contact])
    }).then(apiHandleResponse);
};

const updateContactMapping = (contact) => {
    return fetch(`${SERVER_URL}/api/v1/service/contact/detail/type/${contact.cfg_service_contact_detail_type_id}`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify([contact])
    }).then(apiHandleResponse);
};

export {
    getProviders,
    getStates,
    createProvider,
    updateProvider,
    getProviderDetails,
    getProviderContacts,
    getContactTypes,
    createContact,
    updateContact,
    getContactsMapping,
    createContactMapping,
    updateContactMapping
};