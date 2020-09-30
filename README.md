# NICE digital cookie banner

> Cookie banner and cookie management for NICE digital services

[**:rocket: Jump straight to getting started**](#rocket-set-up)

## What is it?

An easy and convenient way to load the NICE digital services cookie banner. It's a lightweight wrapper around [Civic's Cookie Control](https://www.civicuk.com/cookie-control) including common config (wording, lists of cookies etc).

## Stack

- [Civic's Cookie Control](https://www.civicuk.com/cookie-control) for cookie management
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/) to create the CDN bundle
- [Prettier](https://prettier.io/) for code style
- [ESLint](https://eslint.org/) for linting
- [loadjs](https://github.com/muicss/loadjs) for dynamic script loading
- [Jest](https://jestjs.io/) (TODO) for unit testing

### Architecture

The cookie banner is a wrapper around Civic's Cookie Control tool. It will be called by each system via the CDN in a configurable script tag specifying that sites cookies.

The service is built in Typescript and compiled into js using webpack and babel.

### Usage within other services

This cookie banner should be used for cookie management for any NICE digital service. TODO

See the [usage](#usage) section below for detailed usage instructions.

## Usage

There are 2 main ways to use the cookier banner: either [via the NICE CDN](#cdn) as a script include or as an [import](#import) into your JavaScript module bundling. Once you've included the script, you then need to [integrate it into your application](#integrate-with-your-application).

### CDN

Loading directly via the CDN is the easiest and most convenenient way to include the cookie banner. This is a good method for projects without a module bundling system, or as a quick way to get started. It also means you always have the latest version of the cookie banner as you don't need a version bump release.

> using the CDN adds an extra HTTP request, so adds a slight performance overhead. Importing the module version (see the [import](#import) section below) is a better option for projects with a module bundling system (for example with webpack).

Include the following script tag before your applications's JavaScript code. Cookie Banner injects itself automatically, so you don’t need an empty `<div id="global-nav-header"></div>` placeholder or similar (like you need with Global Nav)

```html
<script
  src="//cdn.nice.org.uk/cookie-banner/cookie-banner.min.js"
  type="text/javascript"
></script>
```

Or, point to the alpha CDN for non-live environments:

```html
<script
  src="//alpha-cdn.nice.org.uk/cookie-banner/cookie-banner.min.js"
  type="text/javascript"
></script>
```

> The CDN URL setup is similar to Global Nav, so you may wish to use a similar config setting in tandem with Octopus Deploy variable to configure the CDN for each environment. For example `CookieBannerScriptUrl` or similar. Often we use the alpha CDN for dev and test and the live CDN for alpha and live.

### Import

:warning: We haven't implemented a module import yet: shout if you think this would be useful.

~~Importing the cookie banner as a module allows integrating it into your code base and build. This means you have more control over how the cookie banner is loaded. The downside is you fix the version in your package.json so you need a release to update to a newer version of the cookie banner.~~

### Integrate with your application

There are 2 main ways of hooking into the cookie banner to integrate it into your application:

- via JavaScript variables
- via `dataLayer` events in Google Tag Manager.

#### JavaScript variables

The cookie banner provides JavaScript variables to indicate cookie consent. Use these variables to check for consent in your application before you set non-essential cookies.

There are variables for both preference and analytics cookies. Essential cookies are exempt from explicit consent, so don't have a corresponding JavaScript variable. Analytics cookies _should_ be set via Google Tag Manager so your application's code will _probably_ just need to check for preference cookies.

Make sure you've included the cookie banner script before your application's code. This ensures that the cookie banner has loaded and made the JavaScript variables available. Then use the boolean `CookieControl.preferenceCookies` variable (or `CookieControl.analyticsCookies`) to check for consent. For example:

```js
if (CookieControl.preferenceCookies) {
  // Set a cookie
}
```

> Note: you _could_ hook into the Cookie Control plugin's public methods directly, for example `CookieControl.getCategoryConsent(0)`. However, we don't recommend this - please use the variables defined above.

#### `datalayer` events

The following dataLayer events and variables are sent from the cookie banner:

On load:

```js
{
	event: "cookie.load",
	preferenceCookies: boolean,
	analyticsCookies: boolean,
}
```

When preference cookies are accepted/revoked:

```js
{
	event: "cookie.preferences.accept", // or "cookie.preferences.revoke",
	preferenceCookies: true, // or false,
}
```

When analytics cookies are accepted/revoked:

```js
{
	event: "cookie.analytics.accept", // or "cookie.analytics.revoke",
	analyticsCookies: true, // or false,
}
```

## Development

### :rocket: Set up

1. Install the latest [Node LTS](https://nodejs.org/en/)
2. Open the project folder with [VSCode](https://code.visualstudio.com/)
3. Install the recommend VSCode extensions
   1. VSCode should prompt you to do this as we include an [extensions.json](.vscode/extensions.json)
4. Run `npm start` to run the project locally on http://localhost:8089/
   1. Or use the built in VSCode JavaScript debugging TODO
5. View http://localhost:8089 to view the development site in a browser.

### Commands

Use the following commands for local development:

- `npm start` - Starts dev server on http://localhost:8089/
- `npm run build` - builds minified and unminified bundle into the _dist_ for deployment to the CDN
- `npm test` - runs the jest unit tests. Run `npm test -- -u` to update snapshots.
- `npm run test:coverage` - runs the jest unit tests and generates coverage
- `npm run test:watch` - runs the jest unit tests in watch mode
- `npm run lint` - lints all source files, runs Prettier and runs type checking
- `npm run prettier` - checks all files against Prettier code style
- `npm run prettier:fix` - fixes any prettier issues
- `npm run lint:ts` - runs ESLint against all source files
- `npm run lint:ts:fix` - fixes any ESLint issues
- `npm run ts` - compiles TypeScript into JavaScript and type definitions into the lib folder
- `npm run ts:check` - type checks the TypeScript source files

## Production build

Run `npm run build -- --env.version=1.2.3` to create a production build, where 1.2.3 is any version you want. This creates a build into the dist folder and is what is used to deploy to the CDN.

> We pass in a version argument (--env.version=X), because we assume this step will be run by TeamCity. TC (and the NuGet packages we push to Octo) have different versioning schemes from npm packages - build numbers produced by TeamCity aren't valid version numbers that can be used in package.json e.g. a build number of 1.2.3.4-r2a3d4f. Note: this will be fixed by https://github.com/nice-digital/teamcity-build-number/issues/16.

## Deployment package

We pack a _nupkg_ file for deployment to the CDN, using `dotnet pack` in TeamCity. This is then passed to Octopus Deploy for deployment to the CDN.

Run the following to to test what the deployment packages looks like locally. First run `npm run build && cd dist && npm pack ../` to create the dist folder containing the CDN bundles and npm tgz. Then run the following command:

```
dotnet pack NICE.CookieBanner.CDN.csproj -o publish /p:Version=1.2.3-r1a2b3c
```

Where the version number can be any valid [SemVer build number](https://octopus.com/blog/semver2) compatible with Octopus Deploy. This version number will be the build number when TeamCity creates this build artifact, i.e. `/p:Version=%build.number%`

> Note: you'll need the .NET Core SDK installed. We use `dotnet pack` (and not NuGet.exe) to pack so we can run on both Windows and Linux

## Adding a new cookie

Implementing new features sometimes requires new cookies. All cookies should be in the cookie statement and within the cookie banner config. Take the following steps when identifying a new cookie:

1. Decide on the type of cookie: essential, preference, or analytics. Note: the ICO refers to 'strictly necessary' cookie and the guidance says "it is important to remember that what is ‘strictly necessary’ should be assessed from the point of view of the user or subscriber, not your own". See the [What is the ‘strictly necessary’ exemption?](https://ico.org.uk/for-organisations/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/what-are-the-rules-on-cookies-and-similar-technologies/#rules9) section in the ICO guidance.
2. Decide on an appropriate expiry, see the [How long should our cookies last?](https://ico.org.uk/for-organisations/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/how-do-we-comply-with-the-cookie-rules/#comply20) section in the ICO guidance.
3. Add the new cookie to the Cookie List confluence page in the appropriate section
4. Submit a pull request to this cookie-banner repository with the following:
   1. The new cookie in the appropriate place in the cookie control config
   2. Change the statement date in the cookie control config (this prompts users to re-consent now the policy has changed)
5. Follow the 'Integrate with your application' section above
6. Get the policy amended to add the new cookie - you may need to speak to comms
7. Release the cookie banner
8. Release your application
