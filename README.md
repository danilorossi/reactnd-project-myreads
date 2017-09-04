# MyReads Project

This is the final assessment project for [Udacity's React course](https://www.udacity.com/course/react-nanodegree--nd019) (Fundamentals section), based on the [starter project template](https://github.com/udacity/reactnd-project-myreads-starter).

## Getting started

To get started developing right away:

* clone this repository
* install all project dependencies with `npm install` or `yarn install`
* start the development server with `npm start` or `yarn start`

There are also other commands inherited from [create-react-app](https://github.com/facebookincubator/create-react-app), which is the tool Udacity starter project is based on:

* `npm test` or `yarn test` to run the test watcher in an interactive mode
* `npm run build` or `yarn run build` to build the app for production to the `build` folder

## What You're Getting

In addition to the original packages, the follwing packages have been included:

* `react-router-dom` to manage routing
* `validate-commit-msg` to be consistent with the required commit message format
* `ghooks` to prevent from committing with a wrong message format

This is the current project structure:

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file.
├── public
│   ├── assets # Static assets like images.
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components # All React components go here.
    │   ├── common # other components (BookShelf, Book etc.)
    │   ├── home # Home page component
    │   └── search # Search page component
    ├── constants # Constants to use across the app.
    ├── utils # Utility functions and modules.
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── setupTest.js # Setup Jest testing to mock browser's APIs.
    ├── index.css # Global styles.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```


## Backend

The backend service and JavaScript API is provided by Udacity: check [docs/BACKEND.md](docs/BACKEND.md) for more details.

## Create React App

The original starter project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository for the final assessment project for Udacity's React Fundamentals course, based on the [starter project template](https://github.com/udacity/reactnd-project-myreads-starter).

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
