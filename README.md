# Coding Challenge Guidelines
This application is a front-end solution for visualizing social media posts in a 3-dimensional punch card system. It consumes a real-time streaming API endpoint provided by Upfluence to display the distribution of social media posts based on the day of the week, hour of the day, and the number of posts.

## Solution Description

The application utilizes React.js for the front-end framework, allowing for efficient rendering and management of components. It uses Chart.js for creating the punch card visualizations, providing an interactive and visually appealing representation of the social media post data.

Additionally, the application implements event emitters to dispatch events based on their type. This allows for the creation of observables that subscribe to a specific type of event, ensuring that only relevant notifications are received. This guarantees that the visualization of a punch card updates only if it receives an event of the same type to which it subscribed initially, thus avoiding unnecessary re-rendering.

## Technical Choices
* React.js: Chosen for its component-based architecture, allowing for the creation of reusable and modular UI elements.

* Chart.js: Utilized for its simplicity in creating customizable and responsive charts. The punch card visualizations provide a clear and intuitive representation of the data.

* Observable Pattern: Implemented using custom hooks (useEventSource) to manage data flow and event subscriptions. This pattern ensures efficient updates to the punch card visualizations, reducing unnecessary re-renders.

* Event Emitters: Event emitters dispatch events based on their type, allowing components to subscribe and react to specific event types.

## Trade-offs and future improvements

Although the current implementation meets the functional requirements, there are trade-offs and areas for improvement:

1. Test coverage: Test coverage includes end-to-end testing with Cypress, ensuring the basic functionality of the application. However, additional unit and integration tests could be added for more complete coverage.

2. Error handling: More robust error handling could be implemented to elegantly handle network failures or API errors.

3. Improved design: Improvements to the overall design and user interface could make the application more attractive and intuitive.

4. Limiting Size of Punch Card Elements: Implementing a maximum size for the radius of the punch card elements. This would prevent large elements from overwhelming the visualization over time as more data is added.

In future iterations, I'll be focusing on these areas to improve the application's usability, reliability and performance.

---

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

---

## Additional Notes
The application is designed to be responsive and should work well on various screen sizes.

Please ensure that you have a stable internet connection to receive real-time updates from the streaming API.

Custom Observable Pattern: I chose to develop a custom Observable pattern and Event Emitters for increased complexity and to limit the reliance on external libraries. However, the solution could also work effectively with libraries like **RxJS** for managing data streams and event handling.
