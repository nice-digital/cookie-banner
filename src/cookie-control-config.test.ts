import { cookieControlConfig } from "./cookie-control-config";

describe("cookie-control-config", () => {
	it("should match snapshot", () => {
		expect(cookieControlConfig).toMatchSnapshot();
	});
});
