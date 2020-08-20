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

TODO

### Usage within other services

This cookie banner should be used for cookie management for any NICE digital service. TODO

See the [usage](#usage) section below for detailed usage instructions.

## Usage

There are 2 main ways to use the cookier banner: either [via the NICE CDN](#cdn) as a script include or as an [import](#import) into your JavaScript module bundling:

### CDN

Loading directly via the CDN is the easiest and most convenenient way to include the cookie banner. This is a good method for projects without a module bundling system, or as a quick way to get started. It also means you always have the latest version of the cookie banner as you don't need a version bump release.

> using the CDN adds an extra HTTP request, so adds a slight performance overhead. Importing the module version (see the [import](#import) section below) is a better option for projects with a module bundling system (for example with webpack).

TODO - add CDN URLs

### Import

Importing the cookie banner as a module allows integrating it into your code base and build. This means you have more control over how the cookie banner is loaded. The downside is you fix the version in your package.json so you need a release to update to a newer version of the cookie banner.

TODO

## Development

### :rocket: Set up

1. Install the latest [Node LTS](https://nodejs.org/en/)
2. Open the project folder with [VSCode](https://code.visualstudio.com/)
3. Install the recommend VSCode extensions
   1. VSCode should prompt you to do this as we include an [extensions.json](.vscode/extensions.json)
4. Run `npm start` to run the project locally TODO
   1. Or use the built in VSCode JavaScript debugging TODO
5. View http://localhost:TODO to view the development site in a browser.

### Commands

Use the following commands for local development:

- `npm start` - TODO
- `npm run build` - builds minified and unminified bundle into the _dist_ for deployment to the CDN
- `npm test` - TODO
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
