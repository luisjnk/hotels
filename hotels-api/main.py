from fastapi.params import Query
from starlette import status
from starlette.middleware.cors import CORSMiddleware

import crud
import models
from fastapi import FastAPI, Depends, HTTPException
from database import engine, get_db
from sqlalchemy.orm import Session, joinedload

from schemas import Hotel
from scrape import scrape_hotels

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

models.Base.metadata.create_all(bind=engine)


@app.get("/api/hotels/scrape")
def get_hotels_scrape(name: str = Query(None)):
    if not name:
        return {
            "name": "",
            "location": "",
            "description": "",
            "review_mark": "",
            "comments_count": 0,
            "amenities": [],
            "image_srcs": [],
            "average_price": 0
        }
    data = scrape_hotels(name)
    return data


@app.post("/api/hotels/")
async def create_hotel(hotel: Hotel, db: Session = Depends(get_db)):
    return crud.create_hotel(db=db, hotel=hotel)


@app.get("/api/hotels/")
async def get_hotels(db: Session = Depends(get_db)):
    try:
        return get_hotels(db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
