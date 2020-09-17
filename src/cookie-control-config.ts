import { CookieControlConfig } from "./types/cookie-control";

export const cookieControlConfig: CookieControlConfig = {
	apiKey: "843970763414bd3ac1229c12767f5e7fab9ef68c",
	product: "PRO_MULTISITE",
	onLoad: function (): void {
		// We need the try/catch because on first load, when the cookie doesn't exist then getCategoryConsent errors
		let preferencesCookies = false;
		let analyticsCookies = false;
		try {
			preferencesCookies = window.CookieControl.getCategoryConsent(0);
			analyticsCookies = window.CookieControl.getCategoryConsent(1);
		} catch {
		} finally {
			window.dataLayer.push({
				event: "cookie.load",
				preferencesCookies,
				analyticsCookies,
			});
		}
	},
	necessaryCookies: [
		// AWS sticky sessions - https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-sticky-sessions.html
		"AWSELB",
		"AWSELBCORS",
		"AWSALBTG",
		"AWSALBTGCORS",
		// NICE Accounts
		"__ngat_1.2",
		"__nrpa_2.2",
		// IdAM
		"IdAM",
		"IdAM-*",
		// OpenAthens
		".AspNet.ClientCookie",
		"OpenIdConnect.nonce.*",
		// General ASP.NET
		"ASPXAUTH",
		"ASP.NET_SessionId",
		// .NET MVC CSRF
		"__RequestVerificationToken",
		// Internal use for Consultations
		"documentReferrer",
		// Evidence Search UI state
		"downloadopen",
		// NICE.Boostrap scroll position
		"ud",
		// Pathways XML cache
		"/pathways/*",
	],
	optionalCookies: [
		{
			name: "preferences",
			label: "Preferences",
			description:
				"These cookies remember information that changes the way our website behaves or looks, like your preferred language or the region that you are in.",
			cookies: [
				// Consultations: Preference for hiding the tutorial
				"TutorialVisible",
				// HDAS: Preference for search panel position
				"HoistSearches",
				// Guidance list: Preference for applied filters
				"NICE_guidanceList_*",
				// Pathways recently viewed and UI state
				"mobile-mode",
				"history-stack",
				"history-stack-groupUid",
			],
			onAccept: function (): void {
				window.dataLayer.push({
					event: "cookie.preferences.accept",
					preferencesCookies: true,
				});
			},
			onRevoke: function (): void {
				window.dataLayer.push({
					event: "cookie.preferences.revoke",
					preferencesCookies: false,
				});
			},
		},
		{
			name: "analytics",
			label: "Website usage cookies",
			description:
				"We use tools such as Google Analytics, Hotjar, VWO and Loop11 to help us measure how you use the website. This allows us to improve the website based on user needs. These tools set cookies that store anonymised information about how you got to the site, and how you interact with the site.",
			cookies: [
				// Google Analytics
				"_g*",
				// Hotjar
				"_hj*",
				"ajs_*",
				// VWO
				"_vwo*",
				"_vis*",
			],
			onAccept: function (): void {
				window.dataLayer.push({
					event: "cookie.analytics.accept",
					analyticsCookies: true,
				});
			},
			onRevoke: function (): void {
				window.dataLayer.push({
					event: "cookie.analytics.revoke",
					analyticsCookies: false,
				});
			},
		},
	],

	// Styling
	initialState: "box",
	position: "left",
	theme: "light",
	rejectButton: false,
	toggleType: "slider",
	settingsStyle: "link",

	// Text
	text: {
		title: "Cookies on NICE websites",
		notifyTitle: "Cookies on NICE websites",
		necessaryDescription:
			"These cookies enable basic functions like page navigation and access to secure areas of the website. Our website cannot function properly without these cookies. You are not likely to get all of these cookies on any given visit, as some of them only appear in a few pages on our site.",
		accept: "I accept cookies",
		acceptSettings: "I accept cookies",
	},

	// Statement
	statement: {
		description: "For more information vist our",
		name: "Cookie Policy",
		url: "https://www.nice.org.uk/terms-and-conditions",
		updated: "17/08/2020",
	},
};
