from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import database

from app.routers.auth import router as auth_router
from app.routers.upload import router as upload_router
from app.routers.analyze import router as analyze_router
from app.routers.search import router as search_router
from app.security.jwt_handler import get_current_user
from app.routers.keywords import router as keywords_router
from app.routers.report import router as report_router
from app.routers.dashboard import router as dashboard_router
from app.routers.profile import router as profile_router

app = FastAPI(
    title="AI Research Gap Discovery Engine",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_db():
    await database.command("ping")
    print("✅ Connected to MongoDB Atlas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register all routers
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(analyze_router)
app.include_router(search_router)
app.include_router(keywords_router)
app.include_router(report_router)
app.include_router(dashboard_router)
app.include_router(profile_router)

@app.get("/")
async def root():
    return {
        "message": "Backend connected successfully!"
    }

@app.get("/profile")
async def profile(user=Depends(get_current_user)):
    return {
        "message": "Protected route accessed successfully",
        "user": user
    }