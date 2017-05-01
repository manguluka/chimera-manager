# Chimera Manager

> Chimera Arts & Makerspace management software


## Features

- **Event Categories** - Classes, meetups, trainings, events
- **Internal & external events** - Host member-only events or sell tickets to the general public
- **Free or paid events** - Sell access to classes, events, trainings and more or host free events.
- **Member discounts** - Give members discounted pricing for events, configurable globally or per-event.
- **Draft events** - Lock in an date and time before you have details for a given event.
- **Audit log** - Keep track of who changed what and when.
- **Meetup.com sync** - Automatically create, update and cancel public events on Meetup.com.
- **Waitlist** - Automatically put attendees on a waitlist if an event is full.
- **Minimum Attendees** - Automatically cancel events if the minimum attendees is not reached by the cancellation date.
- **Custom Charges** - Charge a user via credit card, cash, check or other methods and keep a paper trail. Reverse transactions as needed.


## Technical Overview

- Backend written in JavaScript using Node.js 7.8+
- Frontend built with pug templates and some WebPack/React
- Styles in Sass using Bootstrap
- Database is PostgreSQL
- Test suite using Mocha, Chai



## Development

## Overview

- `/frontend` contains a basic React + Redux setup built using WebPack.
- `/server` is the express app using the pug template library.
- `/lib` is for common code across frontend/backend.
- `/migrations` is where our SQL migrations live.
- `/scripts` is where useful scripts exist, including migration helpers.
- `/test` has test configuration for Mocha/Chai test suite.


### Setup

```bash
# Install NVM, then:
nvm install
nvm use

# Install deps
npm install

# Run
npm start # or npm run watch
```


### Usage

Run the app with `npm start` or watch for changes using `npm run watch`.

Build frontend assets into the `/public` directory using `npm run build-assets`.

Run tests with `npm test` or `npm run watch-test`.

Configuration is done using the `config` library. Check out the defaults in `config/default.js` and override by setting environment variables (see `config/custom-environment-variables.js` for a list of what environment variable maps to what config value).


### Migrations

- Create migrations with `./scripts/migrate-create my-migration`
- Run migrations with `./scripts/migrate-up`
- Roll back all migrations with `./scripts/migrate-down`


## Credits

Created by [Dana Woodman](http://danawoodman.com).

Copyright &copy; Dana Woodman 2017. Released under an MIT licence.
