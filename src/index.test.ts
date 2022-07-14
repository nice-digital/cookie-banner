import Cookie from "js-cookie";

import { loadCookieControl } from "./index";
import { cookieControlConfig } from "./cookie-control-config";
import { CookieControl } from "./cookie-control";

jest.mock("js-cookie");

describe("Load cookie control tests", () => {
	beforeEach(() => {
		delete window.dataLayer;
		jest.resetAllMocks();
	});

	it("should load cookie control plugin with config", () => {
		const loadMock = jest.spyOn(CookieControl, "load");
		loadCookieControl();
		expect(loadMock).toHaveBeenCalledWith(cookieControlConfig);
	});

	it("should ensure dataLayer exists", () => {
		expect(window.dataLayer).toBeFalsy();
		loadCookieControl();
		expect(window.dataLayer).toBeTruthy();
	});

	it("should set CookieControl properties to false with missing cookie", () => {
		loadCookieControl();

		expect(CookieControl).toMatchObject({
			analyticsCookies: false,
			preferenceCookies: false,
			marketingCookies: false,
		});
	});

	it("should CookieControl object properties from existing cookie with revoked consent", () => {
		(Cookie.get as jest.Mock).mockReturnValue(
			`{"optionalCookies":{"analytics":"revoked","preferences":"revoked","marketing":"revoked"}}`
		);

		loadCookieControl();

		expect(CookieControl).toMatchObject({
			analyticsCookies: false,
			preferenceCookies: false,
			marketingCookies: false,
		});
	});

	it("should CookieControl object properties from existing cookie with consent", () => {
		(Cookie.get as jest.Mock).mockReturnValue(
			`{"optionalCookies":{"analytics":"accepted","preferences":"accepted","marketing":"accepted"}}`
		);

		loadCookieControl();

		expect(CookieControl).toMatchObject({
			analyticsCookies: true,
			preferenceCookies: true,
			marketingCookies: true,
		});
	});
});
