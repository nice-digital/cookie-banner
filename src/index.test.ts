import { loadCookieControl } from "./index";
import { cookieControlConfig } from "./cookie-control-config";
import { CookieControl } from "./cookie-control";

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
});
