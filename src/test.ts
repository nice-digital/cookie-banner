import { loadCookieControl } from "./index";
// import { mocked } from "ts-jest/utils";

describe("Load cookie control tests", () => {
	//TODO
	// it("should load cookie control plugin with config", () => {
	// 	const CookieControl: any = {
	// 		load: jest.fn(),
	// 	};
	// 	window.CookieControl = mocked(CookieControl);
	// 	const mockConfig = jest.mock("./cookie-control-config.ts");
	// 	loadCookieControl();
	// 	expect(window.CookieControl.load).toHaveBeenCalledWith(mockConfig);
	// });

	it("should ensure dataLayer exists", () => {
		loadCookieControl();
		expect(window.dataLayer).toBeTruthy;
	});
});
