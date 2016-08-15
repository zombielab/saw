"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _sawConfig = require("saw-config");

var _sawConfig2 = _interopRequireDefault(_sawConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bootstrapper {
    static bootstrap(app) {
        // Read directory content
        var files = _fs2.default.readdirSync(_path2.default.resolve(__dirname, "..", "config"));

        for (var key in files) {
            let file = files[key];

            // We make sure it's a javascript file (just in case)
            if (file.endsWith(".js") === false) {
                continue;
            }

            // Load and inject file data into config
            _sawConfig2.default.set(file.substr(0, file.length - 3), require(_path2.default.resolve(__dirname, "..", "config", file)).default);
        }
    }
}

exports.default = Bootstrapper;
//# sourceMappingURL=config.js.map