from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    app_name: str = Field(..., env="APP_NAME")
    debug: bool = Field(..., env="DEBUG")

    user_db_url: str = Field(..., env="USER_DB_URL")

    host: str = Field(..., env="HOST")
    port: int = Field(..., env="PORT")

    backend_url: str = Field(..., env="BACKEND_URL")

    class Config:
        env_file = ".env"

settings = Settings()