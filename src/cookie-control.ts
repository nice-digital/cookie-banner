import https from "https";

import { type CookieControl as CookieControlType } from "./types/cookie-control";

interface ValLoaderReturn {
	cacheable: boolean;
	code: string;
}

const CookieControlScriptUrl =
	"https://cc.cdn.civiccomputing.com/9/cookieControl-9.6.1.min.js";

// Loads the civic cookie control banner from the Civic CDN
const getCivicCookieControl = async (): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		const body: Uint8Array[] = [];
		const req = await https.get(CookieControlScriptUrl, (res) => {
			res.on("data", (chunk) => body.push(chunk));
			res.on("end", () => {
				const data = Buffer.concat(body).toString();
				resolve(data);
			});
		});
		req.on("error", (e) => {
			reject(e);
		});
		req.end();
	});
};

// Used by val-loader, at build time: val-loader looks for a default export
// We do this for 2 reasons:
//  a) improve load times by loading the Civic banner at build time
//	b) not to rely on an external CDN at run time
//  c) re-export the CookieControl object to allow 'proper' modules and not rely on a global reference defined on window
export default async function (): Promise<ValLoaderReturn> {
	const civicCookieControlScript = await getCivicCookieControl();

	return {
		cacheable: true,
		code: `${civicCookieControlScript}\nmodule.exports = { CookieControl: window.CookieControl }`,
	};
}

// Used purely for a type definition, hence the use of a placeholder, as the const needs to be initiated with something
// This is replaced by val-loader at build time - see the default exported function above
export const CookieControl: CookieControlType = {
	load: () => {
		/* deliberately empty, used for mocking */
	},
} as unknown as CookieControlType;
