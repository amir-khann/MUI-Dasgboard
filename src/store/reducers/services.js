import { createReducer } from '../../util';
import * as actions from '../actions/services';

const updateObjectIfExist = (state, connection) => {
    const data = state.connectionsList;
    const { cfg_service_connection_id } = connection;

    let objIndex = data.findIndex((v => v.cfg_service_connection_id === cfg_service_connection_id));
    if (objIndex >= 0) {
        data[objIndex] = connection;
    }

    return {
        connectionsList: [...data]
    }
};


const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    data: [],
    list: {
        ...initialStatusState,
    },
    connectionsList: [],
    serviceTypesList: [],
    authTypesList: [],
    serviceOptionsList: [],
    serviceContactDetailList: [],
    connectionResultTypesList: [],
    bodyTypesList: [],
    stateTypesList: [],
    testConnectionData: null,
    connections: {
        ...initialStatusState,
    },
    serviceTypes: {
        ...initialStatusState,
    },
    authTypes: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    },
    update: {
        ...initialStatusState,
    },
    createConnection: {
        ...initialStatusState,
    },
    copyConnection: {
        ...initialStatusState,
    },
    serviceOptions: {
        ...initialStatusState,
    },
    serviceContactDetail: {
        ...initialStatusState,
    },
    createserviceOption: {
        ...initialStatusState,
    },
    updateserviceOption: {
        ...initialStatusState,
    },
    getConnection: {
        ...initialStatusState,
    },
    testConnection: {
        ...initialStatusState,
    },
    connectionResultTypes: {
        ...initialStatusState,
    },
    updateConnectionResult: {
        ...initialStatusState,
    },
    bodyTypes: {
        ...initialStatusState,
    },
    stateTypes: {
        ...initialStatusState,
    },
    updateConnectionState: {
        ...initialStatusState,
    },
    createserviceContact: {
        ...initialStatusState,
    },
    updateserviceContact: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.SERVICES_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.SERVICES_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: data ? data : [],
    }),
    [actions.SERVICES_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTONS_LIST_PENDING]: (state) => ({
        ...state,
        connections: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTONS_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        connections: {
            ...initialStatusState,
        },
        connectionsList: [...data]
    }),
    [actions.SERVICES_CONNECTONS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        connections: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_TYPES_LIST_PENDING]: (state) => ({
        ...state,
        serviceTypes: {
            pending: true,
        },
    }),
    [actions.SERVICES_TYPES_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        serviceTypes: {
            ...initialStatusState,
        },
        serviceTypesList: data ? data : [],
    }),
    [actions.SERVICES_TYPES_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        serviceTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CREATE_PENDING]: (state) => ({
        ...state,
        create: {
            pending: true,
        },
    }),
    [actions.SERVICES_CREATE_FULFILLED]: (state) => ({
        ...state,
        create: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_AUTH_TYPES_PENDING]: (state) => ({
        ...state,
        authTypes: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_AUTH_TYPES_FULFILLED]: (state, { data }) => ({
        ...state,
        authTypes: {
            ...initialStatusState,
        },
        authTypesList: data ? data : [],
    }),
    [actions.SERVICES_CONNECTION_AUTH_TYPES_REJECTED]: (state, errorMessage) => ({
        ...state,
        authTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_CREATES_PENDING]: (state) => ({
        ...state,
        createConnection: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_CREATES_FULFILLED]: (state) => ({
        ...state,
        createConnection: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_CONNECTION_CREATES_REJECTED]: (state, errorMessage) => ({
        ...state,
        createConnection: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_COPY_PENDING]: (state) => ({
        ...state,
        copyConnection: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_COPY_FULFILLED]: (state) => ({
        ...state,
        copyConnection: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_CONNECTION_COPY_REJECTED]: (state, errorMessage) => ({
        ...state,
        copyConnection: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_OPTIONS_LIST_PENDING]: (state) => ({
        ...state,
        serviceOptions: {
            pending: true,
        },
    }),
    [actions.SERVICES_OPTIONS_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        serviceOptions: {
            ...initialStatusState,
        },
        serviceOptionsList: data ? data : [],
    }),
    [actions.SERVICES_OPTIONS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        serviceOptions: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_OPTION_CREATE_PENDING]: (state) => ({
        ...state,
        createserviceOption: {
            pending: true,
        },
    }),
    [actions.SERVICES_OPTION_CREATE_FULFILLED]: (state) => ({
        ...state,
        createserviceOption: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_OPTION_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        createserviceOption: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_OPTION_UPDATE_PENDING]: (state) => ({
        ...state,
        updateserviceOption: {
            pending: true,
        },
    }),
    [actions.SERVICES_OPTION_UPDATE_FULFILLED]: (state) => ({
        ...state,
        updateserviceOption: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_OPTION_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateserviceOption: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_GET_PENDING]: (state) => ({
        ...state,
        getConnection: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_GET_FULFILLED]: (state, { data }) => ({
        ...state,
        getConnection: {
            ...initialStatusState,
        },
        ...updateObjectIfExist(state, data),
    }),
    [actions.SERVICES_CONNECTION_GET_REJECTED]: (state, errorMessage) => ({
        ...state,
        getConnection: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_TEST_PENDING]: (state) => ({
        ...state,
        testConnection: {
            ...initialStatusState,
            pending: true,
        },
        testConnectionData: null,
    }),
    [actions.SERVICES_CONNECTION_TEST_FULFILLED]: (state, { data }) => ({
        ...state,
        testConnection: {
            ...initialStatusState,
        },
        testConnectionData: data,
    }),
    [actions.SERVICES_CONNECTION_TEST_REJECTED]: (state, errorMessage) => ({
        ...state,
        testConnection: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
        testConnectionData: null,
    }),
    [actions.SERVICES_CONNECTION_TEST_RESET]: (state) => ({
        ...state,
        testConnection: {
            ...initialStatusState,
        },
        testConnectionData: null,
    }),
    [actions.SERVICES_CONNECTION_RESULTS_PENDING]: (state) => ({
        ...state,
        connectionResultTypes: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_RESULTS_FULFILLED]: (state, { data }) => ({
        ...state,
        connectionResultTypes: {
            ...initialStatusState,
        },
        connectionResultTypesList: data ? data : [],
    }),
    [actions.SERVICES_CONNECTION_RESULTS_REJECTED]: (state, errorMessage) => ({
        ...state,
        connectionResultTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_RESULT_UPDATE_PENDING]: (state) => ({
        ...state,
        updateConnectionResult: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_RESULT_UPDATE_FULFILLED]: (state, { data }) => ({
        ...state,
        updateConnectionResult: {
            ...initialStatusState,
        },
    }),
    [actions.SERVICES_CONNECTION_RESULT_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateConnectionResult: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_BODY_TYPES_PENDING]: (state) => ({
        ...state,
        bodyTypes: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_BODY_TYPES_FULFILLED]: (state, { data }) => ({
        ...state,
        bodyTypes: {
            ...initialStatusState,
        },
        bodyTypesList: data ? data : [],
    }),
    [actions.SERVICES_CONNECTION_BODY_TYPES_REJECTED]: (state, errorMessage) => ({
        ...state,
        bodyTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_STATE_TYPES_PENDING]: (state) => ({
        ...state,
        stateTypes: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_STATE_TYPES_FULFILLED]: (state, { data }) => ({
        ...state,
        stateTypes: {
            ...initialStatusState,
        },
        stateTypesList: data ? data : [],
    }),
    [actions.SERVICES_CONNECTION_STATE_TYPES_REJECTED]: (state, errorMessage) => ({
        ...state,
        stateTypes: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONNECTION_STATE_UPDATE_PENDING]: (state) => ({
        ...state,
        updateConnectionState: {
            ...initialStatusState,
            pending: true,
        },
    }),
    [actions.SERVICES_CONNECTION_STATE_UPDATE_FULFILLED]: (state, { data }) => ({
        ...state,
        updateConnectionState: {
            ...initialStatusState,
        },
    }),
    [actions.SERVICES_CONNECTION_STATE_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateConnectionState: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONTACT_DETAIL_LIST_PENDING]: (state) => ({
        ...state,
        serviceContactDetail: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONTACT_DETAIL_LIST_FULFILLED]: (state, { data }) => ({
        ...state,
        serviceContactDetail: {
            ...initialStatusState,
        },
        serviceContactDetailList: data ? data : [],
    }),
    [actions.SERVICES_CONTACT_DETAIL_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        serviceContactDetail: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONTACT_DETAIL_CREATE_PENDING]: (state) => ({
        ...state,
        createserviceContact: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONTACT_DETAIL_CREATE_FULFILLED]: (state) => ({
        ...state,
        createserviceContact: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_CONTACT_DETAIL_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        createserviceContact: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.SERVICES_CONTACT_DETAIL_UPDATE_PENDING]: (state) => ({
        ...state,
        updateserviceContact: {
            pending: true,
        },
    }),
    [actions.SERVICES_CONTACT_DETAIL_UPDATE_FULFILLED]: (state) => ({
        ...state,
        updateserviceContact: {
            ...initialStatusState,
        }
    }),
    [actions.SERVICES_CONTACT_DETAIL_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        updateserviceContact: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.RESET_SERVICES]: () => ({ ...initialState }),
});