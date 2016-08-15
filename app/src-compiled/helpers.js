"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const Helpers = {};

/**
 * 
 * @param key
 * @param defaultValue
 * @returns {*}
 */
Helpers["env"] = (key, defaultValue = "") => {
    var value = object_get(process.env, key, defaultValue);

    switch (value) {
        case "":
            value = null;
            break;
        case "undefined":
            value = undefined;
            break;
        case "true":
            value = true;
            break;
        case "false":
            value = false;
            break;
    }

    return value;
};

exports.default = Helpers;
//# sourceMappingURL=helpers.js.map