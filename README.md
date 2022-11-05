# About

Motorway App is a tech challenge provided by Motorway Online Ltd.

## Requirements

Motorway App requires:
* PostgreSQL running through Docker using provided starter package,
* Node v16.13.0 - 16.18.0,
* Yarn v3.0.0 - 3.2.4.

## Setup

In order to set up the project you need to:
* install supported versions of Node and Yarn (check requirements),
* run `yarn` to install dependencies,
* copy `.env.sample` file and save it as a `.env` file,
* fill the `.env` file with your local configuration,
* run `yarn start:dev` to start the local development server.

Alternatively, you can run a docker container using docker compose `docker compose up`. The database instance must be run separately. 

## Environment parameters

Environment parameters available in the `.env` file:
* `NODE_ENV` - node environment (`production|development|test`),
* `PORT` - server port,
* `DEBUG` - logger configuration,
* `DB_HOST` - database server host,
* `DB_USER` - database server username,
* `DB_PASSWORD` - database server password,
* `DB_NAME` - database name.

## Scripts

Available scripts for the project:
* `yarn start` - to start the production server,
* `yarn start:dev` - to start the development server that includes watcher,
* `yarn db:[drop|seed]` - to drop or seed your database,
* `yarn db:migrate:[up|down|reset]` - to migrate, rollback or reset database,
* `yarn db:migrate:create migration-name` - to create a database migration,
* `yarn test` - to run tests,
* `yarn lint` - to run linter,
* `yarn lint:fix` - to run linter with automatic fix.

## Seeding

The seeding process contains 2 files that are available in `db/seed` folder:
* `1-seed.js` - creates a clean database seed,
* `2-init.js` - adds migrations entries that seed includes and other init entries.

Remember to update `2-init.js` file once you are creating a new migration. New entries that should be concluded in further seeds should be defined there too.

## Development

Before first contribution, please remember about:
* `.gitignore` - list there all custom files related to your IDE,
* `.editorconfig` - installation of the EditorConfig plugin in your IDE to follow code formatting standing for the project.

The project is configured to run linter before committing in order to force coding standards.

## Structure

The app is structured in the following way:
* `app` - app directory:
	* `api` - api endpoints/routing,
	* `loader` - app dependency and loader,
	* `model` - database model,
	* `service` - services,
	* `util` - utils,
	* `index.js` - project entry file,
* `db` - database directory:
	* `migration` - migrations,
	* `seed` - seeding scripts,
	* `config.js` - configuration file for Sequelize,
* `test` - tests:
	* `api` - endpoints tests,
	* `service` - services tests,
	* `util` - utils tests,
* `node_modules` - auto-generated node directory,
* `.editorconfig` - editorconfig configuration,
* `.env|.env.sample` - project configuration,
* `.eslintrc.json` - eslint configuration,
* `.gitignore` - files to be ignored by git,
* `.npmrc` - npm configuration,
* `.sequelizerc` - sequelize configuration,
* `.yarnrc.yml` - Yarn configuration,
* `package.json` - project configuration,
* `yarn.lock` - Yarn lock file,
* `README.md` - readme.
