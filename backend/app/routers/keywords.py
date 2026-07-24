from fastapi import APIRouter
from app.services.keyword_service import extract_keywords

router = APIRouter(
    prefix="/keywords",
    tags=["Keywords"]
)

@router.post("/")
async def keywords(data: dict):

    text = data["text"]

    keywords = extract_keywords(text)

    return {
        "keywords": keywords
    }