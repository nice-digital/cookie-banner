"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_control_config_1 = require("./cookie-control-config");
var cookie_control_1 = require("./cookie-control");
describe("cookie-control-config", function () {
    beforeEach(function () {
        window.dataLayer = [];
        window.gtag = jest.fn();
        cookie_control_1.CookieControl.getCategoryConsent = function (index) { return index === 0; };
    });
    it("should match snapshot", function () {
        expect(cookie_control_config_1.cookieControlConfig).toMatchSnapshot();
    });
    it("should remove analytics localStorage cookies on revoke", function () {
        window.dataLayer = [];
        window.localStorage.setItem("_hjtest", "true");
        window.localStorage.setItem("test", "true");
        var optionalCookies = cookie_control_config_1.cookieControlConfig.optionalCookies, analyticsCookies = optionalCookies.find(function (_a) {
            var name = _a.name;
            return name == "analytics";
        }), onRevoke = analyticsCookies.onRevoke;
        onRevoke();
        expect(window.localStorage.length).toBe(1);
        expect(window.localStorage.getItem("test")).toBe("true");
    });
    it("should push cookie.load dataLayer event on load", function () {
        var _a, _b;
        (_a = cookie_control_config_1.cookieControlConfig.onLoad) === null || _a === void 0 ? void 0 : _a.call(cookie_control_config_1.cookieControlConfig);
        expect(window.dataLayer).toHaveLength(1);
        expect((_b = window.dataLayer) === null || _b === void 0 ? void 0 : _b[0]).toEqual({
            event: "cookie.load",
            preferenceCookies: true,
            analyticsCookies: false,
            marketingCookies: false,
        });
    });
    it.each([
        ["preferences.accept", "onAccept", "preferenceCookies", true, 0],
        ["preferences.revoke", "onRevoke", "preferenceCookies", false, 0],
        ["analytics.accept", "onAccept", "analyticsCookies", true, 1],
        ["analytics.revoke", "onRevoke", "analyticsCookies", false, 1],
        ["marketing.accept", "onAccept", "marketingCookies", true, 2],
        ["marketing.revoke", "onRevoke", "marketingCookies", false, 2],
    ])("should pass %s event into the dataLayer %s %s", function (eventName, methodName, cookieType, boolVal, index) {
        var _a;
        var _b, _c;
        var cookieTypeConfig = (_b = cookie_control_config_1.cookieControlConfig.optionalCookies) === null || _b === void 0 ? void 0 : _b[index];
        if (cookieTypeConfig) {
            var method = cookieTypeConfig[methodName];
            if (method)
                method();
        }
        expect(window.dataLayer).toHaveLength(1);
        expect((_c = window.dataLayer) === null || _c === void 0 ? void 0 : _c[0]).toEqual((_a = {
                event: "cookie.".concat(eventName)
            },
            _a[cookieType] = boolVal,
            _a));
    });
    it.each([
        ["granted", "analytics_storage", "onAccept", 1],
        ["denied", "analytics_storage", "onRevoke", 1],
        ["granted", "ad_storage", "onAccept", 2],
        ["denied", "ad_storage", "onRevoke", 2],
    ])("should set %s gtag consent for %s %s", function (consentMode, eventName, methodName, index) {
        var _a;
        var _b;
        var cookieTypeConfig = (_b = cookie_control_config_1.cookieControlConfig.optionalCookies) === null || _b === void 0 ? void 0 : _b[index];
        if (cookieTypeConfig) {
            var method = cookieTypeConfig[methodName];
            if (method)
                method();
        }
        expect(window.gtag).toHaveBeenCalledTimes(1);
        expect(window.gtag).toHaveBeenCalledWith("consent", "update", (_a = {},
            _a[eventName] = consentMode,
            _a));
    });
    it.each([
        ["preferenceCookies", true, "onAccept", 0],
        ["preferenceCookies", false, "onRevoke", 0],
        ["analyticsCookies", true, "onAccept", 1],
        ["analyticsCookies", false, "onRevoke", 1],
        ["marketingCookies", true, "onAccept", 2],
        ["marketingCookies", false, "onRevoke", 2],
    ])("should set CookieControl.%s variable to %s %s", function (variableName, boolVal, methodName, index) {
        var _a;
        var cookieTypeConfig = (_a = cookie_control_config_1.cookieControlConfig.optionalCookies) === null || _a === void 0 ? void 0 : _a[index];
        if (cookieTypeConfig) {
            var method = cookieTypeConfig[methodName];
            if (method)
                method();
        }
        expect(cookie_control_1.CookieControl[variableName]).toEqual(boolVal);
    });
});
//# sourceMappingURL=cookie-control-config.test.js.map