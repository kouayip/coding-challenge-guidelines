# Coding Challenge Guidelines

This application that draws a 3-dimensional visualization of the social posts.

## Project Structure

```text
/src
  /components        # Reusable components
  /pages             # Specific page components
  /providers         # Contexts and Providers for global state management
  /hooks             # Custom hooks for reusable logic
  /services          # Services for business logic
    /config          # Application configurations
  /styles            # Style sheets (Less, SCSS, CSS)
  /utils             # Fonctions utilitaires générales
```

## Installation

```bash
$ yarn install
```

## Running the app

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
# development
$ yarn run dev
```

## Builds

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```bash
$ yarn run build
```

## Test

Launches the test runner.

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run cy:e2e

# test coverage
$ yarn run test:cov
```
