import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#Create Function to receive the env variable for docker and then connect to database

URL_DATABASE = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/postgres")
#URL_DATABASE = "postgresql+psycopg2://postgres:postgres@db:5432/postgres"

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()