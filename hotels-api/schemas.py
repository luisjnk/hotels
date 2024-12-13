from pydantic import BaseModel

class Hotel(BaseModel):
    name: str
    location: str
    description: str
    review_mark: str
    comments_count: int
    average_price: int
    amenities: list[str]
    image_srcs: list[str]

    class Config:
        orm_mode = True