from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from core.config import settings

user_db_engine = create_engine(settings.user_db_url, connect_args={"check_same_thread":False})
user_session_local = sessionmaker(bind=user_db_engine, autoflush=False, autocommit=False)
UserORM = declarative_base()

def init_db():
    try:
        UserORM.metadata.create_all(bind=user_db_engine)
        print("user db initialized successfully")
    except Exception as e:
        print(f'Error initializing the user database: {e}')

def get_user_db() -> Session:
    db = user_session_local()
    try:
        yield db
    finally:
        db.close()
