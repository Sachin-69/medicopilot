import json
from app.services.llm_service import call_llm

def analyze_report(text: str) -> dict:
    # Truncate text to avoid token overflow
    truncated_text = text[:3000]

    prompt = (
        "You are an expert AI medical assistant.\n\n"
        "Your task:\n"
        "- Read the following medical report text.\n"
        "- Summarize the report simply.\n"
        "- List any abnormal findings.\n"
        "- List potential health concerns based on the findings.\n\n"
        "STRICT RULES:\n"
        "- Do NOT provide medical diagnosis.\n"
        "- Return ONLY valid JSON (no extra text or markdown formatting).\n\n"
        f"Report Text:\n{truncated_text}\n\n"
        "Output format:\n"
        "{\n"
        '  "summary": "simple explanation of report",\n'
        '  "abnormalities": ["list of abnormal findings"],\n'
        '  "concerns": ["potential health concerns"]\n'
        "}\n"
    )

    try:
        response = call_llm(prompt)
        parsed = json.loads(response)
        return parsed
    except Exception as e:
        return {
            "summary": f"Failed to analyze report: {str(e)}",
            "abnormalities": [],
            "concerns": []
        }
