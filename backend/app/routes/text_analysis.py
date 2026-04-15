from fastapi import APIRouter
from pydantic import BaseModel
from app.services.orchestrator import run_text_pipeline

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/analyze-text")
def analyze_text(request: TextRequest):
    return run_text_pipeline(request.text)
