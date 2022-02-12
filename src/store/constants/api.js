export const METHOD_GET = 'GET';
export const METHOD_PUT = 'PUT';
export const METHOD_POST = 'POST';
export const METHOD_DELETE = 'DELETE';

export const MIME_TYPE_JSON = 'application/json';

export const HEADERS_JSON_SEND = {
    'Content-Type': MIME_TYPE_JSON,
};

export const HEADERS_JSON_RECEIVE = {
    'Accept': MIME_TYPE_JSON,
};

export const HEADERS_JSON_SEND_RECEIVE = {
    ...HEADERS_JSON_SEND,
    ...HEADERS_JSON_RECEIVE,
};

export const SERVER_URL = process.env.REACT_APP_API_ENDPOINT;