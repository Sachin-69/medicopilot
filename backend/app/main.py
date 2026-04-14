from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import text_analysis, report_analysis

app = FastAPI(
    title="MediCopilot API",
    description="Backend foundation for a multi-agent AI healthcare/insurance assistant.",
    version="0.1.0"
)

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text_analysis.router)
app.include_router(report_analysis.router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "MediCopilot API is running."}
