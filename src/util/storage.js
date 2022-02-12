var localStorage = global.localStorage;

function toLocalStorage(key, value) {
    localStorage.setItem(key, value === null ? null : JSON.stringify(value));
}

function fromLocalStorage(key) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var string = localStorage.getItem(key);
    if (string === null || string === undefined) {
        return defaultValue;
    }
    try {
        return JSON.parse(string);
    } catch (error) {
        return null;
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

exports.toLocalStorage = toLocalStorage;
exports.fromLocalStorage = fromLocalStorage;
exports.clearLocalStorage = clearLocalStorage;