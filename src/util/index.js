/**
 * Utility method to create a reducer from a map,
 * with initial state
 * @param initialState
 * @param reducerMap
 * @returns {Function}
 */

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

/**
 * function to return the username from email address
 * @param email 
 * @returns username
 */
export function decodeEmail(email) {
    try {
        return email.replace(/@[^@]+$/, '');
    }
    catch {
        return email;
    }
}

export function extractMultipleValues (value) {
    if (value) {
        return value.split('\n').join(',');
    }
    return '';
}