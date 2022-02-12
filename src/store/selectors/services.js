import { createSelector } from 'reselect';

export const selectServicesList = (state) => state.services.data;

export const selectConnectionsList = (state) => state.services.connectionsList;

export const selectServiceContactList = (state) => state.services.serviceContactDetailList;

export const selectServices = createSelector(
    selectServicesList,
    (services) => services,
);

export const selectConnections = createSelector(
    selectConnectionsList,
    (connections) => connections,
);

export const createConnectionSelector = (selectConnectionId) => createSelector(
    selectConnectionId,
    selectConnections,
    (connectionId, connections) => connections.find((connection) => connection.cfg_service_connection_id === Number(connectionId))
);

export const selectServiceContacts = createSelector(
    selectServiceContactList,
    (contacts) => contacts,
);

