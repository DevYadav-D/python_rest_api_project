from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_user_db
from schemas.users.schema import User, UserCreate, UserUpdate
from services.users.service import create_user, get_all_users, get_user, update_user, delete_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user_endpoint(user:UserCreate, db: Session = Depends(get_user_db)):
    print(user.dict())
    new_user = create_user(db, user)
    if not new_user:
        raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="User could not be ceated")
    return new_user

@router.get("/", response_model=list[User])
def get_users_endpoint(skip: int = 0, limit: int = 10, db: Session=Depends(get_user_db)):
    return get_all_users(db, skip, limit)


@router.get("/{user_id}", response_model=User, status_code=status.HTTP_200_OK)
def get_user_endpoint(user_id: int, db:Session = Depends(get_user_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'User not found')
    return user


@router.put("/{user_id}", response_model=User, status_code=status.HTTP_202_ACCEPTED)
def update_user_endpoint(user_id: int, user_data: UserUpdate, db:Session=Depends(get_user_db)):
    updated_user = update_user(db, user_id, user_data)
    if not updated_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'user not updated')
    return updated_user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def deleted_user_endpoint(user_id: int, db:Session=Depends(get_user_db)):
    is_deleted = delete_user(db, user_id)
    if is_deleted is False:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if is_deleted is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="server error")
    return None