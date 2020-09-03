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
			preferencesCookies: true,
			analyticsCookies: false,
		});
	});

	it.each([
		["preferences.accept", "onAccept", "preferencesCookies", true, 0],
		["preferences.revoke", "onRevoke", "preferencesCookies", false, 0],
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
});
