from sqlalchemy.orm import Session
from models.users.model import User
from schemas.users.schema import UserCreate, UserUpdate
from sqlalchemy.exc import SQLAlchemyError
from passlib.context import CryptContext
from services.token_service import create_access_token
from datetime import timedelta
from fastapi import HTTPException
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#password hashing 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password:str) -> str:
    return pwd_context.hash(password)

def create_user(db:Session, user:UserCreate) -> User | None:
    try:
        hashed_password = get_password_hash(user.password)
        new_user = User(
            first_name = user.first_name, 
            last_name = user.last_name,
            age = user.age,
            email = user.email,
            password = hashed_password,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f'User created successfully: {new_user.password}')
        return new_user
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Error creating user:{e}')
        return None
    
def get_all_users(db: Session, skip: int = 0, limit: int = 10):
    try:
        users = db.query(User).offset(skip).limit(limit).all()
        logger.info(f'Retrieved {len(users)} users (skip={skip}, limit={limit})')
        return users
    except SQLAlchemyError as e:
        logger.error(f'Error retrieving all users:{e}')
        return []
    
def get_user(db: Session, user_id: int) -> User | None:
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            logger.info("User retriverd successfully")
        else:
            logger.warning(f'No user found: {user_id}')
        return user
    except SQLAlchemyError as e:
        logger.error(f'Error retrieving user with id{user_id}: {e}')
        return None
    
def update_user(db:Session, user_id: int, update_user: UserUpdate) -> User | None:
    try:
        user_to_update = db.query(User).filter(User.id == user_id).first()
        if not user_to_update:
            logger.warning(f'User with ID:{user_id} does not exist')
            return None
        for key, value in update_user.dict(exclude_unset=True).items():
            setattr(user_to_update, key, value)
        db.commit()
        db.refresh(user_to_update)
        logger.info(f'User updated')
        return user_to_update
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'Error occur in Updating the user with id{user_id}: ',e)
        return None
    
def delete_user(db:Session, user_id: int)->bool | None:
    try:
        user_to_delete = db.query(User).filter(User.id== user_id).first()
        if not user_to_delete:
            logger.warning(f'User not exist')
            return False
        db.delete(user_to_delete)
        db.commit()
        logger.info(f'Deleted success')
        return True
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f'error deleting user',e)
        return None
    

def verify_password(plain_password:str, hashed_password: str)->bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db:Session, email:str, password:str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access_token = create_access_token(data={'sub':user.email}, expires_delta=timedelta(minutes=10))
    return {"access_token": access_token, "token_type":"bearer", "user":user}