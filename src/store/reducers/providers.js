import { createReducer } from '../../util';
import * as actions from '../actions/providers';

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
    data: [],
    statesList: [],
    providerContactsList: [],
    contactTypesList: [],
    providerContactsMappingList: [],
    list: {
        ...initialStatusState,
    },
    states: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    },
    update: {
        ...initialStatusState,
    },
    get: {
        ...initialStatusState,
    },
    providerContacts: {
        ...initialStatusState,
    },
    contactTypes: {
        ...initialStatusState,
    },
    createContact: {
        ...initialStatusState,
    },
    updateContact: {
        ...initialStatusState,
    },
    providerContactsMapping: {
        ...initialStatusState,
    },
    createMappingContact: {
        ...initialStatusState,
    },
    updateMappingContact: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.PROVIDERS_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: data,
    }),
    [actions.PROVIDERS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_STATES_LIST_PENDING]: (state) => ({
        ...state,
        states: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_STATES_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        states: {
            ...initialStatusState,
        },
        statesList: [
            ...data,
        ]
    }),
    [actions.PROVIDERS_STATES_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        states: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CREATE_PENDING]: (state) => ({
        ...state,
        create: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CREATE_FULFILLED]: (state) => ({
        ...state,
        create: {
            ...initialStatusState,
        }
    }),
    [actions.PROVIDERS_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_UPDATE_PENDING]: (state) => ({
        ...state,
        update: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_UPDATE_FULFILLED]: (state) => ({
        ...state,
        update: {
            ...initialStatusState,
        }
    }),
    [actions.PROVIDERS_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        update: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_DETAILS_GET_PENDING]: (state) => ({
        ...state,
        get: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_DETAILS_GET_FULFILLED]: (state, { data }) => ({
        ...state,
        get: {
            ...initialStatusState,
        },
        ...addObjectIfNotExist(state, data),
    }),
    [actions.PROVIDERS_DETAILS_GET_REJECTED]: (state, errorMessage) => ({
        ...state,
        get: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CONTACTS_LIST_PENDING]: (state) => ({
        ...state,
        providerContacts: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACTS_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        providerContacts: {
            ...initialStatusState,
        },
        providerContactsList: data,
    }),
    [actions.PROVIDERS_CONTACTS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        providerContacts: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_RESET_CONTACTS_LIST]: (state) => ({
        ...state,
        providerContactsList: [],
    }),
    [actions.PROVIDERS_CONTACT_TYPES_PENDING]: (state) => ({
        ...state,
        contactTypes: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACT_TYPES_FULFILLED]: (state, { data }) => ({
        ...state,
        contactTypes: {
            ...initialStatusState,
        },
        contactTypesList: [
            ...data,
        ]
    }),
    [actions.PROVIDERS_CONTACT_TYPES_REJECTED]: (state, errorMessage) => ({
        ...state,
        contactTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CONTACT_CREATE_PENDING]: (state) => ({
        ...state,
        createContact: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACT_CREATE_FULFILLED]: (state) => ({
        ...state,
        createContact: {
            ...initialStatusState,
        }
    }),
    [actions.PROVIDERS_CONTACT_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        createContact: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CONTACT_UPDATE_PENDING]: (state) => ({
        ...state,
        updateContact: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACT_UPDATE_FULFILLED]: (state) => ({
        ...state,
        updateContact: {
            ...initialStatusState,
        }
    }),
    [actions.PROVIDERS_CONTACT_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateContact: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_CREATE_PENDING]: (state) => ({
        ...state,
        createMappingContact: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_CREATE_FULFILLED]: (state) => ({
        ...state,
        createMappingContact: {
            ...initialStatusState,
        }
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        createMappingContact: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_UPDATE_PENDING]: (state) => ({
        ...state,
        updateMappingContact: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_UPDATE_FULFILLED]: (state) => ({
        ...state,
        updateMappingContact: {
            ...initialStatusState,
        }
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateMappingContact: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_LIST_PENDING]: (state) => ({
        ...state,
        providerContactsMapping: {
            pending: true,
        },
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        providerContactsMapping: {
            ...initialStatusState,
        },
        providerContactsMappingList: data,
    }),
    [actions.PROVIDERS_CONTACT_MAPPING_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        providerContactsMapping: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),


    [actions.RESET_PROVIDERS]: () => ({ ...initialState }),
});