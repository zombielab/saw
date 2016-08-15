"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _statuses = require("statuses");

var _statuses2 = _interopRequireDefault(_statuses);

var _sawConfig = require("saw-config");

var _sawConfig2 = _interopRequireDefault(_sawConfig);

var _sawView = require("saw-view");

var _sawView2 = _interopRequireDefault(_sawView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bootstrapper {
    static bootstrap(app) {
        // Resetting default koa app error handler
        app.on("error", error => {
            app.onerror(error);
        });

        app.use((() => {
            var _ref = (0, _asyncToGenerator3.default)(function* (ctx, next) {
                try {
                    yield next();

                    if (ctx.status == 404) {
                        ctx.throw(404);
                    }
                } catch (error) {
                    // Setting error code
                    if (error.code == "ENOENT") {
                        error.status = 404;
                    }

                    if (typeof error.status !== "number" || !_statuses2.default[error.status]) {
                        error.status = 500;
                    }

                    ctx.status = error.status;

                    // Delegating to app
                    ctx.app.emit("error", error, ctx);

                    switch (ctx.accepts("html", "text", "json")) {
                        case "json":
                            ctx.type = "application/json";
                            ctx.body = {
                                status: error.status,
                                message: error.expose ? error.message : _statuses2.default[error.status]
                            };

                            // Pushing error stack into json response
                            if (_sawConfig2.default.get("app.debug") === true) {
                                ctx.body.debug = error.stack;
                            }
                            break;
                        case "text":
                            ctx.type = "text/plain";

                            // Showing error stack in browser
                            if (_sawConfig2.default.get("app.debug") === true) {
                                ctx.body = error.stack;
                            } else {
                                ctx.body = error.expose ? error.message : _statuses2.default[error.status];
                            }
                            break;
                        case "html":
                        default:
                            ctx.type = "text/html";

                            // Showing error stack in browser
                            if (_sawConfig2.default.get("app.debug") === true) {
                                ctx.body = "<pre>" + error.stack + "</pre>";
                            } else {
                                // Check if there is a view for the current error status
                                var exists = yield _sawView2.default.exists(`error/${ error.status }`);

                                // Then if it"s the case render the view
                                // And inject it to the response body
                                if (exists) {
                                    ctx.body = yield _sawView2.default.render(`error/${ error.status }`);
                                } else {
                                    ctx.type = "text/plain";
                                    ctx.body = error.expose ? error.message : _statuses2.default[error.status];
                                }
                            }
                            break;
                    }
                }
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    }
}

exports.default = Bootstrapper;
//# sourceMappingURL=error.js.map