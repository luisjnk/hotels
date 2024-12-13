import uuid
from numbers import Number

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class Amenities(Base):
    __tablename__ = "amenities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, index=True)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey('hotel.id'), index=True)
    hotel = relationship("Hotel", back_populates="amenities")

class ImageSrc(Base):
    __tablename__ = "image_src"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    src = Column(String, index=True)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey('hotel.id'), index=True)
    hotel = relationship("Hotel", back_populates="image_srcs")

class Hotel(Base):
    __tablename__ = "hotel"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    description = Column(String, index=True)
    review_mark = Column(String, index=True)
    comments_count = Column(Integer, index=True)
    average_price = Column(Integer, index=True)
    amenities = relationship("Amenities", back_populates="hotel")
    image_srcs = relationship("ImageSrc", back_populates="hotel")