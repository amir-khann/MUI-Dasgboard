import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions/settings';
import * as API from '../api/settings';

function* listContactDataTypes() {
    try {
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_LIST_PENDING });
        const payload = yield call(API.getContactDataTypes);
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* createContactDataType(action) {
    try {
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_CREATE_PENDING });
        const {
            dataType,
            callback
        } = action.payload;

        const newProvider = yield call(API.createContactDataType, dataType);
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_CREATE_FULFILLED, newProvider });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_CREATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* updateContactDataType(action) {
    try {
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE_PENDING });
        const {
            dataType,
            callback
        } = action.payload;

        const newProvider = yield call(API.updateContactDataType, dataType);
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE_FULFILLED, newProvider });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: 'Error occurred, please contact administrator.' };
        yield put({ type: actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

export function* reset() {
    yield put({ type: actions.RESET_SETTINGS });
}

export default function* () {
    yield takeEvery(actions.SETTINGS_CONTACT_DATA_TYPES_LIST, listContactDataTypes);
    yield takeEvery(actions.SETTINGS_CONTACT_DATA_TYPES_CREATE, createContactDataType);
    yield takeEvery(actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE, updateContactDataType);
}