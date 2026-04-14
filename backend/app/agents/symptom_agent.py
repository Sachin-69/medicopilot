import json
from app.services.llm_service import call_llm


def analyze_symptoms(text: str) -> dict:
    prompt = (
        "You are a medical assistant AI.\n\n"
        "Your job:\n"
        "- Understand user symptoms\n"
        "- Suggest POSSIBLE conditions (not diagnosis)\n"
        "- Assess severity\n"
        "- Suggest next steps\n\n"
        "STRICT RULES:\n"
        "- Do NOT give medical diagnosis\n"
        "- Keep it general and safe\n"
        "- Return ONLY valid JSON (no extra text)\n\n"
        f"Input:\n{text}\n\n"
        "Output format:\n"
        "{\n"
        '  "conditions": ["possible condition 1", "possible condition 2"],\n'
        '  "severity": "low/medium/high",\n'
        '  "advice": "what the user should do next"\n'
        "}\n"
    )

    try:
        response = call_llm(prompt)
        parsed = json.loads(response)
        return parsed

    except Exception as e:
        return {
            "conditions": [],
            "severity": "unknown",
            "advice": f"Error: {str(e)}"
        }