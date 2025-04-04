import pytest
import sys
import os

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../backend/app")))
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))


from fastapi.testclient import TestClient
from main import app
from core.database import UserORM, get_user_db, user_session_local
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.users.model import User

TEST_DB_URL = "sqlite:///./test.db" 
test_db_engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread":False})
test_session_local = sessionmaker(bind=test_db_engine, autoflush=False, autocommit=False)

def override_get_user_db():
    db = test_session_local()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_user_db] = override_get_user_db
UserORM.metadata.create_all(bind=test_db_engine)

client = TestClient(app)

@pytest.fixture(scope="function", autouse=True)
def cleanup_test_db():
    db = test_session_local()
    try:
        db.query(User).delete()
        db.commit()
        yield
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

@pytest.fixture(scope="function")
def setup_test_data():
    db = test_session_local()
    test_user = User(
        first_name = "Test",
        last_name = "User",
        age =25,
        email = "test@test.com",
        password="securePassword"
    )
    db.add(test_user)
    db.commit()
    db.refresh(test_user)
    db.close()
    return test_user


def test_create_user():
    payload = {
        "first_name": "John",
        "last_name": "Doe",
        "age": 30,
        "email": "john23.doe@example.com",
        "password": "securepassword"
    }
    response = client.post("/users/",json=payload)
    print(response.json())
    assert response.status_code == 201
    assert response.json()["first_name"] == payload["first_name"]

def test_get_all_users(setup_test_data):
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(),list)
    assert len(response.json())>0

def test_get_user_by_id(setup_test_data):
    user_id = setup_test_data.id
    response = client.get(f'/users/{user_id}')
    assert response.status_code == 200
    assert response.json()["email"] == setup_test_data.email

def test_update_user(setup_test_data):
    user_id = setup_test_data.id
    payload = {
        "first_name": "UpdatedName",  # include all required fields
        "last_name": "UpdatedLastName",
        "email": "updated.email@example.com",
        "password": "newpassword",
        "age": 35
    }
    response = client.put(f"/users/{user_id}", json=payload)
    print(response.json())
    assert response.status_code == 202
    assert response.json()["age"] == payload["age"]

def test_delete_user(setup_test_data):
    user_id = setup_test_data.id
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 204


