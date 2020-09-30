import loadjs from "loadjs";
import Cookies from "js-cookie";

import { cookieControlConfig } from "./cookie-control-config";
import "./cookie-control.scss";
import { CookieControl, CookieControlCookie } from "./types/cookie-control";

export { CookieControlConfig } from "./types/cookie-control";
export { cookieControlConfig } from "./cookie-control-config";

const ensureDataLayer = () => {
	window.dataLayer = window.dataLayer || [];
};

/**
 * Creates a placeholder Cookie Control object before the external library has loaded.
 *
 * It provides the public API for checking analytics and preference cookies, which
 * allows services to use CookieControl.preferenceCookies on page load.
 */
const createPlaceholderCookieControl = () => {
	const cookieControlCookie = Cookies.getJSON(
		"CookieControl"
	) as CookieControlCookie;

	const analyticsCookies =
			cookieControlCookie?.optionalCookies.analytics === "accepted",
		preferenceCookies =
			cookieControlCookie?.optionalCookies.preferences === "accepted";

	window.CookieControl = window.CookieControl || ({} as CookieControl);

	window.CookieControl.analyticsCookies = analyticsCookies;
	window.CookieControl.preferenceCookies = preferenceCookies;
};

export const loadCookieControl = (): void => {
	ensureDataLayer();

	createPlaceholderCookieControl();

	loadjs(
		"https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js",
		"cookie-control"
	);

	loadjs.ready("cookie-control", () => {
		// Re-add the custom properties after CookieControl is created
		createPlaceholderCookieControl();
		window.CookieControl.load(cookieControlConfig);
	});
};
