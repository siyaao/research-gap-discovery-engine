from fastapi import APIRouter

from app.services.semantic_scholar import search_papers

router = APIRouter(
    prefix="/search",
    tags=["Semantic Scholar"]
)

@router.get("/")
async def search(query: str):
    result = search_papers(query)
    return result