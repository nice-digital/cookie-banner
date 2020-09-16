import { cookieControlConfig } from "./cookie-control-config";

import { CookieControlPurpose } from "./types/cookie-control";

describe("cookie-control-config", () => {
	it("should match snapshot", () => {
		expect(cookieControlConfig).toMatchSnapshot();
	});

	it("should remove analytics localStorage cookies on revoke", () => {
		window.dataLayer = [];
		window.localStorage.setItem("vwoSn", "true");
		window.localStorage.setItem("_hjtest", "true");
		window.localStorage.setItem("test", "true");

		const optionalCookies = cookieControlConfig.optionalCookies as CookieControlPurpose[],
			analyticsCookies = optionalCookies.find(
				({ name }) => name == "analytics"
			) as CookieControlPurpose,
			onRevoke = analyticsCookies.onRevoke as () => void;

		onRevoke();

		expect(window.localStorage.length).toBe(1);
		expect(window.localStorage.getItem("test")).toBe("true");
	});
});
