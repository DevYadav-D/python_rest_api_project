import os
from dotenv import load_dotenv

load_dotenv()

class Settings:

    app_name = os.getenv("APP_NAME", "RESTAPI")
    debug = os.getenv("DEBUG", "True") == "True"

    user_db_url = os.getenv("USER_DB_URL", "sqlite:///./user.db")

    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")

settings = Settings()