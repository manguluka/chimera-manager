# Chimera Manager

> Chimera Arts & Makerspace management software

## Technical Overview

- Backend written in JavaScript using Node.js 7.1+
- Frontend built with pug templates and some WebPack/React
- Styles in Sass using Bootstrap
- Database is PostgreSQL
- Test suite using Mocha, Chai


## Todo

### Major Functionality

- [ ] Signup/pay flow
- [ ] Email functionality
- [ ] Meetup sync
- [ ] Real auth

### Events

- [x] I want to post our events in one place
- [x] I want to sell internal and external events on one platform
- [x] I want to automatically apply member discounts
- [ ] I want our public events to sync with Meetup.com
- [x] I want a record of who changed what
- [ ] I want staff to have an interface where they can sort by month/week/day, draft/published, internal/external, category
- [ ] I want to notify instructors of their students and class status changes automatically
- [ ] I want non-staff to submit proposal for events (must be users first)
- [ ] I want staff to be able to add to an event
    - [ ] I want attendees to get an email confirmation with class info, reminders, a link to cancel and a receipt
    - [ ] I want to enforce attendee limits by not allowing more signups or automatically cancelling event by cancellation period if minimum wasn't hit
    - [ ] I want to automatically notify attendees and instructors of cancellation, refund students and cancel on Meetup.com
    - [ ] I want an easy way to refund attendees
    - [ ] I want people to sign up for a waitlist for an event if it is full
      - [ ] I want the next in line to get notified of opening and if they don't respond quickly, notify the next and so on.
- [ ] I want a report of events for monthly board meetings (types, revenue by type, number of attendees, cancellations)
- [ ] I want a calendar to display on the website (public) and in the space (internal, public, reservations) ([see here](http://demos.creative-tim.com/fullcalendar))

### Members / Users

- [ ] I want to create membership plans, some with number of day passes
- [ ] I want members to be able to signup for membership online
- [ ] I want a member/staff to be able to apply a coupon during sign up
- [ ] I want to be able to activate a member after their orientation which charges them
- [ ] I want to be able to credit or charge a member as needed
- [ ] I want a user or staff person to be able to change email and password
- [ ] I want a history of changes to the member
- [ ] I want a member or staff to be able to upgrade/downgrade/cancel a membership
- [ ] I want a dashboard of new/leaving/total members (amount per type, revenue per type, churn rate)
- [ ] I want to record who was signed off on what equipment/area in the space 
- [ ] I want to be able to create members on certain plans with discounts/coupons
- [ ] I want to be able to create/manage staff members

### Access Control

- [ ] I want to allow members to checkin to the space with an RFID card
- [ ] I want a dashboard of members who have used more days than they paid for (but not deny them)
- [ ] I want to be able add/remove RFID cards for a user
- [ ] I want to log every access to the space (who, time)
- [ ] I want to mark off a day pass as used when a member checks in for the first time a day
- [ ] I want a dashboard of checkins per day (log of all checkins, who was their that day)
- [ ] I want a member profile to show all of the members past checkins
- [ ] I want to automatically notify members that they've gone over their usage

### Resource

- [ ] I want to create a catalog of equipment/areas that a member can reserve and get signed off on
- [ ] I want a member/staff to be able to book a resource for a date and time
- [ ] I want to control how much a member on a certain plan can use a particular piece of equipment
- [ ] I want to charge a member if they go over their allotted usage each billing period ($ per hour/minute)
- [ ] I want to be able to give a member more credits/refund as needed


## Features

### Events

  - **Event Categories** - Classes, meetups, trainings, events
  - **Internal & external events** - Host member-only events or sell tickets to the general public
  - **Free or paid events** - Sell access to classes, events, trainings and more or host free events.
  - **Member discounts** - Give members discounted pricing for events, configurable globally or per-event.
  - **Draft events** - Lock in an date and time before you have details for a given event.


### Resources & Bookings
  - Reserve equipment/spaces
  - Charge for reservations based on plan

### Access Control

### Membership


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
