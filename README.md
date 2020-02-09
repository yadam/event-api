# event-api

A coding challenge to build an event API

## Installation and Running

This project was built with [yarn](https://yarnpkg.com/). However using [npm](https://www.npmjs.com/) should still be okay.

### Example

Install dependencies and start the server on port 3000.

```bash
$> yarn install --production
$> yarn start
```

## Usage

This server will handle several endpoints for various purposes.

- Create a user
  - Verb: `POST`
  - URL: http://localhost:3000/users
  - Example body:
    - ```
      {
        "email": "adam@example.com",
        "password": "myPassword",
        "phone": "123-456-7890"
      }
      ```
  - Example response:
    - ```
      {
        "email": "adam@example.com",
        "phone": "123-456-7890"
      }
      ```
  - Notes:
    - The phone parameter is optional
- Create an event for a user
  - Verb: `POST`
  - URL: http://localhost:3000/users/adam@example.com/events
  - Example body: `{ "type": "LOGIN" }`
  - Example response:
    - ```
        {
          "type": "LOGIN",
          "id": "ck6chf49f0004bd805segg593",
          "userId": "adam@example.com",
          "created": "2020-02-07T18:07:08.883Z"
        }
      ```
- Get all events for all users
  - Verb: `GET`
  - URL: http://localhost:3000/events
  - Example response:
    - ```
        [
          {
              "type": "LOGIN",
              "userId": "adam@example.com",
              "id": "ck6chev9y0000bd80870da4zh",
              "created": "2020-02-07T18:06:57.239Z"
          },
        ]
      ```
  - Available query parameters:
    - `startDate` - This can be a number or a date string that is parsable by the JavaScript Date constructor. Passing a number will indicate the number of milliseconds since epoch. This represents the beginning of the date range for the fetched events. Defaults to epoch.
    - `endDate` - This can be a number or a date string that is parsable by the JavaScript Date constructor. Passing a number will indicate the number of milliseconds since epoch. This represents the end of the date range for the fetched events. Defaults to `Date.now()`.
- Get all events for a single user
  - Verb: `GET`
  - URL: http://localhost:3000/users/adam@example.com/events
  - Example response:
    - ```
        [
          {
              "type": "LOGIN",
              "userId": "adam@example.com",
              "id": "ck6chev9y0000bd80870da4zh",
              "created": "2020-02-07T18:06:57.239Z"
          },
        ]
      ```
  - Available query parameters:
    - `startDate` - This can be a number or a date string that is parsable by the JavaScript Date constructor. Passing a number will indicate the number of milliseconds since epoch. This represents the beginning of the date range for the fetched events. Defaults to epoch.
    - `endDate` - This can be a number or a date string that is parsable by the JavaScript Date constructor. Passing a number will indicate the number of milliseconds since epoch. This represents the end of the date range for the fetched events. Defaults to `Date.now()`.

## Architectural Overview

This is a fairly simple design with a minimal number of files. This was done for simplicity and for the sake of time. If this solution were to be expanded upon I would expect the structure and separation of concerns to grow.

- `dist` - This folder contains the compiled JavaScript files
- `src` - This folder contains all of the Typescript source code
  - `models` - This folder contains the models for the project
    - `events.test.ts` - Unit tests for the events model
    - `events.ts` - The data storage and functions for interacting with the events model
    - `users.test.ts` - Unit tests for the users model
    - `users.ts` - The data storage and functions for interacting with the users model
  - `index.ts` - The main file of the server. This initializes `express`, loads the routes, and sets any options
  - `routes.test.ts` - Unit tests for the `express` endpoints
  - `routes.ts` - The logic for breaking down `express` requests and calling the appropriate model interaction functions

## Assumptions and Plans

### Configuration

- Port
  - As a simplification I have included a hard coded port number to run the server on. In the future I would plan to make this port number configurable either from the command line or through an environment variable or other config file

### Refactoring

- Dates
  - There is a little bit of complicated date math that happens in `models/events.ts`. If there was enough of this kind of math in the future I would consider refactoring to use a library like [`moment.js`](https://momentjs.com/) to improve readability
  - One of the requirements was that an endpoint be able to return all events for the "last day". I made an assumption that a date range would fulfill this requirement and provide additional functionality. If the requirement needed to be more strict regarding exact time frames then this endpoint could be refactored to support a number of days or hours instead
- Validation
  - To match the scope of this project I am using very simple validation functions. For future development I would look into using a more robust solution such as [`yup`](https://github.com/jquense/yup)
  - Again for simplicity of data storage I am not enforcing referential integrity. It is possible to create events that belong to users that don't exist. In the future, and once this was persisted to more permanent storage I would add referential integrity checks during validation
- Logging
  - I have kept console logging to an absolute minimum. In a more robust solution I would expect at a minimum error logging and perhaps several levels of logging to aid in debugging
- Performance
  - I have not implemented paging at this time. Giving users the ability to request an entire data set without paging could have massive performance implications. I would implement paging in the future

### Security

- Passwords
  - I have made the assumption that password security is outside the scope of this project. If I were to continue working on this project I would salt and hash the password prior to storing it in the database so that we're never storing plain text passwords
  - As provided as an example in the requirements I too have assumed securing these endpoints is outside the scope of the project. In the future I would plan to use a session store to track user sessions
