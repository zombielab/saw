"use strict";

import statuses from "statuses";
import config from "saw-config";
import view from "saw-view";

class Bootstrapper {
    static bootstrap(app) {
        // Resetting default koa app error handler
        app.on("error", (error) => {
            app.onerror(error);
        });

        app.use(async(ctx, next) => {
            try {
                await next();

                if (ctx.status == 404) {
                    ctx.throw(404);
                }
            } catch (error) {
                // Setting error code
                if (error.code == "ENOENT") {
                    error.status = 404;
                }

                if (typeof error.status !== "number" || !statuses[error.status]) {
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
                            message: error.expose ? error.message : statuses[error.status]
                        };

                        // Pushing error stack into json response
                        if (config.get("app.debug") === true) {
                            ctx.body.debug = error.stack;
                        }
                        break;
                    case "text":
                        ctx.type = "text/plain";

                        // Showing error stack in browser
                        if (config.get("app.debug") === true) {
                            ctx.body = error.stack;
                        } else {
                            ctx.body = error.expose ? error.message : statuses[error.status];
                        }
                        break;
                    case "html":
                    default:
                        ctx.type = "text/html";

                        // Showing error stack in browser
                        if (config.get("app.debug") === true) {
                            ctx.body = "<pre>" + error.stack + "</pre>";
                        } else {
                            // Check if there is a view for the current error status
                            var exists = await view.exists(`error/${error.status}`);

                            // Then if it"s the case render the view
                            // And inject it to the response body
                            if (exists) {
                                ctx.body = await view.render(`error/${error.status}`);
                            } else {
                                ctx.type = "text/plain";
                                ctx.body = error.expose ? error.message : statuses[error.status];
                            }
                        }
                        break;
                }
            }
        });
    }
}

export default Bootstrapper;