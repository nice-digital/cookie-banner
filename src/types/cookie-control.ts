export interface CookieControl {
	load: (config: CookieControlConfig) => void;
	update: (config: CookieControlConfig) => void;
	open: () => void;
	hide: () => void;
	acceptAll: () => void;
	rejectAll: () => void;
	config: () => CookieControlConfig;
	geoInfo: () => GeoInfo;
	getCookie: () => string | false;
	getAllCookies: () => { [key: string]: string };
	saveCookie: (name: string, value: string, expiryLength: number) => void;
	delete: (name: string) => void;
	deleteAll: () => void;
	changeCategory: (index: number, grantConsent: boolean) => void;
	toggleCategory: (index: number) => void;
	getCategoryConsent: (index: number) => boolean;
}

interface GeoInfo {
	country: string;
	countryName: string;
	withinEU: boolean;
}

interface CookieControlText {
	title?: string;
	intro?: string;
	acceptSettings?: string;
	acceptRecommended?: string;
	accept?: string;
	rejectSettings?: string;
	reject?: string;
	settings?: string;
	necessaryTitle?: string;
	necessaryDescription?: string;
	thirdPartyTitle?: string;
	thirdPartyDescription?: string;
	on?: string;
	off?: string;
	notifyTitle?: string;
	notifyDescription?: string;
	closeLabel?: string;
	cornerButton?: string;
	landmark?: string;
}

export interface CookieControlPurpose {
	name: string;
	label: string;
	lawfulBasis?: "legitimate interest" | "consent";
	description: string;
	cookies: string[];
	onAccept?: () => void;
	onRevoke?: () => void;
	recommendedState?: boolean;
}

export interface CookieControlConfig {
	apiKey: string;
	product: string;
	necessaryCookies?: string[];
	optionalCookies?: CookieControlPurpose[];
	mode?: "gdpr" | "ccpa";
	consentCookieExpiry?: number;
	logConsent?: boolean;
	encodeCookie?: boolean;
	subDomains?: boolean;

	// Appearance and behaviour
	initialState?: "open" | "closed" | "notify" | "top" | "box";
	notifyOnce?: boolean;
	rejectButton?: false;
	layout?: "slideout" | "popup";
	position?: "left" | "right";
	theme?: "light" | "dark";
	toggleType?: "slider" | "checkbox";
	acceptBehaviour?: "all" | "recommended";
	closeOnGlobalChange?: boolean;
	closeStyle?: "icon" | "labelled" | "button";
	notifyDismissButton?: boolean;
	settingsStyle?: "button" | "link";
	setInnerHTML?: boolean;
	excludedCountries?: string[];
	locale?: string;
	onLoad?: () => void;
	sameSiteCookie?: boolean;
	sameSiteValue?: "Strict" | "Lax" | "None";

	// Accessibility
	accessibility?: {
		accessKey?: string;
		highlightFocus?: boolean;
		overlay?: boolean;
	};

	// Text
	text?: CookieControlText;

	// Branding
	branding?: {
		fontFamily?: string;
		fontSizeTitle?: string;
		fontSizeHeaders?: string;
		fontSize?: string;
		fontColor?: string;
		backgroundColor?: string;
		acceptText?: string;
		acceptBackground?: string;
		rejectText?: string;
		rejectBackground?: string;
		toggleText?: string;
		toggleColor?: string;
		toggleBackground?: string;
		alertText?: string;
		alertBackground?: string;
		buttonIcon?: string;
		buttonIconWidth?: number;
		buttonIconHeight?: number;
		removeIcon?: boolean;
		removeAbout?: boolean;
	};

	// Statement
	statement?: {
		description?: string;
		name?: string;
		url?: string;
		updated?: string;
	};

	// Locales
	locales?: {
		locale?: string;
		mode?: "gdpr" | "ccpa" | "hidden";
		location?: string[];
		optionalCookies: {
			name: string;
			label: string;
			description: string;
		}[];
		text?: CookieControlText;
	}[];
}
