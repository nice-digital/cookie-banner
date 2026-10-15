"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCookieControl = void 0;
var js_cookie_1 = __importDefault(require("js-cookie"));
var cookie_control_1 = require("./cookie-control");
var cookie_control_config_1 = require("./cookie-control-config");
require("./cookie-control.scss");
// Ensure the GTM dataLayer array exists, in case the cookie banner is loaded before GTM
var ensureDataLayer = function () {
    window.dataLayer = window.dataLayer || [];
};
// Ensure gtag() function exists as per https://developers.google.com/tag-platform/devguides/consent
var ensureGtag = function () {
    window.gtag =
        window.gtag ||
            function () {
                var _a;
                return (_a = window.dataLayer) === null || _a === void 0 ? void 0 : _a.push(
                // eslint-disable-next-line prefer-rest-params
                arguments);
            };
};
// Parse the cookie that gets set by Cookie Control ourselves.
// This allows the properties like CookieControl.preferenceCookies to be available
// even before the license has loaded asynchronously.
var parseCookieControlCookie = function () {
    var cookieStrValue = js_cookie_1.default.get("CookieControl");
    if (cookieStrValue) {
        var cookieControlCookie = JSON.parse(cookieStrValue);
        var analyticsCookies = cookieControlCookie.optionalCookies.analytics === "accepted", preferenceCookies = cookieControlCookie.optionalCookies.preferences === "accepted", marketingCookies = cookieControlCookie.optionalCookies.marketing === "accepted";
        cookie_control_1.CookieControl.analyticsCookies = analyticsCookies;
        cookie_control_1.CookieControl.preferenceCookies = preferenceCookies;
        cookie_control_1.CookieControl.marketingCookies = marketingCookies;
    }
    else {
        cookie_control_1.CookieControl.analyticsCookies =
            cookie_control_1.CookieControl.preferenceCookies =
                cookie_control_1.CookieControl.marketingCookies =
                    false;
    }
};
var loadCookieControl = function () {
    ensureDataLayer();
    ensureGtag();
    parseCookieControlCookie();
    cookie_control_1.CookieControl.load(cookie_control_config_1.cookieControlConfig);
};
exports.loadCookieControl = loadCookieControl;
//# sourceMappingURL=index.js.map