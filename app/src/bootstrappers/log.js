"use strict";

class Bootstrapper {
    static bootstrap(app) {
        // TODO:
        app.on("error", (error, ctx) => {
            // switch (config.get('app.log')) {
            //     case 'single':
            //         break;
            //     case 'daily' :
            //         break;
            //     case 'multiple':
            //         var log_max_files = config.get('app.log_max_files');
            //         break;
            // }

            // console.log(ctx);
        });

        // app.use(async () => {
        //     throw new Error('hello');
        // });
    }
}

export default Bootstrapper;