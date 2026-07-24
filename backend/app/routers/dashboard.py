from fastapi import APIRouter
from app.database.mongodb import database
from collections import Counter

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
async def dashboard():

    reports = await database.reports.count_documents({})

    uploads = reports

    keyword_counter = Counter()

    recent = []

    cursor = database.reports.find().sort("_id", -1)

    async for doc in cursor:

        keywords = doc.get("keywords", [])

        keyword_counter.update(keywords)

        recent.append({
            "filename": doc["filename"],
            "keywords": keywords
        })

    chart_data = [
        {
            "keyword": key,
            "count": value
        }
        for key, value in keyword_counter.most_common(10)
    ]

    return {
        "total_reports": reports,
        "total_uploads": uploads,
        "total_keywords": sum(keyword_counter.values()),
        "recent_reports": recent[:5],
        "keyword_chart": chart_data
    }