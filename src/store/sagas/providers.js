import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions/providers';
import * as API from '../api/providers';

function* list() {
    try {
        yield put({ type: actions.PROVIDERS_LIST_PENDING });
        const payload = yield call(API.getProviders);
        yield put({ type: actions.PROVIDERS_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.PROVIDERS_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listStates() {
    try {
        yield put({ type: actions.PROVIDERS_STATES_LIST_PENDING });
        const payload = yield call(API.getStates);
        yield put({ type: actions.PROVIDERS_STATES_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.PROVIDERS_STATES_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* create(action) {
    try {
        yield put({ type: actions.PROVIDERS_CREATE_PENDING });
        const {
            provider,
            callback
        } = action.payload;

        const newProvider = yield call(API.createProvider, provider);
        yield put({ type: actions.PROVIDERS_CREATE_FULFILLED, newProvider });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.PROVIDERS_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* update(action) {
    try {
        yield put({ type: actions.PROVIDERS_UPDATE_PENDING });
        const {
            provider,
            callback
        } = action.payload;

        const newProvider = yield call(API.updateProvider, provider);
        yield put({ type: actions.PROVIDERS_UPDATE_FULFILLED, newProvider });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.PROVIDERS_UPDATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* providerContacts(action) {
    try {
        const { providerId } = action.payload;
        yield put({ type: actions.PROVIDERS_CONTACTS_LIST_PENDING });
        const payload = yield call(API.getProviderContacts, providerId);
        yield put({ type: actions.PROVIDERS_CONTACTS_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.PROVIDERS_CONTACTS_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* get(action) {
    try {
        yield put({ type: actions.PROVIDERS_DETAILS_GET_PENDING });
        const { providerId } = action.payload;
        const payload = yield call(API.getProviderDetails, providerId);
        yield put({ type: actions.PROVIDERS_DETAILS_GET_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.PROVIDERS_DETAILS_GET_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listContactTypes() {
    try {
        yield put({ type: actions.PROVIDERS_CONTACT_TYPES_PENDING });
        const payload = yield call(API.getContactTypes);
        yield put({ type: actions.PROVIDERS_CONTACT_TYPES_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.PROVIDERS_CONTACT_TYPES_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* createContact(action) {
    try {
        yield put({ type: actions.PROVIDERS_CONTACT_CREATE_PENDING });
        const {
            contact,
            callback
        } = action.payload;

        yield call(API.createContact, contact);
        yield put({ type: actions.PROVIDERS_CONTACT_CREATE_FULFILLED });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.PROVIDERS_CONTACT_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* updateContact(action) {
    try {
        yield put({ type: actions.PROVIDERS_CONTACT_UPDATE_PENDING });
        const {
            contact,
            callback
        } = action.payload;

        yield call(API.updateContact, contact);
        yield put({ type: actions.PROVIDERS_CONTACT_UPDATE_FULFILLED });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.PROVIDERS_CONTACT_UPDATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* listContactMapping(action) {
    try {
        const { providerId } = action.payload;
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_LIST_PENDING });
        const payload = yield call(API.getContactsMapping, providerId);
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* createContactMapping(action) {
    try {
        const { contact, callback } = action.payload;

        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_CREATE_PENDING });
        yield call(API.createContactMapping, contact);
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_CREATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* updateContactMapping(action) {
    try {
        const { contact, callback } = action.payload;

        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_UPDATE_PENDING });
        yield call(API.updateContactMapping, contact);
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_UPDATE_FULFILLED });

        callback?.();
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.PROVIDERS_CONTACT_MAPPING_UPDATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}


export function* reset() {
    yield put({ type: actions.RESET_PROVIDERS });
}

export default function* () {
    yield takeEvery(actions.PROVIDERS_LIST, list);
    yield takeEvery(actions.PROVIDERS_STATES_LIST, listStates);
    yield takeEvery(actions.PROVIDERS_CREATE, create);
    yield takeEvery(actions.PROVIDERS_UPDATE, update);
    yield takeEvery(actions.PROVIDERS_DETAILS_GET, get);
    yield takeEvery(actions.PROVIDERS_CONTACTS_LIST, providerContacts);
    yield takeEvery(actions.PROVIDERS_CONTACT_TYPES_LIST, listContactTypes);
    yield takeEvery(actions.PROVIDERS_CONTACT_CREATE, createContact);
    yield takeEvery(actions.PROVIDERS_CONTACT_UPDATE, updateContact);
    yield takeEvery(actions.PROVIDERS_CONTACT_MAPPING_LIST, listContactMapping);
    yield takeEvery(actions.PROVIDERS_CONTACT_MAPPING_CREATE, createContactMapping);
    yield takeEvery(actions.PROVIDERS_CONTACT_MAPPING_UPDATE, updateContactMapping);
}