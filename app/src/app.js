"use strict";

import config from "saw-config";
import Koa from "koa";

var $bootstrappers = [
        "./bootstrappers/environment",
        "./bootstrappers/config",
        "./bootstrappers/error",
        "./bootstrappers/log",

        "saw-view/src-compiled/saw-bootstrapper",
    ],
    $booted = false;

class App extends Koa {
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

        this.listen(config.get("app.port", 3000));
    }
}

export default App;