from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.report_service import extract_text_from_pdf
from app.agents.report_agent import analyze_report

router = APIRouter()

class ReportResponse(BaseModel):
    summary: str
    abnormalities: List[str]
    concerns: List[str]

@router.post("/analyze-report", response_model=ReportResponse)
async def analyze_report_endpoint(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    file_bytes = await file.read()
    
    extracted_text = extract_text_from_pdf(file_bytes)
    if not extracted_text:
        return ReportResponse(
            summary="Could not extract text from the provided PDF. It might be empty or scanned.",
            abnormalities=[],
            concerns=[]
        )
    
    result = analyze_report(extracted_text)
    
    return ReportResponse(
        summary=result.get("summary", "Analysis fallback: No summary available"),
        abnormalities=result.get("abnormalities", []),
        concerns=result.get("concerns", [])
    )
