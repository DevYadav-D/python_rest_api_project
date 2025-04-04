from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from core.config import settings
from core.database import init_db
from routers.users.router import router as user_router

app = FastAPI(title=settings.app_name)



@app.get("/")
def read_root():
    return {"message":"this is root updated"}


app.include_router(user_router)
init_db()



if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=settings.debug)
