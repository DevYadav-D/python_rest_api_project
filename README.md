# python_rest_api_project

- Add .gitignore
- python -m venv venv
- .\venv\Scripts\activate
- python.exe -m pip install --upgrade pip
- pip freeze > requirements.txt
- pip install fastapi //FastAPI: selected as the framework for building the application because of it's build in support for validation and type checking , ofcourse modern features, speed are included.
- pip install uvicorn //(An asgi server is required to run the application because fastapi doesn't have inbuild server like flask (werkzeug server))Uvicorn is lightweight and best match for fastapi.
  -- Note: In python 3 sqlite3 libray is already included in the standard library, so we can use sqlite db (instead of using an in-memory data store like list etc)
- pip install sqlalchemy //used as the object relational mapper(ORM) to facilitate seamless interaction between the application and sqlite db(or any db in future), simplifying database operations.
- pip freeze > requirements.txt //to update the requiremets.txt

# project hierarchy

main.py
.env

- core
  - configure.py
  - database.py
- schemas
  - users/schema.py
- models
  - users/models.py
- services
  - users/service.py
- routers
  - users/router.py

pip install pytest pytest-asyncio fastapi

docker build -f backend/Dockerfile -t backend-image .

<!-- #let's add some REst api for user
# data = []
# class User(BaseModel):
#     name: str
#     age: int

# @app.get("/users/")
# def get_all_users():
#     return {"data": data}
# @app.post("/users/")
# def add_user(user: User):
#     new_user = user.dict()
#     data.append(new_user)
#     return {"message": "User added", "data": new_user}
# @app.get("/users/{id}")
# def get_user(id: int):
#     if id<len(data):
#         return {"data":data[id]}
#     return {"message": "user not found"}
# @app.put("/users/{id}")
# def update_user(id: int, user:User):
#     if id<len(data):
#         data[id] = user.dict()
#         return {"message": "Updated", "data": data[id]}
#     return {"error": "user not found"}
# @app.delete("/users/{id}")
# def delete_user(id: int):
#     if id<len(data):
#         deleted_user= data.pop(id)
#         return {"message:": "deleted", "data":deleted_user}
#     return {"error": "user not found"}

import sqlite3
#connection to db
conn = sqlite3.connect('example.db')
cursor = conn.cursor()
#create table
cursor.execute(CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL, age INTEGER))
#insert: add new user
cursor.execute('INSERT INTO users (name, age) VALUES (?,?)',('jack', 23))
#read: Retrieve data
cursor.execute('SELECT \* FROM users')
users = cursor.fetchall()
print(users)
#update: update a user's age
cursor.execute('UPDATE users SET age = ? WHERE name = ?', (26, 'jack'))
#Delete: Remove a user
cursor.execute('DELETE FROM users WHERE name=?',('jack',))
#commit the changes and close the connection
conn.commit()
conn.close()
-->
