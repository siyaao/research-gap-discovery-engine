from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import traceback
from app.services.llm_service import generate_research_gap

router = APIRouter(
    prefix="/analyze",
    tags=["AI Analysis"]
)


class AnalyzeRequest(BaseModel):
    text: str
    keywords: list[str]
    papers: list


@router.post("/")
async def analyze(request: AnalyzeRequest):
    try:
        report = generate_research_gap(
            request.text,
            request.keywords,
            request.papers
        )

        return {
            "success": True,
            "report": report
        }

    

    except Exception as e:
        traceback.print_exc()
        return HTTPException(
            status_code=500,
             detail=str(e)
    )