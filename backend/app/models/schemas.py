from pydantic import BaseModel
from typing import List

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    summary: str
    insights: List[str]
    risk_level: str
