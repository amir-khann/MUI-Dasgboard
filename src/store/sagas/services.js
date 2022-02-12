import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions/services';
import * as API from '../api/services';

function* list(action) {
    try {
        const { providerId } = action.payload;
        yield put({ type: actions.SERVICES_LIST_PENDING });
        const payload = yield call(API.getServices, providerId);
        yield put({ type: actions.SERVICES_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listConnections(action) {
    try {
        const { serviceId } = action.payload;
        yield put({ type: actions.SERVICES_CONNECTONS_LIST_PENDING });
        const payload = yield call(API.getConnections, serviceId);
        yield put({ type: actions.SERVICES_CONNECTONS_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_CONNECTONS_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listServiceTypes() {
    try {
        yield put({ type: actions.SERVICES_TYPES_LIST_PENDING });
        const payload = yield call(API.getServiceTypes);
        yield put({ type: actions.SERVICES_TYPES_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_TYPES_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* create(action) {
    try {
        yield put({ type: actions.SERVICES_CREATE_PENDING });
        const {
            service,
            callback
        } = action.payload;

        yield call(API.createService, service);
        yield put({ type: actions.SERVICES_CREATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listAuthTypes() {
    try {
        yield put({ type: actions.SERVICES_CONNECTION_AUTH_TYPES_PENDING });
        const payload = yield call(API.getAuthTypes);
        // console.log('=========================================')
        // console.log(payload)
        yield put({ type: actions.SERVICES_CONNECTION_AUTH_TYPES_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_CONNECTION_AUTH_TYPES_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* createConnection(action) {
    try {
        yield put({ type: actions.SERVICES_CONNECTION_CREATES_PENDING });
        const {
            serviceConnection,
            callback
        } = action.payload;

        yield call(API.createServiceConnection, serviceConnection);
        yield put({ type: actions.SERVICES_CONNECTION_CREATES_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_CONNECTION_CREATES_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* copyConnection(action) {
    try {
        yield put({ type: actions.SERVICES_CONNECTION_COPY_PENDING });
        const {
            connectionId,
            callback
        } = action.payload;

        yield call(API.copyServiceConnection, connectionId);
        yield put({ type: actions.SERVICES_CONNECTION_COPY_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_CONNECTION_COPY_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listServiceOptions(action) {
    try {
        const { serviceId } = action.payload;
        yield put({ type: actions.SERVICES_OPTIONS_LIST_PENDING });
        const payload = yield call(API.getServiceOptions, serviceId);
        yield put({ type: actions.SERVICES_OPTIONS_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_OPTIONS_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* createServiceOption(action) {
    try {
        yield put({ type: actions.SERVICES_OPTION_CREATE_PENDING });
        const {
            serviceOption,
            callback
        } = action.payload;

        yield call(API.crearteServiceOption, serviceOption);
        yield put({ type: actions.SERVICES_OPTION_CREATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_OPTION_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* updateServiceOption(action) {
    try {
        yield put({ type: actions.SERVICES_OPTION_UPDATE_PENDING });
        const {
            serviceOption,
            optionId,
            callback
        } = action.payload;

        yield call(API.updateServiceOption, serviceOption, optionId);
        yield put({ type: actions.SERVICES_OPTION_UPDATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_OPTION_UPDATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* getConnectionDetails(action) {
    try {
        const { connectionId } = action.payload;
        yield put({ type: actions.SERVICES_CONNECTION_GET_PENDING });
        const payload = yield call(API.getConnectionDetails, connectionId);
        yield put({ type: actions.SERVICES_CONNECTION_GET_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_CONNECTION_GET_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* testServiceConnection(action) {
    try {
        const { connection, callback } = action.payload;
        yield put({ type: actions.SERVICES_CONNECTION_TEST_PENDING });
        const payload = yield call(API.testServiceConnection, connection);
        //console.log('===========come here==========')
        //console.log(payload)
        yield put({ type: actions.SERVICES_CONNECTION_TEST_FULFILLED, payload });

        callback?.();
    } catch (error) {
        const { payload } = error;
        yield put({ type: actions.SERVICES_CONNECTION_TEST_REJECTED, payload: payload });
        //yield call(sessionErrorHandling, error);
    }
}

function* listResultsType() {
    try {
        yield put({ type: actions.SERVICES_CONNECTION_RESULTS_PENDING });
        const payload = yield call(API.getConnectionResults);
        yield put({ type: actions.SERVICES_CONNECTION_RESULTS_FULFILLED, payload });
    } catch (error) {
        const { payload } = error;
        yield put({ type: actions.SERVICES_CONNECTION_RESULTS_REJECTED, payload: payload });
        //yield call(sessionErrorHandling, error);
    }
}

function* updateConnectionResult(action) {
    try {
        const { ConnectionResult, callback } = action.payload;
        yield put({ type: actions.SERVICES_CONNECTION_RESULT_UPDATE_PENDING });
        const payload = yield call(API.updateConnectionResult, ConnectionResult);
        yield put({ type: actions.SERVICES_CONNECTION_RESULT_UPDATE_FULFILLED, payload });

        callback?.()
    } catch (error) {
        const { payload } = error;
        yield put({ type: actions.SERVICES_CONNECTION_RESULT_UPDATE_REJECTED, payload: payload });
        //yield call(sessionErrorHandling, error);
    }
}

function* listBodyTypes() {
    try {
        yield put({ type: actions.SERVICES_CONNECTION_BODY_TYPES_PENDING });
        const payload = yield call(API.getBodyTypes);
        yield put({ type: actions.SERVICES_CONNECTION_BODY_TYPES_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_CONNECTION_BODY_TYPES_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listStateTypes() {
    try {
        yield put({ type: actions.SERVICES_CONNECTION_STATE_TYPES_PENDING });
        const payload = yield call(API.geStateTypes);
        yield put({ type: actions.SERVICES_CONNECTION_STATE_TYPES_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_CONNECTION_STATE_TYPES_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* changeConnectionState(action) {
    try {
        const { connectionState, callback } = action.payload;
        yield put({ type: actions.SERVICES_CONNECTION_STATE_UPDATE_PENDING });
        const payload = yield call(API.updateConnectionState, connectionState);
        yield put({ type: actions.SERVICES_CONNECTION_STATE_UPDATE_FULFILLED, payload });

        callback?.()
    } catch (error) {
        const { payload } = error;
        yield put({ type: actions.SERVICES_CONNECTION_STATE_UPDATE_REJECTED, payload: payload });
        //yield call(sessionErrorHandling, error);
    }
}

function* listServiceContacts(action) {
    try {
        const { serviceId } = action.payload;
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_LIST_PENDING });
        const payload = yield call(API.getServiceContactDetail, serviceId);
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* createServiceContact(action) {
    try {
        const { contact, callback } = action.payload;

        yield put({ type: actions.SERVICES_CONTACT_DETAIL_CREATE_PENDING });
        yield call(API.createServiceContact, contact);
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_CREATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* updateServiceContact(action) {
    try {
        const { contact, callback } = action.payload;

        yield put({ type: actions.SERVICES_CONTACT_DETAIL_UPDATE_PENDING });
        yield call(API.updateServiceContact, contact);
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_UPDATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SERVICES_CONTACT_DETAIL_UPDATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

export function* reset() {
    yield put({ type: actions.RESET_SERVICES });
}

export default function* () {
    yield takeEvery(actions.SERVICES_LIST, list);
    yield takeEvery(actions.SERVICES_CONNECTONS_LIST, listConnections);
    yield takeEvery(actions.SERVICES_TYPES_LIST, listServiceTypes);
    yield takeEvery(actions.SERVICES_CREATE, create);
    yield takeEvery(actions.SERVICES_CONNECTION_AUTH_TYPES, listAuthTypes);
    yield takeEvery(actions.SERVICES_CONNECTION_CREATES, createConnection);
    yield takeEvery(actions.SERVICES_OPTIONS_LIST, listServiceOptions);
    yield takeEvery(actions.SERVICES_OPTION_CREATE, createServiceOption);
    yield takeEvery(actions.SERVICES_OPTION_UPDATE, updateServiceOption);
    yield takeEvery(actions.SERVICES_CONNECTION_GET, getConnectionDetails);
    yield takeEvery(actions.SERVICES_CONNECTION_TEST, testServiceConnection);
    yield takeEvery(actions.SERVICES_CONNECTION_RESULTS, listResultsType);
    yield takeEvery(actions.SERVICES_CONNECTION_RESULT_UPDATE, updateConnectionResult);
    yield takeEvery(actions.SERVICES_CONNECTION_BODY_TYPES, listBodyTypes);
    yield takeEvery(actions.SERVICES_CONNECTION_STATE_TYPES, listStateTypes);
    yield takeEvery(actions.SERVICES_CONNECTION_STATE_UPDATE, changeConnectionState);
    yield takeEvery(actions.SERVICES_CONNECTION_COPY, copyConnection);
    yield takeEvery(actions.SERVICES_CONTACT_DETAIL_LIST, listServiceContacts);
    yield takeEvery(actions.SERVICES_CONTACT_DETAIL_CREATE, createServiceContact);
    yield takeEvery(actions.SERVICES_CONTACT_DETAIL_UPDATE, updateServiceContact);
}