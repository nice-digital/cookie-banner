import Cookies from "js-cookie";
import { CookieControl } from "./cookie-control";

import { cookieControlConfig } from "./cookie-control-config";
import "./cookie-control.scss";
import { CookieControlCookie } from "./types/cookie-control";

// Ensure the GTM dataLayer array exists, in case the cookie banner is loaded before GTM
const ensureDataLayer = () => {
	window.dataLayer = window.dataLayer || [];
};

// Ensure gtag() function exists as per https://developers.google.com/tag-platform/devguides/consent
const ensureGtag = () => {
	window.gtag =
		window.gtag ||
		function () {
			return window.dataLayer?.push(
				// eslint-disable-next-line prefer-rest-params
				arguments as unknown as Record<string, unknown>
			);
		};
};

// Parse the cookie that gets set by Cookie Control ourselves.
// This allows the properties like CookieControl.preferenceCookies to be available
// even before the license has loaded asynchronously.
const parseCookieControlCookie = () => {
	const cookieStrValue = Cookies.get("CookieControl");

	if (cookieStrValue) {
		const cookieControlCookie = JSON.parse(
			cookieStrValue
		) as CookieControlCookie;

		const analyticsCookies =
				cookieControlCookie.optionalCookies.analytics === "accepted",
			preferenceCookies =
				cookieControlCookie.optionalCookies.preferences === "accepted",
			marketingCookies =
				cookieControlCookie.optionalCookies.marketing === "accepted";

		CookieControl.analyticsCookies = analyticsCookies;
		CookieControl.preferenceCookies = preferenceCookies;
		CookieControl.marketingCookies = marketingCookies;
	} else {
		CookieControl.analyticsCookies =
			CookieControl.preferenceCookies =
			CookieControl.marketingCookies =
				false;
	}
};

export const loadCookieControl = (): void => {
	ensureDataLayer();

	ensureGtag();

	parseCookieControlCookie();

	CookieControl.load(cookieControlConfig);
};
