import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, get_db
from models import Base

# Use an environment variable to set the test database URL
SQLALCHEMY_DATABASE_URL = os.getenv("TEST_DATABASE_URL", "sqlite:///./test.db")

# Create a new engine instance
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a configured "Session" class
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Dependency override
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module")
def test_client():
    yield client

def test_create_hotel(test_client):
    response = test_client.post("/api/hotels/", json={
        "name": "Test Hotel",
        "location": "Test Location",
        "description": "Test Description",
        "review_mark": "9.0",
        "comments_count": 100,
        "amenities": ["Free WiFi", "Pool"],
        "image_srcs": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
        "average_price": 200
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Test Hotel"