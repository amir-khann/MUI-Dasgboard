import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";

import { reduxSagaMiddleware, initSagas } from './sagas.js';

export default function configureStore(initialState = {}) {

    const reduxThunkMiddleware = thunk;

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = composeEnhancers(
        applyMiddleware(reduxSagaMiddleware, reduxThunkMiddleware),
    );

    const store = createStore(rootReducer, initialState, middleware);

    /**
     * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
     * @see https://github.com/rt2zz/redux-persist#persistor-object
    */
    const persistor = persistStore(store);

    initSagas();

    return {store, persistor};
}
