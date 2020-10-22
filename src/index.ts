import { CookieControl } from "./cookie-control";

import { cookieControlConfig } from "./cookie-control-config";
import "./cookie-control.scss";

export const loadCookieControl = (): void => {
	// Ensure the GTM dataLayer array exists, in case the cookie banner is loaded before GTM
	window.dataLayer = window.dataLayer || [];

	CookieControl.load(cookieControlConfig);
};
