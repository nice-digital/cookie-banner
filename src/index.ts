import loadjs from "loadjs";
import Cookies from "js-cookie";

import { cookieControlConfig } from "./cookie-control-config";
import "./cookie-control.css";
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

	window.CookieControl = {
		analyticsCookies,
		preferenceCookies,
	} as CookieControl;
};

export const loadCookieControl = async (): Promise<void> => {
	ensureDataLayer();

	createPlaceholderCookieControl();

	await loadjs("https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js", {
		returnPromise: true,
	});
	console.log(cookieControlConfig);
	window.CookieControl.load(cookieControlConfig);
};
