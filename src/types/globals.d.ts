export {};

import { CookieControl } from "./cookie-control";

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];

		CookieControl: CookieControl;
	}
}
