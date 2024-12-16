# Hotels API

This project is a FastAPI-based application for managing hotel data.

## Requirements

- Docker
- Docker Compose
- Python 3.8+
- pip

## Running the Project

### Using Docker Compose

1. Build and start the services using Docker Compose:

    ```bash
    docker-compose up --build
    ```

2. The API will be available at `http://localhost:8000`.

### Using Python

1. Create and activate a virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2. Install the dependencies:

    ```bash
    pip install -r hotels-api/requirements.txt
    ```

3. Start the PostgreSQL database using Docker:

    ```bash
    docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:latest
    ```

4. Run the FastAPI application:

    ```bash
    uvicorn hotels-api.main:app --host 0.0.0.0 --port 8000
    ```

5. The API will be available at `http://localhost:8000`.



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