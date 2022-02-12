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

const getContactDataTypes = () => {
    return fetch(`${SERVER_URL}/api/v1/org/label`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createContactDataType = (dataType) => {
    return fetch(`${SERVER_URL}/api/v1/org/label`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(dataType)
    }).then(apiHandleResponse);
};

const updateContactDataType = (dataType) => {
    return fetch(`${SERVER_URL}/api/v1/org/label`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(dataType)
    }).then(apiHandleResponse);
};


export {
    getContactDataTypes,
    createContactDataType,
    updateContactDataType,
};