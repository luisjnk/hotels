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
