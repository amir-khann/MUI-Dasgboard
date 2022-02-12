import { createSelector } from 'reselect';

import {
    HEADERS_JSON_SEND,
    HEADERS_JSON_RECEIVE,
    HEADERS_JSON_SEND_RECEIVE,
} from '../constants/api';

export const selectAuthHeaders = () => {
    //const authToken = fromLocalStorage('authToken', null);
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJlbWFpbCI6ImhlbGl1bSIsImlzQWRtaW4iOmZhbHNlLCJleHAiOjE2NjMwMDkwMzF9.R30ELTOZQHsi-PSPTUj039xTb2EoSDPyqms-s1yqCTk';
    if (authToken) {
        return { 'Authorization': `Bearer ${authToken}` };
    }
    return { 'Authorization': 'NULL' };
}

const selectAuthHeadersMerge = (baseHeaders) => createSelector(
    selectAuthHeaders,
    (headers) => ({
        ...baseHeaders,
        ...headers,
    })
);

export const selectAuthSendJsonHeaders = selectAuthHeadersMerge(HEADERS_JSON_SEND);
export const selectAuthReceiveJsonHeaders = selectAuthHeadersMerge(HEADERS_JSON_RECEIVE);
export const selectAuthSendReceiveJsonHeaders = selectAuthHeadersMerge(HEADERS_JSON_SEND_RECEIVE);