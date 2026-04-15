from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.report_service import extract_text_from_pdf
from app.services.orchestrator import run_report_pipeline

router = APIRouter()


@router.post("/analyze-report")
async def analyze_report_endpoint(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

        # Read file bytes
        contents = await file.read()

        if not contents:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(contents)

        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF. It may be a scanned document."
            )

        # Run full multi-agent pipeline
        result = run_report_pipeline(extracted_text)

        return result

    except HTTPException as http_err:
        raise http_err

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )