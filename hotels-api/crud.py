import uuid

from sqlalchemy.orm import Session

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