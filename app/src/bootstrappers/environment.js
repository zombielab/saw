"use strict";

import fs from "fs";
import support_helpers from "saw-support/helpers";
import app_helpers from "../helpers";

class Bootstrapper {
    static bootstrap(app) {
        // Registering helpers to global scope
        support_helpers.object_extend(global, support_helpers);
        support_helpers.object_extend(global, app_helpers);

        // Now we"re gonna try to read .env file and inject parsed data into current process
        var content = fs.readFileSync(".env", "utf-8"),
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

export default Bootstrapper;