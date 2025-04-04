import os
from dotenv import load_dotenv

load_dotenv()

class Settings:

    app_name = os.getenv("APP_NAME", "RESTAPI")
    debug = os.getenv("DEBUG", "True") == "True"

    user_db_url = os.getenv("USER_DB_URL", "sqlite:///./user.db")

    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")

    secret_key: str = os.getenv("SECRET_KEY", "secret_key")  
    algorithm: str = os.getenv("ALGORITHM", "HS256") 
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))  


settings = Settings()