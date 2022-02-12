import { createSelector } from 'reselect';

export const selectProvidersList = (state) => state.providers.data;

export const selectStateList = (state) => state.providers.statesList;

export const selectProviderscontactTypesList = (state) => state.providers.contactTypesList;

export const selectProvidersContactsList = (state) => state.providers.providerContactsList;

export const selectProviderContactsMapping = (state) => state.providers.providerContactsMappingList;

export const selectProviders = createSelector(
    selectProvidersList,
    (providers) => providers,
);

export const selectContactTypes = createSelector(
    selectProviderscontactTypesList,
    (types) => types,
);

export const createProviderSelector = (selectProviderId) => createSelector(
    selectProviderId,
    selectProviders,
    (providerId, providers) => providers.find((provider) => provider.cfg_provider_id === parseInt(providerId))
);

export const selectContactsMapping = createSelector(
    selectProviderContactsMapping,
    (contactsMapping) => contactsMapping,
);
