"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _helpers = require("saw-support/helpers");

var _helpers2 = _interopRequireDefault(_helpers);

var _helpers3 = require("../helpers");

var _helpers4 = _interopRequireDefault(_helpers3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bootstrapper {
    static bootstrap(app) {
        // Registering helpers to global scope
        _helpers2.default.object_extend(global, _helpers2.default);
        _helpers2.default.object_extend(global, _helpers4.default);

        // Now we"re gonna try to read .env file and inject parsed data into current process
        var content = _fs2.default.readFileSync(".env", "utf-8"),
            array = content.split("\n");

        for (var key in array) {
            let row = array[key],
                statement = row.trim();

            // Skip comments and empty rows
            if (statement.startsWith("#") === true || statement.length == 0) {
                continue;
            }

            let pair = statement.split("="),
                statementKey = pair.shift().trim(),
                statementValue = pair.join("=").trim();

            // Push parsed to current process
            process.env[statementKey] = statementValue;
        }
    }
}

exports.default = Bootstrapper;
//# sourceMappingURL=environment.js.map