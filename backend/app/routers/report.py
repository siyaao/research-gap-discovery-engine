from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database.mongodb import database

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/")
async def get_reports():

    reports = []

    async for report in database.reports.find().sort("_id", -1):

        reports.append({
            "id": str(report["_id"]),
            "filename": report["filename"],
            "keywords": report.get("keywords", []),
            "report": report.get("report", "")
        })

    return reports


@router.delete("/{report_id}")
async def delete_report(report_id: str):

    result = await database.reports.delete_one(
        {
            "_id": ObjectId(report_id)
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {
        "message": "Deleted Successfully"
    }