import { CookieControlConfig } from "./types/cookie-control";

export const cookieControlConfig: CookieControlConfig = {
	apiKey: "843970763414bd3ac1229c12767f5e7fab9ef68c",
	product: "PRO_MULTISITE",
	onLoad: function (): void {
		// We need the try/catch because on first load, when the cookie doesn't exist then getCategoryConsent errors
		let preferenceCookies = false;
		let analyticsCookies = false;
		try {
			preferenceCookies = window.CookieControl.getCategoryConsent(0) || false;
			analyticsCookies = window.CookieControl.getCategoryConsent(1) || false;
		} catch {
		} finally {
			window.CookieControl.analyticsCookies = analyticsCookies;
			window.CookieControl.preferenceCookies = preferenceCookies;
			window.dataLayer.push({
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
				window.CookieControl.preferenceCookies = true;
				window.dataLayer.push({
					event: "cookie.preferences.accept",
					preferenceCookies: true,
				});
			},
			onRevoke: function (): void {
				window.CookieControl.preferenceCookies = false;
				window.dataLayer.push({
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
				window.CookieControl.analyticsCookies = true;
				window.dataLayer.push({
					event: "cookie.analytics.accept",
					analyticsCookies: true,
				});
			},
			onRevoke: function (): void {
				window.CookieControl.analyticsCookies = false;
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
		accept: "Accept all cookies",
		acceptSettings: "Accept all cookies",
	},

	// Statement
	statement: {
		description: "For more information, view our",
		name: "cookie statement",
		url: "https://www.nice.org.uk/terms-and-conditions#cookies",
		updated: "17/08/2020",
	},

	// Branding
	branding: {
		fontFamily: "Lato,'Helvetica Neue',Helvetica,Arial,sans-serif",
		removeAbout: true,
	},

	// Accessibility
	accessibility: {
		highlightFocus: true,
	},
};
