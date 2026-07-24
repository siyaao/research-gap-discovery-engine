from fastapi import APIRouter, UploadFile, File, HTTPException
import os

from app.database.mongodb import database
from app.services.pdf_service import extract_pdf_data
from app.services.keyword_service import extract_keywords
from app.services.semantic_scholar import search_papers
from app.services.llm_service import generate_research_gap

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Save uploaded PDF
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Extract text from PDF
        extracted_text = extract_pdf_data(file_path)

        # Extract keywords
        keywords = extract_keywords(extracted_text)

        # Search related papers
        query = " ".join(keywords[:5])

        try:
            papers = search_papers(query)
        except Exception as e:
            print("Semantic Scholar Error:", e)
            papers = []

        # Generate AI Report
        report = generate_research_gap(
            extracted_text,
            keywords,
            papers
        )

        # Save into MongoDB
        document = {
            "filename": file.filename,
            "text": extracted_text,
            "keywords": keywords,
            "related_papers": papers,
            "report": report
        }

        await database.reports.insert_one(document)

        return {
            "success": True,
            "filename": file.filename,
            "characters": len(extracted_text),
            "keywords": keywords,
            "related_papers": papers,
            "report": report
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )