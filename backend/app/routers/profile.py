from fastapi import APIRouter
from app.database.mongodb import database

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@router.get("/")
async def get_profile():

    user = await database.users.find_one()

    if not user:
        return {
            "name": "Unknown User",
            "email": "Not Available",
            "reports": 0
        }

    total_reports = await database.reports.count_documents({})

    return {
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "reports": total_reports
    }