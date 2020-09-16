import loadjs from "loadjs";

import { cookieControlConfig } from "./cookie-control-config";
import "./cookie-control.css";

export { CookieControlConfig } from "./types/cookie-control";
export { cookieControlConfig } from "./cookie-control-config";

const ensureDataLayer = () => {
	window.dataLayer = window.dataLayer || [];
};

export const loadCookieControl = (): void => {
	ensureDataLayer();

	loadjs(
		"https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js",
		"cookie-control"
	);

	loadjs.ready("cookie-control", function () {
		window.CookieControl.load(cookieControlConfig);
	});
};
