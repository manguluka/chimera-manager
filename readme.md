# Chimera Manageer

> Chimera Arts & Makerspace management software

## Todo

- Bookings
  - Reserve equipment/spaces
  - Charge for reservations based on plan
- Events
  - Classes, meetups, trainings, events
  - Public/private
  - Free/paid
  - Member discounts
- Resources
- Instructors
- Members

## Overview

- `/frontend` contains a basic React + Redux setup built using WebPack.
- `/server` is a basic express app using the pug template library.
- `/lib` is for common code across frontend/backend.
- `/migrations` is where our SQL migrations live.
- `/scripts` is where useful scripts exist, including migration helpers.
- `/test` has test configuration for Mocha/Chai test suite.


## Setup

```bash
# Install NVM, then:
nvm install
nvm use

# Install deps
npm install

# Run
npm start # or npm run watch
```


## Development

Run the app with `npm start` or watch for changes using `npm run watch`.

Build frontend assets into the `/public` directory using `npm run build-assets`.

Run tests with `npm test` or `npm run watch-test`.

Configuration is done using the `config` library. Check out the defaults in `config/default.js` and override by setting environment variables (see `config/custom-environment-variables.js` for a list of what environment variable maps to what config value).


### Migrations

- Create migrations with `./scripts/migrate-create my-migration`
- Run migrations with `./scripts/migrate-up`
- Roll back migrations with `./scripts/migrate-down`


## Credits

Created by [Dana Woodman](http://danawoodman.com).

Copyright &copy; Dana Woodman 2017. Released under an MIT licence.
