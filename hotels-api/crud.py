import uuid

from sqlalchemy.orm import Session, joinedload

import models
import schemas

def create_amenities(db: Session, amenities: list[str], hotel_id: uuid.UUID):
    try:
        db_amenities = []
        for amenity in amenities:
            db_amenity = models.Amenities(id=uuid.uuid4(), name=amenity, hotel_id=hotel_id)
            db.add(db_amenity)
            db_amenities.append(db_amenity)
        db.commit()
        return db_amenities
    except Exception as e:
        db.rollback()
        raise e

def create_image_src(db: Session, image_srcs: list[str], hotel_id: uuid.UUID):
    try:
        db_image_srcs = []
        for src in image_srcs:
            db_image_src = models.ImageSrc(id=uuid.uuid4(), src=src, hotel_id=hotel_id)
            db.add(db_image_src)
            db_image_srcs.append(db_image_src)
        db.commit()
        return db_image_srcs
    except Exception as e:
        db.rollback()
        raise e

def create_hotel(db: Session, hotel: schemas.Hotel):
    try:
        db_hotel = models.Hotel(
            id=uuid.uuid4(),  # Generate a UUID instance
            name=hotel.name,
            location=hotel.location,
            description=hotel.description,
            review_mark=hotel.review_mark,
            comments_count=hotel.comments_count,
            average_price=hotel.average_price,
        )

        db.add(db_hotel)
        db.commit()
        db.refresh(db_hotel)

        create_amenities(db, hotel.amenities, db_hotel.id)
        create_image_src(db, hotel.image_srcs, db_hotel.id)
        return db_hotel
    except Exception as e:
        db.rollback()
        raise e

def get_hotels(db: Session):
    try:
        hotels = db.query(models.Hotel).options(joinedload(models.Hotel.image_srcs)).all()
        result = []
        for hotel in hotels:
            hotel_data = {
                "id": hotel.id,
                "name": hotel.name,
                "location": hotel.location,
                "description": hotel.description,
                "review_mark": hotel.review_mark,
                "comments_count": hotel.comments_count,
                "average_price": hotel.average_price,
                "image_srcs": [image.src for image in hotel.image_srcs]
            }
            result.append(hotel_data)
        return result
    except Exception as e:
        raise e

def get_hotel_by_id(db: Session, hotel_id: uuid.UUID):
    try:
        hotel = db.query(models.Hotel).options(
            joinedload(models.Hotel.image_srcs),
            joinedload(models.Hotel.amenities)
        ).filter(models.Hotel.id == hotel_id).first()

        if hotel is None:
            return None

        hotel_data = {
            "id": hotel.id,
            "name": hotel.name,
            "location": hotel.location,
            "description": hotel.description,
            "review_mark": hotel.review_mark,
            "comments_count": hotel.comments_count,
            "average_price": hotel.average_price,
            "image_srcs": [image.src for image in hotel.image_srcs],
            "amenities": [amenity.name for amenity in hotel.amenities]
        }
        return hotel_data
    except Exception as e:
        raise e