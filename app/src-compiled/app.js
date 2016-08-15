"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sawConfig = require("saw-config");

var _sawConfig2 = _interopRequireDefault(_sawConfig);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $bootstrappers = ["./bootstrappers/environment", "./bootstrappers/config", "./bootstrappers/error", "./bootstrappers/log", "saw-view/src-compiled/saw-bootstrapper"],
    $booted = false;

class App extends _koa2.default {
    constructor() {
        super();
    }

    boot() {
        if ($booted === false) {
            for (var path of $bootstrappers) {
                var bootstrapper = require(path).default;

                bootstrapper.bootstrap(this);
            }
        }

        console.log("--booted");
    }

    run() {
        this.boot();

        this.listen(_sawConfig2.default.get("app.port", 3000));
    }
}

exports.default = App;
//# sourceMappingURL=app.js.map