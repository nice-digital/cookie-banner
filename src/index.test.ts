import { loadCookieControl } from "./index";
import Cookie from "js-cookie";
import loadjs from "loadjs";

import { cookieControlConfig } from "./cookie-control-config";
import { CookieControl } from "./types/cookie-control";

jest.mock("js-cookie", () => ({
	getJSON: jest.fn(),
}));

jest.mock("loadjs", () => {
	const mock = jest.fn();
	((mock as unknown) as typeof loadjs).ready = jest.fn();
	return mock;
});

describe("Load cookie control tests", () => {
	beforeEach(() => {
		window.CookieControl = (null as unknown) as CookieControl;
		jest.resetAllMocks();
	});

	it("should load cookie control plugin with config once script has loaded", () => {
		const loadMock = jest.fn();
		((loadjs.ready as unknown) as jest.Mock).mockImplementation(
			(_name: string, callback: () => void) => {
				window.CookieControl = ({
					load: loadMock,
				} as unknown) as CookieControl;
				callback();
			}
		);
		loadCookieControl();
		expect(loadMock).toHaveBeenCalledWith(cookieControlConfig);
	});

	it("should ensure dataLayer exists", () => {
		loadCookieControl();
		expect(window.dataLayer).toBeTruthy;
	});

	it("should create placeholder CookieControl object from missing cookie", () => {
		loadCookieControl();

		expect(window.CookieControl).toStrictEqual({
			analyticsCookies: false,
			preferenceCookies: false,
		});
	});

	it("should create placeholder CookieControl object from existing cookie with revoked consent", () => {
		((Cookie.getJSON as unknown) as jest.Mock).mockImplementation(() => ({
			optionalCookies: {
				analytics: "revoked",
				preferences: "revoked",
			},
		}));

		loadCookieControl();

		expect(window.CookieControl).toStrictEqual({
			analyticsCookies: false,
			preferenceCookies: false,
		});
	});

	it("should create placeholder CookieControl object from existing cookie with consent", () => {
		((Cookie.getJSON as unknown) as jest.Mock).mockImplementation(() => ({
			optionalCookies: {
				analytics: "accepted",
				preferences: "accepted",
			},
		}));

		loadCookieControl();

		expect(window.CookieControl).toStrictEqual({
			analyticsCookies: true,
			preferenceCookies: true,
		});
	});
});
