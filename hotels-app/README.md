# Hotel App

This is a React-based hotel application that allows users to view hotel details. The application is built using TypeScript and JavaScript, and it uses Jest for testing.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/luisjnk/hotels-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd hotels-app
   ```
3. Install the dependencies:
   ```sh
   npm install || npm install --legacy-peer-deps
   ```

## Running the Application

To start the development server, run:
```sh
npm start
```
This will start the application on `http://localhost:3000`.

## Running Tests

To run the tests, use:
```sh
npm run test
```
To run tests with coverage, use:
```sh
npm run test:coverage
```

## Building the Application

To build the application for production, run:
```sh
npm run build
```
This will create a `build` directory with the production build of the application.

## Project Structure

- `src/`: Contains the source code of the application.
- `src/pages/`: Contains the page components.
- `src/components/`: Contains the reusable components.
- `src/services/`: Contains the API service functions.
- `src/types/`: Contains the TypeScript types.
- `src/__tests__/`: Contains the test files.

## Configuration

- `jest.config.js`: Jest configuration file.
- `package.json`: Contains the project dependencies and scripts.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.