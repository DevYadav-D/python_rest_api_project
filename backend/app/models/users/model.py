from sqlalchemy import Column, Integer, String
from core.database import UserORM

class User(UserORM):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, unique=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    