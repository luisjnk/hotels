from starlette import status

import crud
import models
from fastapi import FastAPI, Depends, HTTPException
from database import engine, get_db
from sqlalchemy.orm import Session

from schemas import Hotel
from scrape import  scrape_hotels

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

#Add Exception to the get_hotels_scrape
@app.get("/api/hotels/scrape")
def get_hotels_scrape():
        data =  scrape_hotels()
        return data

#Add Exception to create_hotel
@app.post("/api/hotels/")
async def create_hotel(hotel: Hotel, db: Session = Depends(get_db)):
    return crud.create_hotel(db=db, hotel=hotel)

@app.get("/api/hotels/")
async def get_hotels(db: Session = Depends(get_db)):
    try:
        hotels = db.query(models.Hotel).all()
        return hotels
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

#ADD CORS

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

