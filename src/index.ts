import Cookies from "js-cookie";
import { CookieControl } from "./cookie-control";

import { cookieControlConfig } from "./cookie-control-config";
import "./cookie-control.scss";
import { CookieControlCookie } from "./types/cookie-control";

// Ensure the GTM dataLayer array exists, in case the cookie banner is loaded before GTM
const ensureDataLayer = () => {
	window.dataLayer = window.dataLayer || [];
};

// Parse the cookie that gets set by Cookie Control ourselves.
// This allows the properties like CookieControl.preferenceCookies to be available
// even before the license has loaded asynchronously.
const parseCookieControlCookie = () => {
	const cookieControlCookie = Cookies.getJSON(
		"CookieControl"
	) as CookieControlCookie;

	const analyticsCookies =
			cookieControlCookie?.optionalCookies.analytics === "accepted",
		preferenceCookies =
			cookieControlCookie?.optionalCookies.preferences === "accepted",
		marketingCookies =
			cookieControlCookie?.optionalCookies.marketing === "accepted";

	CookieControl.analyticsCookies = analyticsCookies;
	CookieControl.preferenceCookies = preferenceCookies;
	CookieControl.marketingCookies = marketingCookies;
};

export const loadCookieControl = (): void => {
	ensureDataLayer();

	parseCookieControlCookie();

	CookieControl.load(cookieControlConfig);
};
