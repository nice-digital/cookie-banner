import { cookieControlConfig } from "./cookie-control-config";
import { CookieControl } from "./types/cookie-control";

describe("cookie-control-config", () => {
	beforeEach(() => {
		window.dataLayer = [];
		window.CookieControl = {
			getCategoryConsent: (index: number): boolean => index === 0,
		} as CookieControl;
	});

	it("should match snapshot", () => {
		expect(cookieControlConfig).toMatchSnapshot();
	});

	it("should push cookie.load dataLayer event on load", () => {
		cookieControlConfig.onLoad && cookieControlConfig.onLoad();
		expect(window.dataLayer).toHaveLength(1);
		expect(window.dataLayer[0]).toEqual({
			event: "cookie.load",
			preferenceCookies: true,
			analyticsCookies: false,
		});
	});

	it.each([
		["preferences.accept", "onAccept", "preferenceCookies", true, 0],
		["preferences.revoke", "onRevoke", "preferenceCookies", false, 0],
		["analytics.accept", "onAccept", "analyticsCookies", true, 1],
		["analytics.revoke", "onRevoke", "analyticsCookies", false, 1],
	])(
		"should pass %s event into the dataLayer %s %s",
		(
			eventName: string,
			methodName: string,
			cookieType: string,
			boolVal: boolean,
			index: number
		) => {
			const cookieTypeConfig = cookieControlConfig.optionalCookies?.[index];

			if (cookieTypeConfig) {
				const method = cookieTypeConfig[methodName as "onRevoke" | "onAccept"];
				if (method) method();
			}

			expect(window.dataLayer).toHaveLength(1);
			expect(window.dataLayer[0]).toEqual({
				event: `cookie.${eventName}`,
				[cookieType]: boolVal,
			});
		}
	);

	it.each([
		["preferenceCookies", true, "onAccept", 0],
		["preferenceCookies", false, "onRevoke", 0],
		["analyticsCookies", true, "onAccept", 1],
		["analyticsCookies", false, "onRevoke", 1],
	])(
		"should set CookieControl.%s variable to %s %s",
		(
			variableName: string,
			boolVal: boolean,
			methodName: string,
			index: number
		) => {
			const cookieTypeConfig = cookieControlConfig.optionalCookies?.[index];

			if (cookieTypeConfig) {
				const method = cookieTypeConfig[methodName as "onRevoke" | "onAccept"];
				if (method) method();
			}

			expect(
				window.CookieControl[
					variableName as "preferenceCookies" | "analyticsCookies"
				]
			).toEqual(boolVal);
		}
	);
});
