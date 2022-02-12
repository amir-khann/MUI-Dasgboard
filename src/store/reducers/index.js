import { combineReducers } from 'redux';
import providers from './providers';
import settings from './settings';
import services from './services';

export const rootReducer = combineReducers({
    providers,
    settings,
    services,
});

export default rootReducer;