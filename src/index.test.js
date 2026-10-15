"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_cookie_1 = __importDefault(require("js-cookie"));
var index_1 = require("./index");
var cookie_control_config_1 = require("./cookie-control-config");
var cookie_control_1 = require("./cookie-control");
jest.mock("js-cookie");
describe("Load cookie control tests", function () {
    beforeEach(function () {
        delete window.dataLayer;
        jest.resetAllMocks();
    });
    it("should load cookie control plugin with config", function () {
        var loadMock = jest.spyOn(cookie_control_1.CookieControl, "load");
        (0, index_1.loadCookieControl)();
        expect(loadMock).toHaveBeenCalledWith(cookie_control_config_1.cookieControlConfig);
    });
    it("should ensure dataLayer exists", function () {
        expect(window.dataLayer).toBeFalsy();
        (0, index_1.loadCookieControl)();
        expect(window.dataLayer).toBeTruthy();
    });
    it("should set CookieControl properties to false with missing cookie", function () {
        (0, index_1.loadCookieControl)();
        expect(cookie_control_1.CookieControl).toMatchObject({
            analyticsCookies: false,
            preferenceCookies: false,
            marketingCookies: false,
        });
    });
    it("should CookieControl object properties from existing cookie with revoked consent", function () {
        js_cookie_1.default.get.mockReturnValue("{\"optionalCookies\":{\"analytics\":\"revoked\",\"preferences\":\"revoked\",\"marketing\":\"revoked\"}}");
        (0, index_1.loadCookieControl)();
        expect(cookie_control_1.CookieControl).toMatchObject({
            analyticsCookies: false,
            preferenceCookies: false,
            marketingCookies: false,
        });
    });
    it("should get CookieControl object properties from existing cookie with consent", function () {
        js_cookie_1.default.get.mockReturnValue("{\"optionalCookies\":{\"analytics\":\"accepted\",\"preferences\":\"accepted\",\"marketing\":\"accepted\"}}");
        (0, index_1.loadCookieControl)();
        expect(cookie_control_1.CookieControl).toMatchObject({
            analyticsCookies: true,
            preferenceCookies: true,
            marketingCookies: true,
        });
    });
});
//# sourceMappingURL=index.test.js.map