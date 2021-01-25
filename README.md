# NodeJS + React Project Template

Project template / boilerplate for a micro-service providing endpoints via Express (NodeJS) and a frontend via React.
This project template comes with **all Frappy modules** pre-installed and set-up for MongoDB.

1. [Requirements](#requirements)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Running the App](#running-the-app)
5. [Development](#development)
    1. [Entry Points](#entry-points)
6. [Environment Variables](#environment-variables)

## Requirements

- NodeJS / npm
- MongoDB or MySQL

## Tech Stack

**Backend**

- `express` to start an HTTP server and provide REST endpoints
- `mongodb` for MongoDB access

**Frontend**

- **React** basic framework for the frontend
- **Webpack** and **Babel** to transpile the frontend into a single index.js, which gets included by the index.html
- **Moment.JS** the standard library for date/time handling in JavaScript
- **S Alert** a basic notification library
- **ESLint** and **Prettier** for linting Javascript code and auto-format

## Installation

```bash
npm install
```

## Running the App

```bash
# build the frontend
npm run build
# run the server
npm run start
```

## Development

Run in 2 separate bash / terminal windows:

```bash
# backend (auto-reload on code change)
npm run hot-server

# frontend builder in watch mode (rebuilds on code change)
npm run hot-client
```

### Entry Points

- The frontend entry point is the `app/src/index.js`, which injects the React application into the DOM.
- The backend entry point is the `server/server.js`, which spins up the Express app.

## Environment Variables

**HTTP Port**

By default the app runs on port **http://localhost:3000**. If you want to run the app on a different port, you can pass 
it as environment variable.

```bash
# for production mode
PORT=5000 npm run start

# or in development
PORT=6000 npm run hot-server
``` 
