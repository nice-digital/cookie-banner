import { cookieControlConfig } from "./cookie-control-config";

describe("cookie-control-config", () => {
	it("should match snapshot", () => {
		expect(cookieControlConfig).toMatchSnapshot();
	});

	it("should remove analytics localStorage cookies on revoke", () => {
		window.dataLayer = [];
		window.localStorage.setItem("vwoSn", "true");
		window.localStorage.setItem("_hjtest", "true");
		window.localStorage.setItem("test", "true");

		cookieControlConfig.optionalCookies
			?.find(({ name }) => name == "analytics")
			?.onRevoke();

		expect(window.localStorage.length).toBe(1);
	});
});
