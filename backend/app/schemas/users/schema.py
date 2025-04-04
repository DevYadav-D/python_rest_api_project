from pydantic import BaseModel, EmailStr, constr, Field, field_validator

class UserBase(BaseModel):
    first_name: constr(strip_whitespace=True, max_length=50)
    last_name: constr(strip_whitespace=True, max_length=50)
    age: int = Field(...,ge=0, le=120)
    email: EmailStr

    @field_validator("email")
    def sanitize_email(cls, value):
        return value.lower()

class UserCreate(UserBase):
    password: str
    class Config:
        from_attributes: True

class UserUpdate(UserCreate):
    first_name: constr(strip_whitespace=True, max_length=50) | None
    last_name: constr(strip_whitespace=True, max_length=50) | None
    age: int = Field(None, ge=0, le=120)
    email: EmailStr | None

class User(UserBase):
    id: int | None
    class Config:
        from_attributes = True

class DeleteUser(BaseModel):
    message:str

class LoginCredentials(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"