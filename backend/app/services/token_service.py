from datetime import datetime, timedelta
from jose import jwt, JWTError

from core.config import settings

def create_access_token(data:dict, expires_delta: timedelta | None)-> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({'exp':expire})

    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def decode_access_token(token:str)->dict|None:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=settings.algorithm)
        return payload
    except JWTError as e:
        print(f"Token validation error: {e}")
        return None