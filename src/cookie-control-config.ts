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
		let marketingCookies = false;
		try {
			preferenceCookies = CookieControl.getCategoryConsent(0) || false;
			analyticsCookies = CookieControl.getCategoryConsent(1) || false;
			marketingCookies = CookieControl.getCategoryConsent(2) || false;
		} catch {
		} finally {
			CookieControl.analyticsCookies = analyticsCookies;
			CookieControl.preferenceCookies = preferenceCookies;
			CookieControl.marketingCookies = marketingCookies;
			window.dataLayer?.push({
				event: "cookie.load",
				preferenceCookies,
				analyticsCookies,
				marketingCookies,
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
		"IdAMC*",
		"auth0",
		"auth0_compat",
		"did",
		"did_compat",
		"_tempCid",
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
		//NICE Docs (appraisals)
		"impersonate",
		// Pathways authoring
		"display-node-orders",
		//EPPI
		"data-extraction-fixed-tables",
		"data-extraction-input-vertical",
		"browser-warning-shown",
		"compact",
		"dedupe-show-details",
		"relevant-highlight",
		"irrelevant-highlight",
		"dedupe-view",
		"text-highlighter-hide",
		// Pharmascan
		"evercookie_cache",
		"evercookie_etag",
		"evercookie_png",
		".ukps",
		".ukpsLease",
		//DocSupply
		"sticky-session",
		".AspNetCore.Cookies",
		//Consultations
		"ConsultationSession-*",
		//Internal exclusion cookie (used for analytics)
		"nice_internal_exclusion",
		//MAAS form cookie
		"csrftoken",
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
				// TODO: Add preference consent, see https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/53958
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
				"We use tools such as Google Analytics, Hotjar, Google Optimize and Loop11 to help us anonymously measure how you use our websites. This allows us to make improvements based on our users' needs.\n\nThese tools set cookies that store anonymised information about how you got to the site, and how you interact with the site.",
			cookies: [
				// Google Analytics
				"_ga",
				"_gat_UA-*",
				"_gid",
				"_ga_*",
				"_gadatalayer",
				// Hotjar
				"_hj*",
				"ajs_*",
				// Google Optimize
				"_gaexp",
				"_opt_*",
			],
			vendors: [
				{
					name: "Google Analytics",
					description:
						"We use Google Analytics for usage metrics like page views and link clicks. It uses cookies to join up user behaviour across multiple page views and sessions.",
					thirdPartyCookies: false,
					url: "https://policies.google.com/technologies/cookies?hl=en-US",
				},
				{
					name: "HotJar",
					description:
						"We use Hotjar for behaviour analysis, heatmaps, clickmaps, usage recordings, polls and surveys. It uses cookies to stop users from seeing the same poll twice.",
					thirdPartyCookies: false,
					url: "https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookie-Information",
				},
				{
					name: "Google Optimize",
					description:
						"We use Google Optimize to experiment with new content and designs to help improve our services. It uses cookies to remember which experiments a user has seen.",
					thirdPartyCookies: false,
					url: "https://policies.google.com/technologies/cookies?hl=en-US",
				},
			],
			onAccept: function (): void {
				CookieControl.analyticsCookies = true;
				window.dataLayer?.push({
					event: "cookie.analytics.accept",
					analyticsCookies: true,
				});
				window.gtag("consent", "update", { analytics_storage: "granted" });
			},
			onRevoke: function (): void {
				CookieControl.analyticsCookies = false;
				window.dataLayer?.push({
					event: "cookie.analytics.revoke",
					analyticsCookies: false,
				});
				window.gtag("consent", "update", { analytics_storage: "denied" });
				// HotJar uses local storage with keys starting _hj
				Object.keys(window.localStorage)
					.filter((key) => /^_hj/.test(key))
					.forEach((key) => window.localStorage.removeItem(key));
			},
		},
		{
			name: "marketing",
			label: "Marketing and advertising cookies",
			description:
				"We use Google Ads, LinkedIn, Facebook and Twitter to show adverts on external sites to promote NICE services, events and content.\n\nThese services may use cookies to help make advertising more effective. These cookies are used for things like showing relevant adverts based on website visits, preventing the same ad from continuously re-appearing, or by measuring how many times people click on these adverts.",
			cookies: [
				// Conversion linker https://support.google.com/tagmanager/answer/7549390?hl=en
				"_gcl_*",
				// LinkedIn: https://www.linkedin.com/legal/l/cookie-table#thirdparty
				"li_fat_id",
				// Facebook: https://en-gb.facebook.com/policy/cookies/
				"_fbp",
				"_fbc",
				// Twitter appears to be cookieless: https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html
			],
			thirdPartyCookies: [
				{
					name: "Google Ads",
					optOutLink: "https://adssettings.google.com/",
				},
				{
					name: "LinkedIn",
					optOutLink:
						"https://www.linkedin.com/help/linkedin/answer/62931/manage-advertising-preferences?lang=en",
				},
				{
					name: "Facebook",
					optOutLink: "https://en-gb.facebook.com/help/568137493302217",
				},
				{
					name: "Twitter",
					optOutLink:
						"https://business.twitter.com/en/help/ads-policies/product-policies/interest-based-opt-out-policy.html",
				},
			],
			vendors: [
				{
					name: "Google Ads",
					description:
						"Google Ads serves adverts on Google products and services. It uses cookies to help to make advertising more effective.",
					thirdPartyCookies: true,
					url: "https://policies.google.com/technologies/ads",
				},
				{
					name: "LinkedIn",
					description:
						"LinkedIn shows adverts when you browse LinkedIn products and services. It uses cookies to help to make advertising more effective.",
					thirdPartyCookies: true,
					url: "https://www.linkedin.com/legal/cookie-policy",
				},
				{
					name: "Facebook",
					description:
						"Facebook shows adverts when you browse their platform. It uses cookies to help to make advertising more effective.",
					thirdPartyCookies: true,
					url: "https://en-gb.facebook.com/policy/cookies/",
				},
				{
					name: "Twitter",
					description:
						"Twitter shows adverts when you browse their platform. It uses cookies to help to make advertising more effective.",
					thirdPartyCookies: true,
					url: "https://help.twitter.com/en/rules-and-policies/twitter-cookies",
				},
			],
			onAccept: function (): void {
				CookieControl.marketingCookies = true;
				window.dataLayer?.push({
					event: "cookie.marketing.accept",
					marketingCookies: true,
				});
				window.gtag("consent", "update", { ad_storage: "granted" });
			},
			onRevoke: function (): void {
				CookieControl.marketingCookies = false;
				window.dataLayer?.push({
					event: "cookie.marketing.revoke",
					marketingCookies: false,
				});
				window.gtag("consent", "update", { ad_storage: "denied" });
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
		updated: "07/07/2023",
	},

	// Branding
	branding: {
		fontFamily: "Inter,'Helvetica Neue',Helvetica,Arial,sans-serif",
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

	// Fix for CB-73 Banner pops up between evidenc.nhs.uk and other nice.org.uk domains
	sameSiteCookie: false,
	sameSiteValue: "Lax",
};
