from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


from core.config import settings
from core.database import init_db
from routers.users.router import router as user_router

app = FastAPI(title=settings.app_name)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message":"this is root updated"}


app.include_router(user_router)
init_db()



if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=settings.debug)
