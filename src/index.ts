import loadjs from "loadjs";

import { cookieControlConfig } from "./cookie-control-config";

export { CookieControlConfig } from "./types/cookie-control";
export { cookieControlConfig } from "./cookie-control-config";

const ensureDataLayer = () => {
	window.dataLayer = window.dataLayer || [];
};

export const loadCookieControl = async (): Promise<void> => {
	ensureDataLayer();

	await loadjs("https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js", {
		returnPromise: true,
	});
	console.log(cookieControlConfig);
	window.CookieControl.load(cookieControlConfig);
};
