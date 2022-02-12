import { createReducer } from '../../util';
import * as actions from '../actions/settings';

const addObjectIfNotExist = (state, provider) => {
    const data = state.data;
    const { cfg_provider_id } = provider;

    const providerExist = data.find(x => x.cfg_provider_id === cfg_provider_id);
    if (!providerExist) {
        return {
            data: [...state.data, provider]
        }
    }
};

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    contactDataTypesList: [],
    contactDataTypes: {
        ...initialStatusState,
    },
    createContactDataType: {
        ...initialStatusState,
    },
    updateContactDataType: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.SETTINGS_CONTACT_DATA_TYPES_LIST_PENDING]: (state) => ({
        ...state,
        contactDataTypes: {
            pending: true,
        },
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        contactDataTypes: {
            ...initialStatusState,
        },
        contactDataTypesList: data,
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        contactDataTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_CREATE_PENDING]: (state) => ({
        ...state,
        createContactDataType: {
            pending: true,
        },
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_CREATE_FULFILLED]: (state) => ({
        ...state,
        createContactDataType: {
            ...initialStatusState,
        }
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        createContactDataType: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE_PENDING]: (state) => ({
        ...state,
        updateContactDataType: {
            pending: true,
        },
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE_FULFILLED]: (state) => ({
        ...state,
        updateContactDataType: {
            ...initialStatusState,
        }
    }),
    [actions.SETTINGS_CONTACT_DATA_TYPES_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateContactDataType: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.RESET_SETTINGS]: () => ({ ...initialState }),
});