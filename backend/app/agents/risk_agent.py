import json
from app.services.llm_service import call_llm


def analyze_risk(symptom_data: dict) -> dict:
    prompt = (
        "You are a healthcare risk assessment AI.\n\n"

        "Your job:\n"
        "- Evaluate overall health risk based on symptoms\n"
        "- Consider severity and conditions\n"
        "- Provide reasoning\n"
        "- Suggest urgency level\n\n"

        "IMPORTANT SAFETY RULES:\n"
        "- Do NOT provide medical diagnosis\n"
        "- Do NOT use specific disease names like 'heart attack', 'stroke', etc.\n"
        "- Use general terms such as:\n"
        "  • 'serious cardiac event'\n"
        "  • 'respiratory complication'\n"
        "  • 'neurological issue'\n"
        "- Keep reasoning general and risk-focused\n\n"

        "RISK GUIDELINES:\n"
        "- If symptoms include chest pain, breathing difficulty, or dizziness → HIGH risk\n"
        "- If symptoms are mild → LOW risk\n"
        "- If mixed → MEDIUM risk\n\n"

        f"Input data:\n{symptom_data}\n\n"

        "Return ONLY valid JSON:\n"
        "{\n"
        '  "risk_level": "low/medium/high",\n'
        '  "reason": "clear explanation without diagnosis",\n'
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