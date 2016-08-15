"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    port: 3000,
    env: env('APP_ENV', 'development'),
    debug: env('APP_DEBUG', true),

    log: env('APP_LOG', 'single'),
    log_max_files: env('APP_LOG_MAX', 7),

    timezone: env('APP_TIMEZONE', 'UTC'),

    locale: env('APP_LOCALE', 'fr'),
    locale_fallback: env('APP_LOCALE_FALLBACK', 'en'),

    key: env('APP_KEY'),
    cipher: 'AES-256-CBC'
};
//# sourceMappingURL=app.js.map