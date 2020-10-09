import { CookieControlConfig } from "./types/cookie-control";
import { CookieControl } from "./cookie-control";

export const cookieControlConfig: CookieControlConfig = {
	apiKey: "843970763414bd3ac1229c12767f5e7fab9ef68c",
	product: "PRO_MULTISITE",
	encodeCookie: true,
	onLoad: function (): void {
		// We need the try/catch because on first load, when the cookie doesn't exist then getCategoryConsent errors
		let preferenceCookies = false;
		let analyticsCookies = false;
		try {
			preferenceCookies = CookieControl.getCategoryConsent(0) || false;
			analyticsCookies = CookieControl.getCategoryConsent(1) || false;
		} catch {
		} finally {
			CookieControl.analyticsCookies = analyticsCookies;
			CookieControl.preferenceCookies = preferenceCookies;
			window.dataLayer?.push({
				event: "cookie.load",
				preferenceCookies,
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
		// Evidence Search UI state
		"downloadopen",
		// NICE.Boostrap scroll position
		"ud",
		// INTERNAL USE
		// For InDev -> Consultations
		"documentReferrer",
		// Pathways authoring
		"display-node-orders",
	],
	optionalCookies: [
		{
			name: "preferences",
			label: "Preference cookies",
			description:
				"These cookies remember information that changes the way our website behaves or looks, like your preferred layout or previously viewed pages.",
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
				"history-stack-details",
			],
			onAccept: function (): void {
				CookieControl.preferenceCookies = true;
				window.dataLayer?.push({
					event: "cookie.preferences.accept",
					preferenceCookies: true,
				});
			},
			onRevoke: function (): void {
				CookieControl.preferenceCookies = false;
				window.dataLayer?.push({
					event: "cookie.preferences.revoke",
					preferenceCookies: false,
				});
			},
		},
		{
			name: "analytics",
			label: "Website usage cookies",
			description:
				"We use tools such as Google Analytics, Hotjar, VWO and Loop11 to help us anonymously measure how you use our websites. This allows us to make improvements based on our users' needs. These tools set cookies that store anonymised information about how you got to the site, and how you interact with the site.",
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
				CookieControl.analyticsCookies = true;
				window.dataLayer?.push({
					event: "cookie.analytics.accept",
					analyticsCookies: true,
				});
			},
			onRevoke: function (): void {
				CookieControl.analyticsCookies = false;
				window.dataLayer?.push({
					event: "cookie.analytics.revoke",
					analyticsCookies: false,
				});

				// Cookie Control doesn't handle local storage automatically, so we have to tidy analytics local storage ourselves
				window.localStorage.removeItem("vwoSn");

				// HotJar uses local storage with keys starting _hj
				Object.keys(window.localStorage)
					.filter((key) => /^_hj/.test(key))
					.forEach((key) => window.localStorage.removeItem(key));
			},
		},
	],

	// Styling
	initialState: "open",
	position: "left",
	theme: "light",
	rejectButton: true,
	toggleType: "slider",

	// Text
	text: {
		title: "Cookies on the NICE website and services",
		intro:
			"Cookies are files saved on your phone, tablet or computer when you visit a website.\nWe use cookies to store information about how you use the NICE website and services, such as the pages you visit.",
		notifyTitle: "Cookies on the NICE website and services",
		notifyDescription:
			"We store cookies on your device to make our site work and to help us understand how the site is being used.",
		settings: "Manage cookies",
		necessaryTitle: "Essential cookies",
		necessaryDescription:
			"These cookies enable basic functions like page navigation and access to secure areas of the website. Our website cannot function properly without these cookies and they can only be deactivated by changing your browser preferences.",
		acceptSettings: "Accept all cookies",
		rejectSettings: "Reject cookies",
		closeLabel: "Close cookie banner",
	},

	// Statement
	statement: {
		description: "For more information, view our",
		name: "cookie statement.",
		url: "https://www.nice.org.uk/cookies",
		updated: "17/08/2020",
	},

	// Branding
	branding: {
		fontFamily: "Lato,'Helvetica Neue',Helvetica,Arial,sans-serif",
		removeAbout: true,
		removeIcon: true,
		fontSize: "1rem",
		fontColor: "#0e0e0e",
		backgroundColor: "#fff",
	},

	// Accessibility
	accessibility: {
		// We set our own focus styles
		highlightFocus: false,
	},
};
