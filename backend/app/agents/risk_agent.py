import json
from app.services.llm_service import call_llm


def analyze_risk(symptom_data: dict) -> dict:
    prompt = (
        "You are a healthcare risk assessment AI.\n\n"
        "Input data:\n"
        f"{symptom_data}\n\n"
        "Your job:\n"
        "- Evaluate overall health risk\n"
        "- Consider severity and conditions\n"
        "- Provide reasoning\n"
        "- Suggest urgency level\n\n"
        "Return ONLY valid JSON:\n"
        "{\n"
        '  "risk_level": "low/medium/high",\n'
        '  "reason": "why this risk level",\n'
        '  "urgency": "none/monitor/doctor/urgent"\n'
        "}\n"
    )

    try:
        response = call_llm(prompt)
        parsed = json.loads(response)
        return parsed

    except Exception as e:
        return {
            "risk_level": "unknown",
            "reason": f"Error: {str(e)}",
            "urgency": "unknown"
        }