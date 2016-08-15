"use strict";

import fs from "fs";
import path from "path";
import config from "saw-config";

class Bootstrapper {
    static bootstrap(app) {
        // Read directory content
        var files = fs.readdirSync(path.resolve(__dirname, "..", "config"));

        for (var key in files) {
            let file = files[key];

            // We make sure it's a javascript file (just in case)
            if (file.endsWith(".js") === false) {
                continue;
            }

            // Load and inject file data into config
            config.set(file.substr(0, file.length - 3), require(path.resolve(__dirname, "..", "config", file)).default);
        }
    }
}

export default Bootstrapper;